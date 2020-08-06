import { AssistantDefinition, AssistantPackage } from '@sketch-hq/sketch-assistant-types'
import * as CoreConstants from './sketch2react-assistant-constants'
import rules from './rules'

const assistant: AssistantPackage = async () => {
  const name = '@sketch2react/sketch2react-core-assistant'
  const definition: AssistantDefinition = {
    name,
    rules,
    config: {
      rules: {},
    },
  }
  return definition
}

export default assistant
export { CoreConstants }
