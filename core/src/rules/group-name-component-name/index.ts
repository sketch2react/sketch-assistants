/**
 * # group-name-component-name
 *
 * Group name must contain one pair of curly brackets. Groups which
 * are made exportable are excluded.
 *
 * ## Rationale
 *
 * Curly brackets are used within the [Sketch2React](https://sketch2react.gitbook.io/sketch2react-io/)
 * framework to define component name i.e. {container}. Incorrect number of square brackets will cause
 * parsing errors.
 *
 * ## Options
 *
 * None.
 *
 */

import { RuleDefinition, FileFormat } from '@sketch-hq/sketch-assistant-types'

const ruleIdentifier = '@sketch2react/sketch2react-core-assistant/group-name-component-name'

const groupNameComponentName: RuleDefinition = {
  rule: async (context) => {
    const { utils } = context

    let groups: Set<FileFormat.Group> = new Set()
    const regex: RegExp = /^[^{}]*{[^{}]*\}[^{}]*$/

    for (const group of utils.objects.group) {
      const isExportable = group.exportOptions.exportFormats.length > 0
      const isAllowed = regex.test(group.name)
      if (!isAllowed && !isExportable) {
        groups.add(group)
      }
    }

    if (groups.size === 0) return

    utils.report(`Group names does not contain one pair of curly brackets`, ...groups)
  },
  name: `${ruleIdentifier}`,
  title: (config) =>
    config.ruleTitle ? config.ruleTitle : `Group name must contain one pair of curly brackets { }`,
  description: `Curly brackets are used within the Sketch2React framework to define component name i.e. {container}`,
}

export default groupNameComponentName
