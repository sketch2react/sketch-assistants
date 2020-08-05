import { RuleDefinition, FileFormat } from '@sketch-hq/sketch-assistant-types'

const ruleIdentifier = '@sketch2react/sketch2react-core-assistant/curly-brackets-text'

const curlyBracketsText: RuleDefinition = {
  rule: async (context) => {
    const { utils } = context

    let texts: Set<FileFormat.Text> = new Set()
    const regex: RegExp = /^[^{}]*{[^{}]*\}[^{}]*$/

    for (const text of utils.objects.text) {
      const isAllowed = regex.test(text.name)
      if (!isAllowed) {
        texts.add(text)
      }
    }

    if (texts.size === 0) return

    utils.report(`Text names does not contain one pair of curly brackets`, ...texts)
  },
  name: `${ruleIdentifier}`,
  title: (config) =>
    config.ruleTitle ? config.ruleTitle : `Text name must contain one pair of curly brackets`,
  description: `Curly brackets are used within the Sketch2React framework to define component name i.e. {text}`,
}

export default curlyBracketsText
