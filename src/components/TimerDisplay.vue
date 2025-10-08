<template>
  <div class="timer-display">
    <div class="timer-display__section">
      <div class="timer-display__label">
        <ClockCircleOutlined class="timer-display__icon" />
        当前时间
      </div>
      <div class="timer-display__value timer-display__value--current">
        {{ currentTime }}
      </div>
    </div>
    
    <div class="timer-display__divider"></div>
    
    <div class="timer-display__section">
      <div class="timer-display__label">
        <PlayCircleOutlined class="timer-display__icon" />
        练习时长
        <button 
          @click="reset"
          :disabled="isPlaying"
          class="timer-display__reset-button"
          title="重置练习时长"
        >
          <ReloadOutlined />
        </button>
      </div>
      <div class="timer-display__value timer-display__value--elapsed">
        {{ elapsedTimeFormatted }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { ClockCircleOutlined, PlayCircleOutlined, ReloadOutlined } from '@ant-design/icons-vue'
import { useMetronomeStore } from '@/stores/counter'

const metronomeStore = useMetronomeStore()
const { currentTime, elapsedTimeFormatted, isPlaying } = storeToRefs(metronomeStore)
const { reset } = metronomeStore

// 每秒更新当前时间
let timeInterval: number | null = null

onMounted(() => {
  // 立即更新一次时间
  updateCurrentTime()
  
  // 每秒更新时间
  timeInterval = window.setInterval(updateCurrentTime, 1000)
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})

const updateCurrentTime = () => {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const seconds = now.getSeconds().toString().padStart(2, '0')
  currentTime.value = `${hours}:${minutes}:${seconds}`
}
</script>

<style lang="scss" scoped>
.timer-display {
  @apply flex items-center justify-center gap-8 p-4 rounded-card;
  background-color: var(--color-surface);

  &__section {
    @apply flex flex-col items-center space-y-2;
  }

  &__label {
    @apply flex items-center text-sm text-text-light font-medium;
    align-items: center;
    gap: 8px; // 增加icon和文字之间的间距
  }

  &__reset-button {
    @apply ml-2 p-1 rounded-full border-none bg-transparent transition-all duration-200;
    color: var(--color-text-light);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    
    &:hover:not(:disabled) {
      background-color: var(--color-surface-hover, #f5f5f5);
      color: var(--color-primary);
      transform: scale(1.1);
    }
    
    &:disabled {
      color: #d9d9d9;
      cursor: not-allowed;
      opacity: 0.5;
    }
    
    :deep(.anticon) {
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px !important;
    line-height: 1;
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    
    // 确保SVG图标正确对齐
    :deep(svg) {
      width: 14px;
      height: 14px;
      display: block;
    }
  }

  &__value {
    @apply font-mono text-6xl font-bold;
    
    &--current {
      color: var(--color-text);
    }
    
    &--elapsed {
      color: var(--color-primary);
    }
  }

  &__divider {
    @apply w-px h-12 bg-text-light opacity-30;
  }
}

@media (max-width: 640px) {
  .timer-display {
    @apply flex-col space-y-2;

    &__value {
      @apply text-5xl;
    }

    &__divider {
      @apply w-12 h-px;
    }
  }
}
</style>