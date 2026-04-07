//! Windows感知模块 - Win32 API调用

use crate::commands::ActiveApp;
use std::ffi::OsString;
use std::os::windows::ffi::OsStringExt;
use winapi::um::winuser::{GetForegroundWindow, GetWindowTextW, GetWindowThreadProcessId};
use winapi::um::processthreadsapi::OpenProcess;
use winapi::um::psapi::GetModuleBaseNameW;
use winapi::um::winbase::QueryFullProcessImageNameW;
use winapi::um::handleapi::CloseHandle;
use winapi::um::sysinfoapi::GetTickCount64;
use winapi::um::winuser::{GetLastInputInfo, GetSystemMetrics, LASTINPUTINFO, SM_CXSCREEN, SM_CYSCREEN};
use winapi::shared::minwindef::{FALSE, DWORD, TRUE};

/// 获取前台窗口的进程信息
pub fn get_foreground_app() -> Result<ActiveApp, String> {
    unsafe {
        let hwnd = GetForegroundWindow();
        if hwnd.is_null() {
            return Err("No foreground window".to_string());
        }

        // 获取窗口标题
        let mut title_buf = [0u16; 512];
        let title_len = GetWindowTextW(hwnd, title_buf.as_mut_ptr(), 512);
        let window_title = if title_len > 0 {
            OsString::from_wide(&title_buf[..title_len as usize])
                .to_string_lossy()
                .into_owned()
        } else {
            String::new()
        };

        // 获取进程ID
        let mut process_id: DWORD = 0;
        GetWindowThreadProcessId(hwnd, &mut process_id);

        // 打开进程获取名称
        let handle = OpenProcess(
            winapi::um::winnt::PROCESS_QUERY_LIMITED_INFORMATION,
            FALSE,
            process_id,
        );

        let process_name = if !handle.is_null() {
            let mut name_buf = [0u16; 260];
            let mut size = 260 as DWORD;
            let result = QueryFullProcessImageNameW(
                handle,
                0,
                name_buf.as_mut_ptr(),
                &mut size,
            );
            CloseHandle(handle);

            if result != 0 {
                let full_path = OsString::from_wide(&name_buf[..size as usize])
                    .to_string_lossy()
                    .into_owned();

                // 提取进程名
                full_path
                    .rsplit('\\')
                    .next()
                    .unwrap_or(&full_path)
                    .to_string()
            } else {
                "Unknown".to_string()
            }
        } else {
            "Unknown".to_string()
        };

        Ok(ActiveApp {
            process_name,
            window_title,
            process_id,
        })
    }
}

/// 获取用户空闲时间（毫秒）
pub fn get_idle_time_ms() -> Result<u64, String> {
    unsafe {
        let mut lii = LASTINPUTINFO {
            cbSize: std::mem::size_of::<LASTINPUTINFO>() as u32,
            dwTime: 0,
        };

        if GetLastInputInfo(&mut lii) == TRUE {
            let tick_count = GetTickCount64();
            let idle_time = if tick_count > lii.dwTime as u64 {
                tick_count - lii.dwTime as u64
            } else {
                0
            };
            Ok(idle_time)
        } else {
            Err("Failed to get last input info".to_string())
        }
    }
}

/// 获取屏幕分辨率
pub fn get_screen_size() -> Result<(i32, i32), String> {
    unsafe {
        let width = GetSystemMetrics(SM_CXSCREEN);
        let height = GetSystemMetrics(SM_CYSCREEN);
        Ok((width, height))
    }
}
