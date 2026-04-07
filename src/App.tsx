import { useState } from 'react';
import { PetSprite } from './04-ui/src/components/PetSprite';
import { ChatBubble } from './04-ui/src/components/ChatBubble';
import { Settings } from './04-ui/src/components/Settings';
import { TrayMenu } from './04-ui/src/components/TrayMenu';
import { usePetStore } from './04-ui/src/stores/pet-store';
import { useChatStore } from './04-ui/src/stores/chat-store';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const { position, currentMood, isSleeping } = usePetStore();
  const { messages } = useChatStore();

  // 获取最后一条消息用于气泡显示
  const lastMessage = messages[messages.length - 1];

  // 处理托盘菜单点击
  const handleTrayClick = (action: string) => {
    switch (action) {
      case 'settings':
        setShowSettings(true);
        break;
      case 'quit':
        // 退出应用
        window.close();
        break;
    }
  };

  return (
    <>
      {/* 宠物主体 */}
      <div
        className="pet-container"
        style={{
          left: position.x,
          top: position.y,
        }}
      >
        <PetSprite mood={currentMood} isSleeping={isSleeping} />

        {/* 对话气泡 */}
        {lastMessage && lastMessage.role === 'assistant' && (
          <ChatBubble content={lastMessage.content} />
        )}
      </div>

      {/* 设置面板 */}
      {showSettings && (
        <Settings onClose={() => setShowSettings(false)} />
      )}

      {/* 托盘菜单 */}
      <TrayMenu onAction={handleTrayClick} />
    </>
  );
}

export default App;
