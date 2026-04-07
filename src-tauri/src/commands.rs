//! Tauri Commands - 前端调用接口

use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use once_cell::sync::Lazy;
use crate::perception;

/// 活跃应用信息
#[derive(Debug, Serialize, Deserialize)]
pub struct ActiveApp {
    pub process_name: String,
    pub window_title: String,
    pub process_id: u32,
}

/// 系统时间信息
#[derive(Debug, Serialize, Deserialize)]
pub struct SystemTimeInfo {
    pub timestamp: i64,
    pub timezone: String,
    pub formatted: String,
}

/// 获取前台窗口信息
#[tauri::command]
pub fn get_active_app() -> Result<ActiveApp, String> {
    perception::get_foreground_app()
}

/// 获取用户空闲时间（毫秒）
#[tauri::command]
pub fn get_idle_seconds() -> Result<u64, String> {
    perception::get_idle_time_ms()
}

/// 获取系统时间
#[tauri::command]
pub fn get_system_time() -> Result<SystemTimeInfo, String> {
    use chrono::Local;

    let now = Local::now();
    Ok(SystemTimeInfo {
        timestamp: now.timestamp_millis(),
        timezone: now.format("%Z").to_string(),
        formatted: now.format("%Y-%m-%d %H:%M:%S").to_string(),
    })
}

/// 存储数据到本地
#[tauri::command]
pub async fn save_to_storage(key: String, value: String) -> Result<(), String> {
    let app_data = crate::get_app_data_dir();
    let storage_path = app_data.join("storage");
    std::fs::create_dir_all(&storage_path)
        .map_err(|e| format!("Failed to create storage dir: {}", e))?;

    let file_path = storage_path.join(format!("{}.json", key));
    std::fs::write(&file_path, &value)
        .map_err(|e| format!("Failed to write storage: {}", e))?;

    tracing::debug!("Saved storage: {}", key);
    Ok(())
}

/// 从本地加载数据
#[tauri::command]
pub async fn load_from_storage(key: String) -> Result<Option<String>, String> {
    let app_data = crate::get_app_data_dir();
    let file_path = app_data.join("storage").join(format!("{}.json", key));

    if !file_path.exists() {
        return Ok(None);
    }

    let content = std::fs::read_to_string(&file_path)
        .map_err(|e| format!("Failed to read storage: {}", e))?;

    Ok(Some(content))
}
