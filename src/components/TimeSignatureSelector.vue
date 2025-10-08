<template>
  <div class="time-signature-selector">
    <div class="time-signature-selector__header">
      <h3 class="time-signature-selector__title">拍号</h3>
      <div class="time-signature-selector__current">
        {{ timeSignature.label }}
      </div>
    </div>
    
    <div class="time-signature-selector__options">
      <a-button
        v-for="signature in TIME_SIGNATURES"
        :key="signature.label"
        @click="setTimeSignature(signature)"
        :type="signature.label === timeSignature.label ? 'primary' : 'default'"
        class="time-signature-selector__option"
        size="large"
      >
        {{ signature.label }}
      </a-button>
    </div>
    
    <div class="time-signature-selector__description">
      <p class="time-signature-selector__desc-text">
        当前拍号：<strong>{{ timeSignature.numerator }}</strong> 拍每小节，
        以 <strong>{{ timeSignature.denominator }}</strong> 分音符为一拍
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMetronomeStore } from '@/stores/counter'
import { TIME_SIGNATURES } from '@/types/metronome'

const metronomeStore = useMetronomeStore()
const { timeSignature } = storeToRefs(metronomeStore)
const { setTimeSignature } = metronomeStore
</script>

<style lang="scss" scoped>
.time-signature-selector {
  @apply space-y-4;

  &__header {
    @apply text-center;
  }

  &__title {
    @apply text-lg font-semibold text-text mb-2;
  }

  &__current {
    @apply text-2xl font-bold text-primary;
  }

  &__options {
    @apply grid grid-cols-3 gap-3;
  }

  &__option {
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

  &__description {
    @apply text-center;
  }

  &__desc-text {
    @apply text-sm text-text-light;
    
    strong {
      @apply text-text font-semibold;
    }
  }
}

@media (max-width: 640px) {
  .time-signature-selector {
    &__options {
      @apply grid-cols-2;
    }
  }
}
</style>