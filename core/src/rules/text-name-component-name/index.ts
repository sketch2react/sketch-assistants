/**
 * # text-name-component-name
 *
 * Text name must contain one pair of curly brackets. Texts which
 * are made exportable are excluded.
 *
 * ## Rationale
 *
 * Curly brackets are used within the [Sketch2React](https://sketch2react.gitbook.io/sketch2react-io/)
 * framework to define component name i.e. {text}. Incorrect number of square brackets will cause
 * parsing errors.
 *
 * ## Options
 *
 * None.
 *
 */

import { RuleDefinition, FileFormat } from '@sketch-hq/sketch-assistant-types'

const ruleIdentifier = '@sketch2react/sketch2react-core-assistant/text-name-component-name'

const textNameComponentName: RuleDefinition = {
  rule: async (context) => {
    const { utils } = context

    let texts: Set<FileFormat.Text> = new Set()
    const regex: RegExp = /^[^{}]*{[^{}]*\}[^{}]*$/

    for (const text of utils.objects.text) {
      const isExportable = text.exportOptions.exportFormats.length > 0
      const isAllowed = regex.test(text.name)
      if (!isAllowed && !isExportable) {
        texts.add(text)
      }
    }

    if (texts.size === 0) return

    utils.report(`Text names does not contain one pair of curly brackets`, ...texts)
  },
  name: `${ruleIdentifier}`,
  title: (config) =>
    config.ruleTitle ? config.ruleTitle : `Text name must contain one pair of curly brackets { }`,
  description: `Curly brackets are used within the Sketch2React framework to define component name i.e. {text}`,
}

export default textNameComponentName
