import { AssistantPackage } from '@sketch-hq/sketch-assistant-types'
import Sketch2ReactCoreAssistant, { CoreConstants } from '@sketch2react/sketch2react-core-assistant'
import artboardContainsExternalCSSAsset from './rules/artboard-contains-external-css-asset'

const assistant: AssistantPackage = [
  Sketch2ReactCoreAssistant,
  async () => {
    return {
      name: '@sketch2react/sketch2react-assistant',
      rules: [artboardContainsExternalCSSAsset],
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
          '@sketch2react/sketch2react-assistant/artboard-contains-external-css-asset': {
            active: true,
          },
        },
      },
    }
  },
]

export default assistant
