//! DesktopPet - Tauri Application Entry
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use desktop_pet_lib::{commands, init_logging};
use tauri::Manager;

fn main() {
    // 初始化日志
    init_logging();

    tracing::info!("Starting DesktopPet application");

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            tracing::info!("Application setup started");

            // 注册托盘图标
            #[cfg(desktop)]
            {
                use tauri::tray::{TrayIconBuilder, MouseButton, MouseButtonState, TrayIconEvent};
                use tauri::menu::{Menu, MenuItem};

                let show_item = MenuItem::with_id(app, "show", "显示宠物", true, None::<&str>)?;
                let settings_item = MenuItem::with_id(app, "settings", "设置", true, None::<&str>)?;
                let quit_item = MenuItem::with_id(app, "quit", "退出", true, None::<&str>)?;

                let menu = Menu::with_items(app, &[&show_item, &settings_item, &quit_item])?;

                let _tray = TrayIconBuilder::new()
                    .icon(app.default_window_icon().unwrap().clone())
                    .menu(&menu)
                    .tooltip("DesktopPet - 桌宠")
                    .on_menu_event(|app, event| {
                        match event.id.as_ref() {
                            "show" => {
                                if let Some(window) = app.get_webview_window("main") {
                                    let _ = window.show();
                                    let _ = window.set_focus();
                                }
                            }
                            "settings" => {
                                // 发送事件到前端打开设置
                                if let Some(window) = app.get_webview_window("main") {
                                    let _ = window.emit("open-settings", ());
                                }
                            }
                            "quit" => {
                                app.exit(0);
                            }
                            _ => {}
                        }
                    })
                    .on_tray_icon_event(|tray, event| {
                        if let TrayIconEvent::Click { button: MouseButton::Left, button_state: MouseButtonState::Up, .. } = event {
                            let app = tray.app_handle();
                            if let Some(window) = app.get_webview_window("main") {
                                let _ = window.show();
                                let _ = window.set_focus();
                            }
                        }
                    })
                    .build(app)?;
            }

            tracing::info!("Application setup completed");
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::get_active_app,
            commands::get_idle_seconds,
            commands::get_system_time,
            commands::save_to_storage,
            commands::load_from_storage,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
