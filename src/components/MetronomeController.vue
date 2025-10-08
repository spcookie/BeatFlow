<template>
  <div class="metronome-controller">
    <div class="metronome-controller__controls">
      <a-button
        :type="isPlaying ? 'default' : 'primary'"
        :size="'large'"
        :icon="isPlaying ? h(PauseOutlined) : h(PlayCircleOutlined)"
        @click="toggle"
        class="metronome-controller__button metronome-controller__button--play"
      >
        {{ isPlaying ? '暂停' : '开始' }}
      </a-button>
    </div>
    
    <div class="metronome-controller__beat-indicator">
      <div class="metronome-controller__beat-display">
        <span class="metronome-controller__current-beat">{{ currentBeat }}</span>
        <span class="metronome-controller__beat-separator">/</span>
        <span class="metronome-controller__total-beats">{{ beatsPerMeasure }}</span>
      </div>
      <div class="metronome-controller__beat-dots">
        <div
          v-for="beat in beatsPerMeasure"
          :key="beat"
          :class="[
            'metronome-controller__beat-dot',
            {
              'metronome-controller__beat-dot--active': beat === currentBeat && isPlaying,
              'metronome-controller__beat-dot--accent': beat === 1
            }
          ]"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { storeToRefs } from 'pinia'
import { PlayCircleOutlined, PauseOutlined } from '@ant-design/icons-vue'
import { useMetronomeStore } from '@/stores/counter'

const metronomeStore = useMetronomeStore()
const { isPlaying, currentBeat, beatsPerMeasure } = storeToRefs(metronomeStore)
const { toggle } = metronomeStore
</script>

<style lang="scss" scoped>
.metronome-controller {
  @apply flex flex-col items-center space-y-6;

  &__controls {
    @apply flex justify-center gap-4;
  }

  &__button {
    @apply h-16 px-6 text-lg font-semibold rounded-card border-none flex items-center justify-center;
    min-width: 120px;
    gap: 8px;
    line-height: 1;
    
    :deep(.anticon) {
      font-size: 20px;
      display: flex;
      align-items: center;
    }
    
    &.ant-btn-primary {
      background-color: var(--color-primary);
      
      &:hover {
        background-color: #ff8a94 !important;
      }
    }
    
    &.ant-btn-default {
      background-color: var(--color-secondary);
      color: white;
      
      &:hover {
        background-color: #ffa8a8 !important;
        color: white !important;
      }
    }
    

  }

  &__beat-indicator {
    @apply flex flex-col items-center space-y-4;
  }

  &__beat-display {
    @apply flex items-center text-4xl font-bold text-text;
  }

  &__current-beat {
    @apply text-primary;
  }

  &__beat-separator {
    @apply mx-2 text-text-light;
  }

  &__total-beats {
    @apply text-text-light;
  }

  &__beat-dots {
    @apply flex space-x-3;
  }

  &__beat-dot {
    @apply w-4 h-4 rounded-full border-2 transition-all duration-200;
    border-color: var(--color-text-light);
    
    &--active {
      background-color: var(--color-primary);
      border-color: var(--color-primary);
      transform: scale(1.2);
    }
    
    &--accent {
      border-width: 3px;
      
      &.metronome-controller__beat-dot--active {
        background-color: var(--color-secondary);
        border-color: var(--color-secondary);
      }
    }
  }
}
</style>