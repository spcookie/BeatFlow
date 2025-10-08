import { ref, computed, readonly } from 'vue'
import { defineStore } from 'pinia'
import type { MetronomeState, TimeSignature, TimerState } from '@/types/metronome'
import { TIME_SIGNATURES as TIME_SIGNATURES_CONST, BPM_RANGE } from '@/types/metronome'

export const useMetronomeStore = defineStore('metronome', () => {
  // 节拍器状态
  const isPlaying = ref(false)
  const bpm = ref(BPM_RANGE.DEFAULT)
  const timeSignature = ref<TimeSignature>(TIME_SIGNATURES_CONST[2]!) // 默认4/4拍
  const TIME_SIGNATURES = readonly(ref(TIME_SIGNATURES_CONST))
  const currentBeat = ref(1)
  const elapsedTime = ref(0)
  const startTime = ref<number | null>(null)
  
  // 计时器状态
  const currentTime = ref('')
  const elapsedTimeFormatted = ref('00:00')
  
  // 声音设置
  const volume = ref(80)
  const selectedSound = ref('click')
  
  // 音频相关
  let audioContext: AudioContext | null = null
  let intervalId: number | null = null
  let timeUpdateId: number | null = null
  
  // 计算属性
  const beatInterval = computed(() => 60000 / bpm.value) // 毫秒
  const beatsPerMeasure = computed(() => timeSignature.value.numerator)
  
  // 格式化时间
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  const formatCurrentTime = (): string => {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const seconds = now.getSeconds().toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }
  
  // 获取声音参数
  const getSoundParams = (soundType: string, isAccent: boolean) => {
    const baseVolume = volume.value / 100
    const accentVolume = baseVolume * 1.5
    
    switch (soundType) {
      case 'click':
        return {
          frequency: isAccent ? 1200 : 800,
          type: 'sine' as OscillatorType,
          duration: 0.05,
          volume: isAccent ? accentVolume : baseVolume
        }
      case 'beep':
        return {
          frequency: isAccent ? 880 : 440,
          type: 'square' as OscillatorType,
          duration: 0.1,
          volume: isAccent ? accentVolume : baseVolume
        }
      case 'tick':
        return {
          frequency: isAccent ? 2000 : 1500,
          type: 'triangle' as OscillatorType,
          duration: 0.03,
          volume: isAccent ? accentVolume : baseVolume
        }
      case 'wood':
        return {
          frequency: isAccent ? 300 : 200,
          type: 'sawtooth' as OscillatorType,
          duration: 0.08,
          volume: isAccent ? accentVolume : baseVolume
        }
      default:
        return {
          frequency: isAccent ? 800 : 400,
          type: 'sine' as OscillatorType,
          duration: 0.1,
          volume: isAccent ? accentVolume : baseVolume
        }
    }
  }

  // 播放节拍音效
  const playBeatSound = (isAccent: boolean = false) => {
    if (!audioContext) {
      audioContext = new AudioContext()
    }
    
    const params = getSoundParams(selectedSound.value, isAccent)
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = params.frequency
    oscillator.type = params.type
    
    gainNode.gain.setValueAtTime(params.volume, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + params.duration)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + params.duration)
  }
  
  // 开始节拍器
  const start = () => {
    if (isPlaying.value) return
    
    isPlaying.value = true
    
    // 如果是从暂停状态恢复，调整开始时间以保持已有的练习时长
    if (startTime.value === null) {
      startTime.value = Date.now()
    } else {
      // 从暂停恢复：调整开始时间 = 当前时间 - 已经过的时间
      startTime.value = Date.now() - (elapsedTime.value * 1000)
    }
    
    currentBeat.value = 1
    
    // 立即播放第一拍
    playBeatSound(true)
    
    // 设置节拍间隔
    intervalId = window.setInterval(() => {
      currentBeat.value = currentBeat.value >= beatsPerMeasure.value ? 1 : currentBeat.value + 1
      playBeatSound(currentBeat.value === 1)
    }, beatInterval.value)
    
    // 更新计时器
    timeUpdateId = window.setInterval(() => {
      if (startTime.value) {
        elapsedTime.value = Math.floor((Date.now() - startTime.value) / 1000)
        elapsedTimeFormatted.value = formatTime(elapsedTime.value)
      }
      currentTime.value = formatCurrentTime()
    }, 1000)
  }
  
  // 暂停节拍器（保持练习时长）
  const pause = () => {
    isPlaying.value = false
    
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
    
    if (timeUpdateId) {
      clearInterval(timeUpdateId)
      timeUpdateId = null
    }
    
    currentBeat.value = 1
    // 保持 elapsedTime 和 startTime，不重置练习时长
  }
  
  // 重置节拍器（归零练习时长）
  const reset = () => {
    isPlaying.value = false
    
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
    
    if (timeUpdateId) {
      clearInterval(timeUpdateId)
      timeUpdateId = null
    }
    
    currentBeat.value = 1
    elapsedTime.value = 0
    elapsedTimeFormatted.value = '00:00'
    startTime.value = null
  }
  
  // 停止节拍器（向后兼容，实际调用重置）
  const stop = () => {
    reset()
  }
  
  // 切换播放状态
  const toggle = () => {
    if (isPlaying.value) {
      pause()
    } else {
      start()
    }
  }
  
  // 设置BPM
  const setBpm = (newBpm: number) => {
    if (newBpm >= BPM_RANGE.MIN && newBpm <= BPM_RANGE.MAX) {
      bpm.value = newBpm
      
      // 如果正在播放，重新设置间隔
      if (isPlaying.value && intervalId) {
        clearInterval(intervalId)
        intervalId = window.setInterval(() => {
          currentBeat.value = currentBeat.value >= beatsPerMeasure.value ? 1 : currentBeat.value + 1
          playBeatSound(currentBeat.value === 1)
        }, beatInterval.value)
      }
    }
  }
  
  // 设置拍号
  const setTimeSignature = (newTimeSignature: TimeSignature) => {
    timeSignature.value = newTimeSignature
    currentBeat.value = 1
  }
  
  // 设置音量
  const setVolume = (newVolume: number) => {
    if (newVolume >= 0 && newVolume <= 100) {
      volume.value = newVolume
    }
  }
  
  // 设置声音类型
  const setSound = (soundType: string) => {
    selectedSound.value = soundType
  }
  

  
  // 初始化当前时间显示
  currentTime.value = formatCurrentTime()
  
  return {
    // 状态
    isPlaying,
    bpm,
    timeSignature,
    currentBeat,
    elapsedTime,
    currentTime,
    elapsedTimeFormatted,
    volume,
    selectedSound,
    
    // 计算属性
    beatInterval,
    beatsPerMeasure,
    
    // 方法
    start,
    pause,
    stop,
    reset,
    toggle,
    setBpm,
    setTimeSignature,
    setVolume,
    setSound,
    
    // 常量
    TIME_SIGNATURES,
    BPM_RANGE
  }
}, {
  persist: {
    key: 'metronome-settings',
    storage: localStorage,
    pick: ['bpm', 'timeSignature', 'volume', 'selectedSound']
  }
})
