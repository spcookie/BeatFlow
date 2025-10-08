<template>
  <div class="bpm-controller">
    <div class="bpm-controller__header">
      <h3 class="bpm-controller__title">节拍速度</h3>
      <div class="bpm-controller__display">
        <span class="bpm-controller__value">{{ bpm }}</span>
        <span class="bpm-controller__unit">BPM</span>
      </div>
    </div>
    
    <div class="bpm-controller__controls">
      <div class="bpm-controller__slider-container">
        <a-slider
          v-model:value="bpm"
          :min="BPM_RANGE.MIN"
          :max="BPM_RANGE.MAX"
          :step="1"
          @change="handleBpmChange"
          class="bpm-controller__slider"
        />
      </div>
      
      <div class="bpm-controller__buttons">
        <a-button
          @click="decrementBpm"
          :disabled="bpm <= BPM_RANGE.MIN"
          class="bpm-controller__button"
          size="large"
        >
          -10
        </a-button>
        
        <a-button
          @click="decrementBpmSlow"
          :disabled="bpm <= BPM_RANGE.MIN"
          class="bpm-controller__button"
          size="large"
        >
          -1
        </a-button>
        
        <a-button
          @click="incrementBpmSlow"
          :disabled="bpm >= BPM_RANGE.MAX"
          class="bpm-controller__button"
          size="large"
        >
          +1
        </a-button>
        
        <a-button
          @click="incrementBpm"
          :disabled="bpm >= BPM_RANGE.MAX"
          class="bpm-controller__button"
          size="large"
        >
          +10
        </a-button>
      </div>
    </div>
    
    <div class="bpm-controller__presets">
      <div class="bpm-controller__preset-buttons">
        <a-button
          v-for="preset in bpmPresets"
          :key="preset"
          @click="setBpm(preset)"
          size="small"
          class="bpm-controller__preset-button"
        >
          {{ preset }}
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMetronomeStore } from '@/stores/counter'

const metronomeStore = useMetronomeStore()
const { bpm } = storeToRefs(metronomeStore)
const { setBpm, BPM_RANGE } = metronomeStore

const bpmPresets = [60, 80, 100, 120, 140, 150, 160, 180]

const handleBpmChange = (value: number) => {
  setBpm(value)
}

const incrementBpm = () => {
  setBpm(Math.min(bpm.value + 10, BPM_RANGE.MAX))
}

const decrementBpm = () => {
  setBpm(Math.max(bpm.value - 10, BPM_RANGE.MIN))
}

const incrementBpmSlow = () => {
  setBpm(Math.min(bpm.value + 1, BPM_RANGE.MAX))
}

const decrementBpmSlow = () => {
  setBpm(Math.max(bpm.value - 1, BPM_RANGE.MIN))
}
</script>

<style lang="scss" scoped>
.bpm-controller {
  @apply space-y-4;

  &__header {
    @apply text-center;
  }

  &__title {
    @apply text-lg font-semibold text-text mb-2;
  }

  &__display {
    @apply flex items-baseline justify-center space-x-2;
  }

  &__value {
    @apply text-3xl font-bold text-primary;
  }

  &__unit {
    @apply text-sm text-text-light;
  }

  &__controls {
    @apply flex flex-col space-y-4;
  }

  &__slider-container {
    @apply w-full px-2;
  }

  &__buttons {
    @apply flex items-center justify-center space-x-3;
  }

  &__button {
    @apply rounded-card border-none flex items-center justify-center;
    background-color: var(--color-surface);
    color: var(--color-text);
    min-width: 60px;
    height: 40px;
    font-weight: 600;
    font-size: 14px;
    line-height: 1;
    
    &:hover:not(:disabled) {
      background-color: var(--color-accent) !important;
      color: var(--color-text) !important;
    }
    
    &:disabled {
      opacity: 0.5;
    }
  }

  &__slider {
    :deep(.ant-slider-rail) {
      background-color: var(--color-surface);
    }
    
    :deep(.ant-slider-track) {
      background-color: var(--color-primary);
    }
    
    :deep(.ant-slider-handle) {
      border-color: var(--color-primary);
      
      &:hover, &:focus {
        border-color: var(--color-primary);
        box-shadow: 0 0 0 5px rgba(255, 154, 162, 0.2);
      }
    }
  }

  &__presets {
    @apply flex flex-col items-center;
  }

  &__preset-buttons {
    @apply flex flex-wrap justify-center gap-2;
    max-width: 320px;
  }

  &__preset-button {
    @apply rounded-card border-none flex items-center justify-center;
    background-color: var(--color-accent);
    color: var(--color-text);
    min-width: 50px;
    height: 32px;
    font-weight: 500;
    font-size: 12px;
    line-height: 1;
    
    &:hover {
      background-color: var(--color-secondary) !important;
      color: white !important;
    }
  }
}
</style>