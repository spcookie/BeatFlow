// 节拍器相关类型定义

export interface TimeSignature {
  numerator: number
  denominator: number
  label: string
}

export interface MetronomeState {
  isPlaying: boolean
  bpm: number
  timeSignature: TimeSignature
  currentBeat: number
  elapsedTime: number // 秒
  startTime: number | null
}

export interface TimerState {
  currentTime: string // hh:mm:ss格式
  elapsedTime: string // MM:SS格式
}

export const TIME_SIGNATURES: TimeSignature[] = [
  { numerator: 2, denominator: 4, label: '2/4' },
  { numerator: 3, denominator: 4, label: '3/4' },
  { numerator: 4, denominator: 4, label: '4/4' },
  { numerator: 6, denominator: 8, label: '6/8' },
  { numerator: 9, denominator: 8, label: '9/8' },
  { numerator: 12, denominator: 8, label: '12/8' }
]

export const BPM_RANGE = {
  MIN: 40,
  MAX: 240,
  DEFAULT: 120
}