//! DesktopPet - Tauri Library Entry
//!
//! 核心模块：提供系统集成、Win32 API调用、本地存储等能力

mod commands;
mod perception;

pub use commands::*;
pub use perception::*;

/// 初始化日志系统
pub fn init_logging() {
    use tracing_subscriber::{fmt, prelude::*, EnvFilter};

    let filter = EnvFilter::try_from_default_env()
        .unwrap_or_else(|_| EnvFilter::new("info"));

    tracing_subscriber::registry()
        .with(fmt::layer())
        .with(filter)
        .init();

    tracing::info!("DesktopPet logging initialized");
}

/// 获取应用数据目录
pub fn get_app_data_dir() -> std::path::PathBuf {
    directories::ProjectDirs::from("com", "desktoppet", "DesktopPet")
        .map(|dirs| dirs.data_dir().to_path_buf())
        .unwrap_or_else(|| std::env::current_dir().unwrap())
}
