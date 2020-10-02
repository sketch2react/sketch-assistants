import { AssistantSuccessResult } from '@sketch-hq/sketch-assistant-types'

export type TestResult = Omit<AssistantSuccessResult, 'metadata' | 'profile'>
