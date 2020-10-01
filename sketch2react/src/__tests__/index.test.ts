import { resolve } from 'path'
import { testAssistant } from '@sketch-hq/sketch-assistant-utils'

import Assistant from '..'

test('test assistant', async () => {
  const { violations, ruleErrors } = await testAssistant(
    resolve(__dirname, './empty.sketch'),
    Assistant,
  )
  expect(violations).toHaveLength(0)
  expect(ruleErrors).toHaveLength(0)
})
