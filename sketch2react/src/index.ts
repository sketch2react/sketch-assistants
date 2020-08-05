import { AssistantPackage } from '@sketch-hq/sketch-assistant-types'
import CoreAssistant from '@sketch-hq/sketch-core-assistant'
import Sketch2ReactCoreAssistant from '@sketch2react/sketch2react-core-assistant'
import { COMPARISON_OPERATORS } from './sketch2react-assistant-constants' // Will become it's own NPM-package
import { SUPPORTED_GROUP_NAMES_REGEXP, SUPPORTED_TEXT_NAMES_REGEXP } from './constants'

const assistant: AssistantPackage = [
  CoreAssistant,
  Sketch2ReactCoreAssistant,
  async () => {
    return {
      name: '@sketch2react/sketch2react-assistant',
      rules: [],
      config: {
        rules: {
          '@sketch2react/sketch2react-core-assistant/occurrence-of-artboard': {
            active: true,
            ruleTitle: `Document must contain exactly one artboard named 'Start' on a page named 'Start here'`,
            artboardPatterns: ['^Start$'],
            pagePatterns: ['^Start here$'],
            numberOfOccurrences: 1,
            comparisonOperator: COMPARISON_OPERATORS.EQUAL,
          },
          '@sketch-hq/sketch-core-assistant/name-pattern-groups': {
            active: true,
            allowed: SUPPORTED_GROUP_NAMES_REGEXP,
            forbidden: [],
            ruleTitle: 'Group must have a valid Sketch2React component name',
          },
          '@sketch-hq/sketch-core-assistant/name-pattern-text': {
            active: true,
            allowed: SUPPORTED_TEXT_NAMES_REGEXP,
            forbidden: [],
            ruleTitle: 'Text must have a valid Sketch2React component name',
          },
          '@sketch2react/sketch2react-core-assistant/occurrence-of-page': {
            active: true,
            ruleTitle: `Document must contain exactly one page named 'Start here'`,
            patterns: ['^Start here$'],
            numberOfOccurrences: 1,
            comparisonOperator: COMPARISON_OPERATORS.EQUAL,
          },
          '@sketch2react/sketch2react-core-assistant/square-brackets-group': {
            active: true,
          },
          '@sketch2react/sketch2react-core-assistant/square-brackets-text': {
            active: true,
          },
          '@sketch2react/sketch2react-core-assistant/curly-brackets-group': {
            active: true,
          },
          '@sketch2react/sketch2react-core-assistant/curly-brackets-text': {
            active: true,
          },
        },
      },
    }
  },
]

export default assistant
