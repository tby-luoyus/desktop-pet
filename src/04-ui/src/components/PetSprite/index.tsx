import { useState, useEffect, useRef } from 'react';

export type PetMood = 'idle' | 'happy' | 'sad' | 'curious' | 'sleeping';

interface PetSpriteProps {
  mood: PetMood;
  isSleeping: boolean;
  scale?: number;
}

export function PetSprite({ mood, isSleeping, scale = 1 }: PetSpriteProps) {
  const [, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const spriteRef = useRef<HTMLDivElement>(null);

  // 动画帧更新
  useEffect(() => {
    const frameInterval = isSleeping ? 500 : 150; // 睡眠动画慢一些
    const frameCount = isSleeping ? 4 : 8;

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frameCount);
    }, frameInterval);

    return () => clearInterval(interval);
  }, [isSleeping]);

  // 获取当前动画的CSS类名
  const getAnimationClass = () => {
    if (isSleeping) return 'sprite-sleeping';
    switch (mood) {
      case 'happy':
        return 'sprite-happy';
      case 'sad':
        return 'sprite-sad';
      case 'curious':
        return 'sprite-curious';
      default:
        return 'sprite-idle';
    }
  };

  // 拖拽开始
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // 拖拽移动
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (spriteRef.current) {
        // 更新位置（实际应用中应该使用zustand store）
        const newX = e.clientX - 64 * scale;
        const newY = e.clientY - 64 * scale;
        // 这里需要调用store的action更新位置
        console.log('Drag to:', newX, newY);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, scale]);

  return (
    <div
      ref={spriteRef}
      className={`pet-sprite ${getAnimationClass()} ${isDragging ? 'dragging' : ''}`}
      onMouseDown={handleMouseDown}
      style={{
        width: 128 * scale,
        height: 128 * scale,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      }}
    >
      {/* 这里渲染精灵图动画 */}
      <div className="sprite-frame">
        <svg
          viewBox="0 0 128 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 基础宠物形状 - 圆形身体 */}
          <ellipse
            cx="64"
            cy="72"
            rx="48"
            ry="44"
            fill={isSleeping ? '#a0a0a0' : '#ffb6c1'}
          />

          {/* 眼睛 */}
          {isSleeping ? (
            <>
              <path d="M44 68 L54 72" stroke="#333" strokeWidth="2" strokeLinecap="round" />
              <path d="M84 68 L74 72" stroke="#333" strokeWidth="2" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="48" cy="68" r="8" fill="#333" />
              <circle cx="80" cy="68" r="8" fill="#333" />
              <circle cx="50" cy="66" r="3" fill="#fff" />
              <circle cx="82" cy="66" r="3" fill="#fff" />
            </>
          )}

          {/* 嘴巴 */}
          {mood === 'happy' && !isSleeping && (
            <path d="M56 82 Q64 90 72 82" stroke="#333" strokeWidth="2" fill="none" />
          )}

          {/* 睡眠Zzz */}
          {isSleeping && (
            <>
              <text x="90" y="50" fontSize="16" fill="#6366f1" fontWeight="bold">
                z
              </text>
              <text x="100" y="40" fontSize="12" fill="#6366f1" fontWeight="bold">
                z
              </text>
            </>
          )}
        </svg>
      </div>

      <style>{`
        .pet-sprite {
          cursor: grab;
          transition: transform 0.1s ease-out;
        }

        .pet-sprite.dragging {
          cursor: grabbing;
          opacity: 0.8;
        }

        .sprite-frame {
          width: 100%;
          height: 100%;
          animation: bounce 1s ease-in-out infinite;
        }

        .sprite-sleeping .sprite-frame {
          animation: breathe 2s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
