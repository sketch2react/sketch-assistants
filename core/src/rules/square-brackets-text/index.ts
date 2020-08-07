/**
 * # square-brackets-text
 *
 * Text name may contain zero or one pair of square brackets.
 *
 * ## Rationale
 *
 * Square brackets are used within the [Sketch2React](https://sketch2react.gitbook.io/sketch2react-io/) framework to define css-classes i.e. [css-class-name1 css-class-name2]. Incorrect number of square brackets will cause parsing errors.
 *
 * ## Options
 *
 * None.
 *
 */
import { RuleDefinition, FileFormat } from '@sketch-hq/sketch-assistant-types'

const ruleIdentifier = '@sketch2react/sketch2react-core-assistant/square-brackets-text'

const squareBracketsText: RuleDefinition = {
  rule: async (context) => {
    const { utils } = context

    let texts: Set<FileFormat.Text> = new Set()
    const regex: RegExp = /^([^\[\]]*\[[^\[\]]*\][^\[\]]*|[^\[\]]*)$/

    for (const text of utils.objects.text) {
      const isAllowed = regex.test(text.name)
      if (!isAllowed) {
        texts.add(text)
      }
    }

    if (texts.size === 0) return

    utils.report(`Texts does not contain zero or one pair of square brackets`, ...texts)
  },
  name: `${ruleIdentifier}`,
  title: (config) =>
    config.ruleTitle
      ? config.ruleTitle
      : `Text name may contain zero or one pair of square brackets [ ]`,
  description: `Square brackets are used within the Sketch2React framework to define css-classes i.e. [css-class-name1 css-class-name2]`,
}

export default squareBracketsText
