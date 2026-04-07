# 免费2D美术资源调研报告

**调研日期**: 2026-04-07
**调研目标**: 寻找适合桌宠的免费2D精灵图/动画资源
**文档状态**: ✅ 已完成

---

## 1. 免费2D精灵图资源库

### 1.1 OpenGameArt.org

| 项目 | 说明 |
|------|------|
| **网址** | https://opengameart.org |
| **资源类型** | 精灵图、角色动画、游戏素材 |
| **许可证** | CC0/CC-BY/GPL等多种 |
| **资源量** | 大量免费游戏素材 |
| **宠物相关** | 有猫、狗、兔子等动物精灵 |

**搜索关键词**: `pet`, `animal`, `cat`, `dog`, `sprite`, `animated`

### 1.2 itch.io Free Assets

| 项目 | 说明 |
|------|------|
| **网址** | https://itch.io/game-assets/free |
| **资源类型** | 独立游戏素材 |
| **许可证** | 各资源自定（多为主流开源许可） |
| **资源量** | 非常丰富 |
| **推荐资源** | Free Cat and Dog Sprites by pzUH |

**pzuH的猫狗精灵**:
- https://pzuh.itch.io/free-cat-and-dog-sprites
- 包含行走动画、待机动画
- **免费商用**：Liberated Pixel Cup (CC-BY-SA 3.0)

### 1.3 Liberated Pixel Cup (LPC)

| 项目 | 说明 |
|------|------|
| **网址** | https://lpc.opengameart.org |
| **资源类型** | CC0许可的角色精灵图 |
| **许可证** | CC0（无版权，可商用） |
| **资源量** | 完整的角色制作套装 |
| **包含** | 猫、狗、多种生物 |

### 1.4 itch.io Desktop Pet 专区

| 项目 | 说明 |
|------|------|
| **网址** | https://itch.io/game-assets/tag-desktop-pet |
| **资源类型** | 桌宠专用素材 |
| **特点** | 专门针对桌面宠物场景 |

---

## 2. 开源桌宠项目参考

### 2.1 Desktop Pixel Pet (GitHub)

| 项目 | 说明 |
|------|------|
| **仓库** | https://github.com/CanFlyhang/Desktop-Pixel-Pet |
| **框架** | Electron |
| **特点** | 像素宠物+商城系统 |
| **Stars** | 101 |
| **许可** | 未说明 |

### 2.2 Chatty Desktop Pet

| 项目 | 说明 |
|------|------|
| **仓库** | https://github.com/ExtraNick/Chatty_desktop_pet |
| **框架** | Godot 4.3 |
| **语言** | GDScript |
| **Stars** | 30 |
| **许可** | MIT |

### 2.3 Virtual Pet Hamster

| 项目 | 说明 |
|------|------|
| **网址** | https://leanpus.itch.io/virtual-pet-hamster |
| **框架** | Godot |
| **特点** | 开源虚拟仓鼠 |
| **许可** | 免费版可下载源码 |

---

## 3. 骨骼动画工具

### 3.1 Spine 2D

| 项目 | 说明 |
|------|------|
| **网址** | https://esotericsoftware.com |
| **免费版** | 基础功能可用 |
| **价格** | 免费版功能有限，专业版$400+ |
| **导出** | JSON格式，多引擎支持 |
| **适用** | 复杂2D动画（走路、跑步、攻击） |

### 3.2 DragonBones

| 项目 | 说明 |
|------|------|
| **网址** | https://dragonbones.github.io |
| **免费版** | 完整功能免费 |
| **导出** | 支持Unity、UNREAL、Phaser等 |
| **特点** | 国产工具，中文社区活跃 |

### 3.3 Live2D Cubism

| 项目 | 说明 |
|------|------|
| **网址** | https://www.live2d.com |
| **免费版** | **有免费版本** |
| **特点** | 业界最流行的2D虚拟形象技术 |
| **导出** | 支持多种平台 |
| **注意** | 免费版功能受限 |

---

## 4. 像素精灵图自动生成工具

### 4.1 像素画AI生成器

| 工具 | 说明 |
|------|------|
| **Pixel Art Generator** | AI生成像素风格图片 |
| **Texture Generator** | 可生成游戏贴图 |
| **付费** | 部分免费额度 |

### 4.2 推荐工作流

```
1. 从 itch.io/LPC 下载基础动物精灵（CC0/CC-BY）
2. 使用 Piskel (在线工具) 编辑和扩展
3. 使用 Clip Studio Paint 制作新动画帧
4. 或使用 Spine Free 做骨骼动画
```

---

## 5. 推荐资源清单

### 5.1 免费可商用（强烈推荐）

| 资源名 | 来源 | 许可证 | 包含内容 |
|--------|------|--------|----------|
| Cat & Dog Sprites | pzUH@LPC | CC-BY-SA 3.0 | 猫狗行走/待机帧 |
| LPC Character Set | OpenGameArt | CC0 | 完整角色制作套装 |
| Desktop Pet Hamster | itch.io | 开源可研究 | 仓鼠完整工程 |

### 5.2 开源桌宠项目（可参考架构）

| 项目 | 框架 | 学习价值 |
|------|------|----------|
| Desktop Pixel Pet | Electron | 商城系统架构 |
| Chatty Desktop Pet | Godot | 动画状态机设计 |
| Virtual Pet Hamster | Godot | 宠物行为系统 |

---

## 6. 结论与建议

### 推荐方案

**方案A（最简）**: 使用itch.io的pzUH猫狗精灵图
- CC-BY-SA 3.0（需要署名）
- 包含基本动画帧
- 资源质量较高

**方案B（最优）**: 以开源桌宠项目为模板
- 直接fork `Chatty_desktop_pet` (MIT)
- 在其基础上改造
- 复用其动画状态机

**方案C（商业化）**: Live2D + Spine组合
- Live2D免费版制作虚拟形象
- Spine做复杂动画
- 资源质量最高

### 下一步行动

1. 优先查看 `Chatty_desktop_pet` 的GitHub仓库
2. 下载 `pzUH的猫狗精灵` 作为备用资源
3. 评估是否需要自建动画系统

---

## 附录：许可证说明

| 许可证 | 商业使用 | 转载分发 | 修改演绎 |
|--------|----------|----------|----------|
| CC0 | ✅ 可 | ✅ 可 | ✅ 可 |
| CC-BY | ✅ 可 | ✅ 可 | ✅ 可（需署名） |
| CC-BY-SA | ✅ 可 | ✅ 可（同许可） | ✅ 可（同等许可） |
| MIT | ✅ 可 | ✅ 可 | ✅ 可 |
