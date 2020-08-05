import { RuleDefinition, FileFormat } from '@sketch-hq/sketch-assistant-types'
import { assertStringArray, assertNumber, assertComparisonOperators } from '../../assertions'
import { ComparisonOperators } from '../../sketch2react-assistant-types' // will become it's own NPM-package

const ruleIdentifier = '@sketch2react/sketch2react-core-assistant/occurrence-of-page'

const occurrenceOfPage: RuleDefinition = {
  rule: async (context) => {
    const { utils } = context
    const patterns: Array<string> = utils.getOption('patterns')
    const numberOfOccurrences: Number = utils.getOption('numberOfOccurrences')
    const comparisonOperator: Number = utils.getOption('comparisonOperator')

    assertStringArray(patterns)
    assertNumber(numberOfOccurrences)
    assertComparisonOperators(comparisonOperator)

    const regexps = patterns.map((name) => new RegExp(name))
    let pages: Set<FileFormat.Page> = new Set()

    for (const page of utils.objects.page) {
      const exists = regexps.map((regex: RegExp) => regex.test(page.name)).includes(true)
      if (exists) {
        pages.add(page)
      }
    }

    switch (comparisonOperator) {
      case ComparisonOperators.EQUAL:
        if (pages.size === numberOfOccurrences) return
        else if (pages.size > numberOfOccurrences)
          utils.report(`Too many pages matching "${patterns.join(', ')}" was found.`, ...pages)
        else utils.report(`Too few pages matching "${patterns.join(', ')}" was found.`, ...pages)
        break
      case ComparisonOperators.GREATER_THAN:
        if (pages.size > numberOfOccurrences) return
        else utils.report(`Too few pages matching "${patterns.join(', ')}" was found.`, ...pages)
        break
      case ComparisonOperators.LESS_THAN:
        if (pages.size < numberOfOccurrences) return
        else utils.report(`Too many pages matching "${patterns.join(', ')}" was found.`, ...pages)
        break
      case ComparisonOperators.NOT_EQUAL:
        if (pages.size !== numberOfOccurrences) return
        else
          utils.report(
            `Your document may not contain ${numberOfOccurrences} page(s) matching "${patterns.join(
              ', ',
            )}".`,
            ...pages,
          )
        break
      default:
        return
    }
  },
  name: `${ruleIdentifier}`,
  title: (config) =>
    config.ruleTitle
      ? config.ruleTitle
      : `Document must contain a page matching '${config.patterns}'`,
  description: () =>
    `A rule to verify the number of occurrences of a page with a certain name within a document.`,
}

export default occurrenceOfPage
