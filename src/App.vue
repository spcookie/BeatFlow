<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <div id="app">
    <nav class="app-nav">
      <div class="app-nav__container">
        <div class="app-nav__dropdown">
          <button 
            class="app-nav__toggle" 
            @click="toggleMenu"
            :class="{ 'app-nav__toggle--active': isMenuOpen }"
          >
            <span class="app-nav__toggle-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <span class="app-nav__toggle-text">BeatFlow</span>
            <span class="app-nav__logo">
              <svg width="24" height="24" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="15" fill="#ff9aa2"/>
                <g transform="translate(16, 16)" fill="white">
                  <circle cx="0" cy="-6" r="2"/>
                  <ellipse cx="0" cy="0" rx="1.5" ry="6"/>
                  <ellipse cx="-4" cy="-2" rx="1" ry="4" transform="rotate(-45)"/>
                  <ellipse cx="4" cy="-2" rx="1" ry="4" transform="rotate(45)"/>
                  <ellipse cx="-2" cy="6" rx="1" ry="4" transform="rotate(-20)"/>
                  <ellipse cx="2" cy="6" rx="1" ry="4" transform="rotate(20)"/>
                </g>
                <g transform="translate(16, 16)" stroke="white" stroke-width="1" fill="white">
                  <line x1="0" y1="-12" x2="0" y2="-4"/>
                  <circle cx="0" cy="-11" r="1.5"/>
                </g>
              </svg>
            </span>
          </button>
          
          <div 
            class="app-nav__menu" 
            :class="{ 'app-nav__menu--open': isMenuOpen }"
          >
            <RouterLink to="/" class="app-nav__link" @click="closeMenu">
               <span class="app-nav__link-icon">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                 </svg>
               </span>
               首页
             </RouterLink>
             <RouterLink to="/about" class="app-nav__link" @click="closeMenu">
               <span class="app-nav__link-icon">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                 </svg>
               </span>
               关于
             </RouterLink>
          </div>
        </div>
      </div>
    </nav>
    
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss" scoped>
#app {
  @apply min-h-screen;
  background: linear-gradient(135deg, var(--color-background) 0%, #f0f9e8 100%);
}

.app-nav {
  @apply fixed top-0 left-0 z-50;

  &__container {
    @apply p-4;
  }

  &__dropdown {
    @apply relative;
  }

  &__toggle {
    @apply flex items-center space-x-3 px-4 py-3 bg-white rounded-lg shadow-md border border-gray-200 transition-all duration-200 cursor-pointer;

    &--active {
      @apply shadow-lg;
      background-color: var(--color-surface);
    }
  }

  &__logo {
    @apply flex items-center justify-center;
    
    svg {
      @apply transition-transform duration-200;
    }
  }

  &__toggle-icon {
    @apply flex flex-col space-y-1;

    span {
      @apply w-4 h-0.5 bg-gray-600 transition-all duration-200;
    }
  }

  &__toggle--active &__toggle-icon {
    span:nth-child(1) {
      @apply transform rotate-45 translate-y-1.5;
    }
    
    span:nth-child(2) {
      @apply opacity-0;
    }
    
    span:nth-child(3) {
      @apply transform -rotate-45 -translate-y-1.5;
    }
  }

  &__toggle-text {
    @apply text-lg font-bold;
    color: var(--color-primary);
  }

  &__menu {
    @apply absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 min-w-48 opacity-0 invisible transform scale-95 transition-all duration-200;

    &--open {
      @apply opacity-100 visible scale-100;
    }
  }

  &__link {
    @apply flex items-center space-x-3 px-4 py-3 no-underline transition-colors border-b border-gray-100 last:border-b-0;
    color: var(--color-text-light);

    &.router-link-active {
      color: var(--color-primary);
      background-color: var(--color-surface);
      font-weight: 600;
    }

    &:first-child {
      @apply rounded-t-lg;
    }

    &:last-child {
      @apply rounded-b-lg;
    }
  }

  &__link-icon {
    @apply text-base;
  }
}

.app-main {
  @apply flex-1;
  min-height: 100vh;
  padding-top: 1rem;
}

@media (max-width: 768px) {
  .app-nav {
    &__container {
      @apply p-2;
    }

    &__toggle {
      @apply px-3 py-2 space-x-2;
    }

    &__toggle-text {
      @apply text-base;
    }

    &__menu {
      @apply min-w-40;
    }

    &__link {
      @apply px-3 py-2 text-sm;
    }
  }
}
</style>
