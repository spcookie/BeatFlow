<template>
  <div class="about">
    <div class="about__container">
      <header class="about__header">
        <h1 class="about__title">关于 BeatFlow</h1>
        <p class="about__subtitle">姗姗专属节拍器</p>
      </header>

      <div class="about__content">
        <section class="about__section">
          <h2 class="about__section-title">为什么选择 BeatFlow？</h2>
          <div class="about__intro">
            <p>BeatFlow 是姗姗的专属节拍器应用。无论是练习、学习还是日常活动，BeatFlow 都能帮助建立稳定的节奏感，提升专注力和效率。</p>
          </div>
        </section>

        <section class="about__section">
          <h2 class="about__section-title">功能特色</h2>
          <ul class="about__feature-list">
            <li class="about__feature-item">
              <strong>节奏控制：</strong>精准的节拍控制，帮助建立稳定的节奏感
            </li>
            <li class="about__feature-item">
              <strong>多种模式：</strong>支持不同的拍号设置，适应各种使用场景
            </li>
            <li class="about__feature-item">
              <strong>视觉引导：</strong>清晰的节拍指示器，帮助保持专注
            </li>
            <li class="about__feature-item">
              <strong>使用记录：</strong>自动记录使用时间，追踪练习进度
            </li>
            <li class="about__feature-item">
              <strong>多设备支持：</strong>手机、平板、电脑都能完美使用
            </li>
          </ul>
        </section>

        <section class="about__section">
          <h2 class="about__section-title">如何使用</h2>
          <div class="about__instructions">
            <div class="about__instruction-item">
              <h3>1. 调整节奏速度</h3>
              <p>根据需要调整BPM速度。建议从较慢的节奏开始（60-80 BPM）。</p>
            </div>
            <div class="about__instruction-item">
              <h3>2. 选择拍号模式</h3>
              <p>选择适合的拍号：4/4适合基础练习，3/4适合特殊节奏，6/8适合复合节拍。</p>
            </div>
            <div class="about__instruction-item">
              <h3>3. 开始使用</h3>
              <p>点击播放按钮，跟随节拍进行练习，保持专注和节奏感。</p>
            </div>
          </div>
        </section>

        <section class="about__section">
          <h2 class="about__section-title">使用建议</h2>
          <div class="about__yoga-tips">
            <div class="about__tip-item">
              <h3>🎵 基础练习</h3>
              <p>建议使用60-80 BPM的慢节奏，专注于建立稳定的节奏感。</p>
            </div>
            <div class="about__tip-item">
              <h3>⚡ 快节奏练习</h3>
              <p>可以使用80-120 BPM的中等节奏，适合动态练习。</p>
            </div>
            <div class="about__tip-item">
              <h3>🧘 专注练习</h3>
              <p>使用40-60 BPM的缓慢节奏，帮助深度专注和放松。</p>
            </div>
          </div>
        </section>
      </div>

      <footer class="about__footer">
        <p>&copy; 2024 BeatFlow. 姗姗专属节拍器，让每一次练习都有节奏。</p>
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

  &__intro {
    p {
      @apply text-text-light text-base leading-relaxed;
    }
  }

  &__yoga-tips {
    @apply space-y-4;
  }

  &__tip-item {
    @apply bg-white rounded-lg p-4 border border-gray-100;

    h3 {
      @apply text-lg font-semibold text-text mb-2 flex items-center;
    }

    p {
      @apply text-text-light leading-relaxed;
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