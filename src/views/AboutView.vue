<template>
  <div class="about">
    <div class="about__container">
      <header class="about__header">
        <h1 class="about__title">关于 BeatFlow</h1>
        <p class="about__subtitle">专业的在线节拍器应用</p>
      </header>

      <div class="about__content">
        <section class="about__section">
          <h2 class="about__section-title">功能特色</h2>
          <ul class="about__feature-list">
            <li class="about__feature-item">
              <strong>精准节拍：</strong>高精度的节拍控制，支持30-300 BPM范围
            </li>
            <li class="about__feature-item">
              <strong>多种拍号：</strong>支持常见的拍号设置（2/4, 3/4, 4/4, 6/8等）
            </li>
            <li class="about__feature-item">
              <strong>视觉指示：</strong>清晰的节拍指示器和当前拍子显示
            </li>
            <li class="about__feature-item">
              <strong>练习计时：</strong>自动记录练习时间，帮助您跟踪练习进度
            </li>
            <li class="about__feature-item">
              <strong>响应式设计：</strong>完美适配各种设备屏幕
            </li>
          </ul>
        </section>

        <section class="about__section">
          <h2 class="about__section-title">使用说明</h2>
          <div class="about__instructions">
            <div class="about__instruction-item">
              <h3>1. 设置BPM</h3>
              <p>使用滑块或按钮调整节拍速度，或选择预设的常用速度。</p>
            </div>
            <div class="about__instruction-item">
              <h3>2. 选择拍号</h3>
              <p>根据您的音乐需要选择合适的拍号。</p>
            </div>
            <div class="about__instruction-item">
              <h3>3. 开始练习</h3>
              <p>点击播放按钮开始节拍器，跟随节拍进行练习。</p>
            </div>
          </div>
        </section>

        <section class="about__section">
          <h2 class="about__section-title">技术信息</h2>
          <div class="about__tech-info">
            <p>BeatFlow 使用现代Web技术构建：</p>
            <ul class="about__tech-list">
              <li>Vue 3 + TypeScript</li>
              <li>Ant Design Vue</li>
              <li>Tailwind CSS</li>
              <li>Pinia 状态管理</li>
              <li>Vite 构建工具</li>
            </ul>
          </div>
        </section>
      </div>

      <footer class="about__footer">
        <p>&copy; 2024 BeatFlow. 专为音乐爱好者打造。</p>
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about {
  @apply flex items-center justify-center p-4;

  &__container {
    @apply bg-white rounded-card shadow-none border border-gray-200 w-full max-w-4xl;
    padding: 2rem;
  }

  &__header {
    @apply text-center mb-8;
  }

  &__title {
    @apply text-3xl font-bold text-text mb-2;
  }

  &__subtitle {
    @apply text-text-light text-lg;
  }

  &__content {
    @apply space-y-8;
  }

  &__section {
    @apply bg-surface rounded-card p-6;
  }

  &__section-title {
    @apply text-xl font-semibold text-text mb-4;
  }

  &__feature-list {
    @apply space-y-3;
  }

  &__feature-item {
    @apply text-text-light;

    strong {
      @apply text-text font-semibold;
    }
  }

  &__instructions {
    @apply space-y-4;
  }

  &__instruction-item {
    h3 {
      @apply text-lg font-semibold text-text mb-2;
    }

    p {
      @apply text-text-light;
    }
  }

  &__tech-info {
    p {
      @apply text-text-light mb-3;
    }
  }

  &__tech-list {
    @apply space-y-1;

    li {
      @apply text-text-light;
    }
  }

  &__footer {
    @apply text-center mt-8 pt-6 border-t border-gray-200;

    p {
      @apply text-text-light text-sm;
    }
  }
}

@media (max-width: 768px) {
  .about {
    @apply p-2;
    
    &__container {
      padding: 1.5rem;
    }
  }
}
</style>