import { resolve } from 'path'
import { testAssistant } from '@sketch-hq/sketch-assistant-utils'

import Assistant from '../../../..'
import { RuleError, Violation } from '@sketch-hq/sketch-assistant-types'

let assistantViolations: Violation[], assistantRuleErrors: RuleError[]

beforeAll(async () => {
  const { violations, ruleErrors } = await testAssistant(
    resolve(__dirname, './with-errors.sketch'),
    Assistant,
  )
  assistantViolations = violations
  assistantRuleErrors = ruleErrors
})

describe('assistant tests', () => {
  it('should not have any rule errors', () => {
    expect(assistantRuleErrors).toHaveLength(0)
  })
  it('should include one violation', () => {
    expect(assistantViolations).toHaveLength(1)
  })
  it('should complain about the artboard named "Portfolio"', () => {
    expect(assistantViolations[0].message).toBe(
      'Artboard Portfolio does not contain an {externalasset.css}',
    )
  })
})
