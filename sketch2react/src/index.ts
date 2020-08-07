import { AssistantPackage } from '@sketch-hq/sketch-assistant-types'
import CoreAssistant from '@sketch-hq/sketch-core-assistant'
import Sketch2ReactCoreAssistant, { CoreConstants } from '@sketch2react/sketch2react-core-assistant'
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
            comparisonOperator: CoreConstants.COMPARISON_OPERATORS.EQUAL,
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
            comparisonOperator: CoreConstants.COMPARISON_OPERATORS.EQUAL,
          },
          '@sketch2react/sketch2react-core-assistant/group-name-css-classnames': {
            active: true,
          },
          '@sketch2react/sketch2react-core-assistant/text-name-css-classnames': {
            active: true,
          },
          '@sketch2react/sketch2react-core-assistant/group-name-component-name': {
            active: true,
          },
          '@sketch2react/sketch2react-core-assistant/text-name-component-name': {
            active: true,
          },
        },
      },
    }
  },
]

export default assistant
