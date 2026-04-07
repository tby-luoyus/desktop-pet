import { useState, useEffect } from 'react';
import { Settings, Info, X, PawPrint } from 'lucide-react';

interface TrayMenuProps {
  onAction: (action: string) => void;
}

export function TrayMenu({ onAction }: TrayMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // 点击其他地方关闭菜单
  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  const menuItems = [
    { id: 'settings', label: '设置', action: 'settings', Icon: Settings },
    { id: 'about', label: '关于', action: 'about', Icon: Info },
    { id: 'quit', label: '退出', action: 'quit', Icon: X },
  ];

  return (
    <div style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 10001 }}>
      {/* 小托盘图标按钮 */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: '#6366f1',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}
      >
        <PawPrint size={20} color="white" />
      </button>

      {/* 下拉菜单 */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            right: 0,
            background: '#1e1e1e',
            border: '1px solid #333',
            borderRadius: 8,
            padding: 8,
            minWidth: 120,
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          }}
        >
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setIsOpen(false);
                onAction(item.action);
              }}
              style={{
                padding: '8px 12px',
                color: '#ccc',
                cursor: 'pointer',
                borderRadius: 4,
                fontSize: 14,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#333';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <item.Icon size={16} />
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
