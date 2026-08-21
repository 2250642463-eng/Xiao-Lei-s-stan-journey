# Requirements Document

## Introduction

晓棠空间站首页及主布局系统，为已登录的粉丝用户提供追星内容聚合展示界面，包括固定导航栏、首页内容区和全局页脚。

## Glossary

- **MainLayout**: 主布局组件，包含Header（顶部导航）、内容区（children）、Footer（页脚）
- **HomePage**: 首页组件，登录后的默认页面
- **Header**: 固定在顶部的导航栏，包含Logo、导航菜单、用户下拉框
- **Footer**: 全局页脚，包含版权信息和相关链接
- **Banner**: 首页大轮播图组件
- **CountdownCard**: 倒计时卡片组件（生日倒计时、行程倒计时）
- **ArtistProfile**: 艺人简介卡片
- **ScheduleSection**: 近期舞台行程板块
- **GallerySection**: 最新物料图集板块
- **WorksSection**: 推荐作品板块

## Requirements

### Requirement 1: 主布局框架

**User Story:** 作为已登录用户，我希望看到统一的页面布局框架，以便在不同页面间保持一致的导航和视觉体验。

#### Acceptance Criteria

1. THE MainLayout SHALL render a fixed Header at the top of the viewport
2. WHEN the user scrolls the page THEN the Header SHALL remain fixed at the top
3. THE MainLayout SHALL render page content in a scrollable main area below the Header
4. THE MainLayout SHALL render a Footer at the bottom of all content
5. THE MainLayout SHALL apply consistent background styling across all pages

### Requirement 2: 顶部导航栏 Header

**User Story:** 作为已登录用户，我希望看到固定的顶部导航栏，以便快速访问各个功能模块。

#### Acceptance Criteria

1. THE Header SHALL display the logo "晓棠空间站💙" on the left side
2. WHEN the user clicks the logo THEN the system SHALL navigate to the home page
3. THE Header SHALL display navigation menu items: 首页、艺人档案、行程、图库、我的收藏
4. WHEN the user clicks a navigation menu item THEN the system SHALL navigate to the corresponding page
5. THE Header SHALL display the current user's nickname on the right side
6. WHEN the user clicks the nickname THEN the system SHALL show a dropdown menu
7. THE dropdown menu SHALL include "退出登录" option for all users
8. WHERE the user has admin role, THE dropdown menu SHALL include "管理入口" option
9. WHEN the user clicks "退出登录" THEN the system SHALL log out the user and redirect to login page

### Requirement 3: 首页轮播 Banner

**User Story:** 作为粉丝用户，我希望看到精美的轮播图展示艺人最新动态，以便快速了解重要信息。

#### Acceptance Criteria

1. THE HomePage SHALL display a full-width Banner carousel at the top
2. THE Banner SHALL display at least 3 carousel slides
3. WHEN displaying slides THEN the Banner SHALL auto-play with 3-second intervals
4. THE Banner SHALL show navigation dots indicating the current slide
5. WHEN the user hovers over the Banner THEN the auto-play SHALL pause
6. WHEN the user clicks navigation dots THEN the Banner SHALL jump to the corresponding slide
7. THE Banner SHALL support left/right arrow navigation buttons

### Requirement 4: 倒计时卡片组

**User Story:** 作为粉丝用户，我希望看到生日和下一场行程的倒计时，以便提前准备和期待。

#### Acceptance Criteria

1. THE HomePage SHALL display two CountdownCards side by side below the Banner
2. THE first CountdownCard SHALL show countdown to the artist's birthday
3. THE second CountdownCard SHALL show countdown to the next scheduled event
4. WHEN the countdown reaches zero THEN the card SHALL display "今天就是啦！🎉" or "正在进行中 🎤"
5. THE CountdownCard SHALL display days, hours, minutes, and seconds remaining
6. THE countdown SHALL update every second

### Requirement 5: 艺人简介卡片

**User Story:** 作为粉丝用户，我希望看到艺人的简介信息，以便快速了解艺人背景。

#### Acceptance Criteria

1. THE HomePage SHALL display an ArtistProfile card below the countdown section
2. THE ArtistProfile SHALL display the artist's avatar image
3. THE ArtistProfile SHALL display a brief bio text (max 200 characters)
4. THE ArtistProfile SHALL include a "查看完整档案" button
5. WHEN the user clicks the button THEN the system SHALL navigate to the artist profile page

### Requirement 6: 近期舞台行程板块

**User Story:** 作为粉丝用户，我希望看到近期的舞台行程列表，以便规划观演计划。

#### Acceptance Criteria

1. THE HomePage SHALL display a ScheduleSection with title "✨近期舞台行程"
2. THE ScheduleSection SHALL display upcoming events as horizontally scrollable cards
3. WHEN displaying events THEN each card SHALL show event date, title, venue, and cover image
4. THE ScheduleSection SHALL display at least 5 upcoming events if available
5. WHEN the user swipes left/right THEN the card list SHALL scroll horizontally
6. WHEN the user clicks an event card THEN the system SHALL navigate to the event detail page
7. WHERE no upcoming events exist, THE ScheduleSection SHALL display "暂无近期行程" message

### Requirement 7: 最新物料图集板块

**User Story:** 作为粉丝用户，我希望看到最新的物料图片，以便欣赏和收藏艺人照片。

#### Acceptance Criteria

1. THE HomePage SHALL display a GallerySection with title "💫最新物料图集"
2. THE GallerySection SHALL display images in a responsive grid layout
3. WHEN displaying on desktop THEN the grid SHALL show 4 images per row
4. WHEN displaying on mobile THEN the grid SHALL show 2 images per row
5. THE GallerySection SHALL display the 8 most recent images
6. WHEN the user clicks an image THEN the system SHALL open a lightbox preview
7. THE GallerySection SHALL include a "查看更多" button
8. WHEN the user clicks "查看更多" THEN the system SHALL navigate to the full gallery page

### Requirement 8: 推荐作品板块

**User Story:** 作为粉丝用户，我希望看到艺人的代表作品，以便了解艺人的艺术成就。

#### Acceptance Criteria

1. THE HomePage SHALL display a WorksSection with title "🌟推荐作品"
2. THE WorksSection SHALL display works (music/video) as cards in a grid
3. WHEN displaying a work THEN the card SHALL show cover image, title, and type (音乐/影视)
4. THE WorksSection SHALL display at least 6 recommended works
5. WHEN the user clicks a work card THEN the system SHALL navigate to the work detail page or external link
6. THE WorksSection SHALL support filtering by work type (全部/音乐/影视)

### Requirement 9: 全局页脚 Footer

**User Story:** 作为用户，我希望在页面底部看到版权信息和相关链接，以便了解网站信息。

#### Acceptance Criteria

1. THE Footer SHALL display at the bottom of all pages
2. THE Footer SHALL include copyright text "© 2024 晓棠空间站 粉丝站"
3. THE Footer SHALL display the disclaimer "本站为粉丝自发建立的非盈利站点"
4. THE Footer SHALL include social media links (if applicable)
5. THE Footer SHALL be visually distinct from the main content area

### Requirement 10: 响应式布局

**User Story:** 作为用户，我希望在不同设备上都能正常浏览，以便随时随地访问空间站。

#### Acceptance Criteria

1. WHEN viewing on desktop (≥1024px) THEN the layout SHALL display in full-width mode
2. WHEN viewing on tablet (768px-1023px) THEN the layout SHALL adjust spacing and grid columns
3. WHEN viewing on mobile (<768px) THEN the Header navigation SHALL collapse into a hamburger menu
4. WHEN viewing on mobile THEN all card grids SHALL adapt to single or double column layout
5. WHEN viewing on mobile THEN the Banner SHALL maintain aspect ratio and readability

### Requirement 11: 数据加载状态

**User Story:** 作为用户，我希望在数据加载时看到加载提示，以便知道系统正在工作。

#### Acceptance Criteria

1. WHEN loading HomePage data THEN the system SHALL display skeleton loading placeholders
2. WHEN data loading fails THEN the system SHALL display an error message with retry button
3. WHEN the user clicks retry THEN the system SHALL attempt to reload the failed data
4. WHEN data loads successfully THEN the skeleton SHALL be replaced with actual content
5. THE loading state SHALL not block user interaction with loaded sections
