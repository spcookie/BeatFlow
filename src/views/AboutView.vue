<template>
  <div class="about">
    <div class="about__container">
      <header class="about__header">
        <h1 class="about__title">关于 BeatFlow</h1>
        <p class="about__subtitle">专为运动瑜伽设计的节拍器</p>
      </header>

      <div class="about__content">
        <section class="about__section">
          <h2 class="about__section-title">为什么选择 BeatFlow？</h2>
          <div class="about__intro">
            <p>BeatFlow 是专门为运动瑜伽练习者设计的节拍器应用。无论您是瑜伽初学者还是资深练习者，BeatFlow 都能帮助您建立稳定的呼吸节奏，提升练习效果。</p>
          </div>
        </section>

        <section class="about__section">
          <h2 class="about__section-title">功能特色</h2>
          <ul class="about__feature-list">
            <li class="about__feature-item">
              <strong>呼吸节奏控制：</strong>精准的节拍控制，帮助建立稳定的呼吸模式
            </li>
            <li class="about__feature-item">
              <strong>多种练习模式：</strong>支持不同的拍号设置，适应各种瑜伽流派
            </li>
            <li class="about__feature-item">
              <strong>视觉引导：</strong>清晰的节拍指示器，帮助您保持专注
            </li>
            <li class="about__feature-item">
              <strong>练习记录：</strong>自动记录练习时间，追踪您的瑜伽之旅
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
              <h3>1. 调整呼吸节奏</h3>
              <p>根据您的练习需要调整BPM速度。初学者建议从较慢的节奏开始（60-80 BPM）。</p>
            </div>
            <div class="about__instruction-item">
              <h3>2. 选择练习模式</h3>
              <p>选择适合的拍号：4/4适合基础练习，3/4适合流瑜伽，6/8适合冥想练习。</p>
            </div>
            <div class="about__instruction-item">
              <h3>3. 开始练习</h3>
              <p>点击播放按钮，跟随节拍调整呼吸，让身心达到和谐统一。</p>
            </div>
          </div>
        </section>

        <section class="about__section">
          <h2 class="about__section-title">瑜伽练习建议</h2>
          <div class="about__yoga-tips">
            <div class="about__tip-item">
              <h3>🧘‍♀️ 初学者</h3>
              <p>建议使用60-80 BPM的慢节奏，专注于建立稳定的呼吸模式。</p>
            </div>
            <div class="about__tip-item">
              <h3>🌊 流瑜伽</h3>
              <p>可以使用80-120 BPM的中等节奏，配合动作的流畅转换。</p>
            </div>
            <div class="about__tip-item">
              <h3>🕯️ 冥想练习</h3>
              <p>使用40-60 BPM的缓慢节奏，帮助深度放松和内观。</p>
            </div>
          </div>
        </section>
      </div>

      <footer class="about__footer">
        <p>&copy; 2024 BeatFlow. 专为瑜伽练习者打造，让每一次呼吸都有节奏。</p>
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