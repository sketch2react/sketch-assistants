import { RuleDefinition, FileFormat } from '@sketch-hq/sketch-assistant-types'

const ruleIdentifier = '@sketch2react/sketch2react-core-assistant/square-brackets-group'

const squareBracketsGroup: RuleDefinition = {
  rule: async (context) => {
    const { utils } = context

    let groups: Set<FileFormat.Group> = new Set()
    const regex: RegExp = /^([^\[\]]*\[[^\[\]]*\][^\[\]]*|[^\[\]]*)$/

    for (const group of utils.objects.group) {
      const isAllowed = regex.test(group.name)
      if (!isAllowed) {
        groups.add(group)
      }
    }

    if (groups.size === 0) return

    utils.report(`Groups does not contain zero or one pair of square brackets`, ...groups)
  },
  name: `${ruleIdentifier}`,
  title: (config) =>
    config.ruleTitle
      ? config.ruleTitle
      : `Group name may contain zero or one pair of square brackets`,
  description: `Square brackets are used within the Sketch2React framework to define css-classes i.e. [css-class-name1 css-class-name2]`,
}

export default squareBracketsGroup
