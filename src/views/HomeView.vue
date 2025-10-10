<script setup lang="ts">
import MetronomeController from '@/components/MetronomeController.vue'
import BpmController from '@/components/BpmController.vue'
import TimeSignatureSelector from '@/components/TimeSignatureSelector.vue'
import TimerDisplay from '@/components/TimerDisplay.vue'
import SoundOptions from '@/components/SoundOptions.vue'
import CountdownTimer from '@/components/CountdownTimer.vue'
</script>

<template>
  <div class="metronome">
    <div class="metronome__container">
      <!-- 计时器显示 -->
      <div class="metronome__section">
        <TimerDisplay />
      </div>

      <!-- 倒计时器 -->
      <div class="metronome__section">
        <CountdownTimer />
      </div>

      <!-- 节拍器控制器 -->
      <div class="metronome__section">
        <h2 class="metronome__section-title">节拍控制</h2>
        <MetronomeController />
      </div>

      <!-- BPM控制器 -->
      <div class="metronome__section">
        <BpmController />
      </div>

      <!-- 拍号选择器 -->
      <div class="metronome__section">
        <TimeSignatureSelector />
      </div>

      <!-- 声音选项 -->
      <div class="metronome__section">
        <SoundOptions />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.metronome {
  @apply flex items-center justify-center min-h-screen p-4;

  &__container {
    @apply bg-white rounded-card shadow-none border border-gray-200;
    max-width: 600px;
    width: 100%;
    padding: 2rem;
    margin: 0 auto;
  }



  &__controls {
    @apply space-y-6;
  }

  &__section {
    @apply bg-surface rounded-card p-4 mb-4;
  }

  &__section-title {
    @apply text-lg font-semibold text-text mb-3 text-center;
  }
}

@media (max-width: 768px) {
  .metronome {
    @apply p-2;
    
    &__container {
      padding: 1.5rem;
    }
  }
}
</style>