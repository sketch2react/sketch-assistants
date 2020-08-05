import { RuleDefinition, FileFormat } from '@sketch-hq/sketch-assistant-types'
import { assertStringArray, assertNumber, assertComparisonOperators } from '../../assertions'
import { COMPARISON_OPERATORS } from '../../sketch2react-assistant-constants' // will become it's own NPM-package

const ruleIdentifier = '@sketch2react/sketch2react-core-assistant/occurrence-of-artboard'

const occurrenceOfArtboard: RuleDefinition = {
  rule: async (context) => {
    const { utils } = context
    const artboardPatterns: Array<string> = utils.getOption('artboardPatterns')
    const pagePatterns: Array<string> = utils.getOption('pagePatterns')
    const numberOfOccurrences: Number = utils.getOption('numberOfOccurrences')
    const comparisonOperator: Number = utils.getOption('comparisonOperator')

    assertStringArray(artboardPatterns)
    assertStringArray(pagePatterns)
    assertNumber(numberOfOccurrences)
    assertComparisonOperators(comparisonOperator)

    const artboardRegExps = artboardPatterns.map((name) => new RegExp(name))
    const pageRegExps = pagePatterns.map((name) => new RegExp(name))
    let artboards: Set<FileFormat.Artboard> = new Set()

    for (const page of utils.objects.page) {
      const pageMatches = pageRegExps.map((regex: RegExp) => regex.test(page.name))

      if (pageMatches.length === 0 || pageMatches.includes(true)) {
        const pageArtboards: Array<FileFormat.AnyLayer> = page.layers.filter(
          (layer) => layer._class === FileFormat.ClassValue.Artboard,
        )

        for (const pageArtboard of pageArtboards) {
          const artboardMatches = artboardRegExps.map((regex: RegExp) =>
            regex.test(pageArtboard.name),
          )

          if (artboardMatches.includes(true)) {
            artboards.add(pageArtboard as FileFormat.Artboard)
          }
        }
      }
    }

    switch (comparisonOperator) {
      case COMPARISON_OPERATORS.EQUAL:
        if (artboards.size === numberOfOccurrences) return
        else if (artboards.size > numberOfOccurrences)
          utils.report(
            `Too many artboards matching "${artboardPatterns.join(', ')}" was found.`,
            ...artboards,
          )
        else
          utils.report(
            `Too few artboards matching "${artboardPatterns.join(', ')}" was found.`,
            ...artboards,
          )
        break
      case COMPARISON_OPERATORS.GREATER_THAN:
        if (artboards.size > numberOfOccurrences) return
        else
          utils.report(
            `Too few artboards matching "${artboardPatterns.join(', ')}" was found.`,
            ...artboards,
          )
        break
      case COMPARISON_OPERATORS.LESS_THAN:
        if (artboards.size < numberOfOccurrences) return
        else
          utils.report(
            `Too many artboards matching "${artboardPatterns.join(', ')}" was found.`,
            ...artboards,
          )
        break
      case COMPARISON_OPERATORS.NOT_EQUAL:
        if (artboards.size !== numberOfOccurrences) return
        else
          utils.report(
            `Your document may not contain ${numberOfOccurrences} artboard(s) matching "${artboardPatterns.join(
              ', ',
            )}".`,
            ...artboards,
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
      : `Document must contain an artboard matching '${config.artboardPatterns}'`,
  description: () =>
    `A rule to verify the number of occurrences of an artboard with a certain name within a document.`,
}

export default occurrenceOfArtboard
