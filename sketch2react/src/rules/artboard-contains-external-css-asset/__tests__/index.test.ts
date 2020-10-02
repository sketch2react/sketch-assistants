import { resolve } from 'path'
import { testRule } from '@sketch-hq/sketch-assistant-utils'

import Rule from '..'

import { RULE_CONFIG } from '../../../constants'
import { TestResult } from '../../../test-helpers'

const RULE_VIOLATION_MESSAGE = 'Artboard Portfolio does not contain an {externalasset.css}'

let res: TestResult

beforeAll(async () => {
  res = await testRule(resolve(__dirname, './with-errors.sketch'), Rule, RULE_CONFIG)
})

it('should not have any rule errors', async () => {
  expect(res.ruleErrors).toHaveLength(0)
})
it('should include one violation', async () => {
  expect(res.violations).toHaveLength(1)
})
it('should complain about the artboard named "Portfolio"', async () => {
  expect(res.violations[0].message).toBe(RULE_VIOLATION_MESSAGE)
})
