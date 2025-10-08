<template>
  <div class="sound-options">
    <div class="sound-options__header">
      <h3 class="sound-options__title">节拍声音</h3>
    </div>
    
    <div class="sound-options__controls">
      <div class="sound-options__volume">
        <label class="sound-options__volume-label">音量</label>
        <a-slider
          v-model:value="volume"
          :min="0"
          :max="100"
          :step="1"
          @change="handleVolumeChange"
          class="sound-options__volume-slider"
        />
        <span class="sound-options__volume-value">{{ volume }}%</span>
      </div>
      
      <div class="sound-options__sounds">
        <label class="sound-options__sounds-label">声音类型</label>
        <div class="sound-options__sound-buttons">
          <a-button
            v-for="sound in soundTypes"
            :key="sound.id"
            @click="selectSound(sound.id)"
            :type="selectedSound === sound.id ? 'primary' : 'default'"
            size="large"
            class="sound-options__sound-button"
          >
            {{ sound.name }}
          </a-button>
        </div>
      </div>
      

    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMetronomeStore } from '@/stores/counter'

const metronomeStore = useMetronomeStore()
const { volume, selectedSound } = storeToRefs(metronomeStore)
const { setVolume, setSound } = metronomeStore

const soundTypes = [
  { id: 'click', name: '点击' },
  { id: 'beep', name: '蜂鸣' },
  { id: 'tick', name: '滴答' },
  { id: 'wood', name: '木块' }
]

const handleVolumeChange = (value: number) => {
  setVolume(value)
}

const selectSound = (soundId: string) => {
  setSound(soundId)
}
</script>

<style lang="scss" scoped>
.sound-options {
  @apply space-y-4;

  &__header {
    @apply text-center;
  }

  &__title {
    @apply text-lg font-semibold text-text mb-2;
  }

  &__controls {
    @apply space-y-4;
  }

  &__volume {
    @apply space-y-2;
  }

  &__volume-label {
    @apply block text-sm font-medium text-text;
  }

  &__volume-slider {
    @apply w-full;
    
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

  &__volume-value {
    @apply text-sm text-text-light text-center block;
  }

  &__sounds {
    @apply space-y-2;
  }

  &__sounds-label {
    @apply block text-sm font-medium text-text;
  }

  &__sound-buttons {
    @apply grid grid-cols-2 gap-2;
  }

  &__sound-button {
    @apply rounded-card border-none font-semibold flex items-center justify-center;
    height: 44px;
    font-size: 16px;
    line-height: 1;
    
    &.ant-btn-default {
      background-color: var(--color-surface);
      color: var(--color-text);
      
      &:hover {
        background-color: var(--color-accent) !important;
        color: var(--color-text) !important;
      }
    }
    
    &.ant-btn-primary {
      background-color: var(--color-primary);
      color: white;
      
      &:hover {
        background-color: #ff8a94 !important;
      }
    }
  }


}
</style>