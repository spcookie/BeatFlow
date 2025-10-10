<template>
  <div class="countdown-timer">
    <!-- 标题 -->
    <div class="countdown-timer__header">
      <h3 class="countdown-timer__title">倒计时</h3>
    </div>

    <!-- 主要内容卡片 -->
    <div class="countdown-timer__card">
      <!-- 倒计时显示 -->
      <div class="countdown-timer__display">
        <div class="countdown-timer__time">{{ remainingTimeFormatted }}</div>
        <div class="countdown-timer__progress-bar">
          <div
            class="countdown-timer__progress-fill"
            :style="{ width: progressPercentage + '%' }"
          ></div>
        </div>
      </div>

      <!-- 控制按钮 -->
      <div class="countdown-timer__controls">
        <button
          v-if="!isCountdownRunning"
          @click="handleStart"
          :disabled="totalTimeInSeconds === 0"
          class="countdown-timer__button countdown-timer__button--start"
        >
          <PlayCircleOutlined />
          开始
        </button>
        <button
          v-else
          @click="handlePause"
          class="countdown-timer__button countdown-timer__button--pause"
        >
          <PauseCircleOutlined />
          暂停
        </button>
        <button
          @click="handleReset"
          class="countdown-timer__button countdown-timer__button--reset"
        >
          <ReloadOutlined />
          重置
        </button>
      </div>

      <!-- 展开/折叠的配置区域 -->
      <div
        class="countdown-timer__settings"
        :class="{ 'countdown-timer__settings--expanded': isExpanded }"
      >
        <div class="countdown-timer__settings-content">
          <div class="countdown-timer__settings-title">时间设置</div>
          <div class="countdown-timer__time-inputs">
            <div class="countdown-timer__input-group">
              <label class="countdown-timer__input-label">小时</label>
              <input
                v-model.number="hours"
                type="number"
                min="0"
                max="23"
                class="countdown-timer__input"
                :disabled="isCountdownRunning"
              />
            </div>
            <span class="countdown-timer__input-separator">:</span>
            <div class="countdown-timer__input-group">
              <label class="countdown-timer__input-label">分钟</label>
              <input
                v-model.number="minutes"
                type="number"
                min="0"
                max="59"
                class="countdown-timer__input"
                :disabled="isCountdownRunning"
              />
            </div>
            <span class="countdown-timer__input-separator">:</span>
            <div class="countdown-timer__input-group">
              <label class="countdown-timer__input-label">秒钟</label>
              <input
                v-model.number="seconds"
                type="number"
                min="0"
                max="59"
                class="countdown-timer__input"
                :disabled="isCountdownRunning"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 箭头始终在底部 -->
      <div class="countdown-timer__arrow-container" @click="toggleExpanded">
        <ArrowDownOutlined
          class="countdown-timer__arrow"
          :class="{ 'countdown-timer__arrow--rotated': isExpanded }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { ArrowDownOutlined, PlayCircleOutlined, PauseCircleOutlined, ReloadOutlined } from '@ant-design/icons-vue'
import { useMetronomeStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

const metronomeStore = useMetronomeStore()
const {
  isCountdownRunning,
  countdownTotalTime,
  countdownRemainingTime,
  isCountdownFinished,
  remainingTimeFormatted
} = storeToRefs(metronomeStore)

const {
  startCountdown,
  pauseCountdown,
  resetCountdown
} = metronomeStore

// 组件状态
const isExpanded = ref(false)
const hours = ref(0)
const minutes = ref(5)
const seconds = ref(0)

// 切换展开状态
const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

// 按钮处理函数
const handleStart = () => {
  startCountdown(totalTimeInSeconds.value)
}

const handlePause = () => {
  pauseCountdown()
}

const handleReset = () => {
  resetCountdown()
  // 重置输入值
  hours.value = 0
  minutes.value = 5
  seconds.value = 0
}

// 计算总时间（秒）
const totalTimeInSeconds = computed(() => {
  return hours.value * 3600 + minutes.value * 60 + seconds.value
})

// 计算进度百分比
const progressPercentage = computed(() => {
  if (countdownTotalTime.value === 0) return 0
  return ((countdownTotalTime.value - countdownRemainingTime.value) / countdownTotalTime.value) * 100
})

// 监听时间输入变化，更新store中的总时间
watch([hours, minutes, seconds], () => {
  if (!isCountdownRunning.value) {
    metronomeStore.countdownTotalTime = totalTimeInSeconds.value
    metronomeStore.countdownRemainingTime = totalTimeInSeconds.value
  }
}, { immediate: true })

// 监听倒计时完成
watch(() => isCountdownFinished.value, (finished) => {
  if (finished) {
    // 可以在这里添加完成后的逻辑，比如显示通知
    console.log('倒计时完成！')
  }
})
</script>

<style lang="scss" scoped>
.countdown-timer {
  @apply space-y-4;
}

// 标题样式，与其他卡片保持一致
.countdown-timer__header {
  @apply text-center;
}

.countdown-timer__title {
  @apply text-lg font-semibold text-text mb-3;
}

// 主要内容卡片
.countdown-timer__card {
  @apply bg-surface rounded-card p-4;
  position: relative;
}

// 倒计时显示
.countdown-timer__display {
  text-align: center;
  margin-bottom: 1.5rem;
}

.countdown-timer__time {
  @apply font-mono text-6xl font-bold;
  color: var(--color-primary);
  margin-bottom: 0.75rem;
}

.countdown-timer__mini-display {
  @apply font-mono text-6xl font-bold;
  color: var(--color-primary);
}

.countdown-timer__progress-bar {
  width: 100%;
  height: 0.375rem;
  background-color: var(--color-surface-light);
  border-radius: 9999px;
  overflow: hidden;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
  margin-top: 0.5rem;
}

.countdown-timer__progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary) 0%, #ff8a94 100%);
  transition: width 1s linear;
  border-radius: 9999px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

// 控制按钮
.countdown-timer__controls {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.countdown-timer__button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  box-shadow: none;

  :deep(.anticon) {
    font-size: 16px;
    display: flex;
    align-items: center;
  }
}

.countdown-timer__button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.countdown-timer__button--start {
  background-color: var(--color-primary);
  color: white;
}

.countdown-timer__button--start:hover:not(:disabled) {
  background-color: #ff8a94;
  opacity: 0.9;
}

.countdown-timer__button--pause {
  background-color: #eab308;
  color: white;
}

.countdown-timer__button--pause:hover:not(:disabled) {
  background-color: #ca8a04;
  opacity: 0.9;
}

.countdown-timer__button--reset {
  background-color: #6b7280;
  color: white;
}

.countdown-timer__button--reset:hover:not(:disabled) {
  background-color: #4b5563;
  opacity: 0.9;
}

// 配置区域 - 可展开/折叠
.countdown-timer__settings {
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  max-height: 0;
  opacity: 0;
  margin-bottom: 3rem; // 为箭头留出空间
}

.countdown-timer__settings--expanded {
  max-height: 200px;
  opacity: 1;
}

.countdown-timer__settings-content {
  padding-top: 1.5rem;
}

.countdown-timer__settings-title {
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-light);
  margin-bottom: 1rem;
}

.countdown-timer__time-inputs {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.countdown-timer__input-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.countdown-timer__input-label {
  font-size: 0.75rem;
  color: var(--color-text-light);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.countdown-timer__input {
  width: 4rem;
  height: 2.5rem;
  text-align: center;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  outline: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s ease;
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}

.countdown-timer__input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(255, 182, 193, 0.1);
  transform: scale(1.02);
}

.countdown-timer__input:disabled {
  background-color: #f9fafb;
  cursor: not-allowed;
  opacity: 0.6;
}

.countdown-timer__input-separator {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--color-text-light);
  margin-top: 1.5rem;
}

// 箭头始终在底部
.countdown-timer__arrow-container {
  position: absolute;
  bottom: 0.25rem;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  padding: 0.375rem;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--color-surface-light);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateX(-50%) scale(1.1);
  }
}

.countdown-timer__arrow {
  transition: all 0.3s ease;
  color: var(--color-text-light);
  font-size: 14px;
  animation: arrowBounce 2s ease-in-out infinite;
}

.countdown-timer__arrow--rotated {
  transform: rotate(180deg);
  animation: arrowBounceUp 2s ease-in-out infinite;
}

@keyframes arrowBounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(3px);
  }
}

@keyframes arrowBounceUp {
  0%, 100% {
    transform: translateY(0) rotate(180deg);
  }
  50% {
    transform: translateY(-3px) rotate(180deg);
  }
}

// 移动端响应式
@media (max-width: 768px) {
  .countdown-timer__time-inputs {
    gap: 0.5rem;
  }

  .countdown-timer__input {
    width: 3.5rem;
    height: 2.25rem;
    font-size: 0.875rem;
  }

  .countdown-timer__time {
    @apply text-5xl;
  }

  .countdown-timer__controls {
    gap: 0.5rem;
  }

  .countdown-timer__button {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  }
}
</style>
