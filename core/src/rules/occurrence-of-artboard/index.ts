/**
 * # occurrence-of-artboard
 *
 * A rule to verify the number of occurrences of an artboard matching a certain name pattern within a
 * document.
 *
 * ## Options
 *
 * ### `active: boolean`
 *
 * Default Sketch Assistant property
 *
 * ### `artboardPatterns: string[]`
 *
 * An array of patterns towards which the rule will match the artboard's name. It’s enought that one of
 * the patterns in the array matches the artboard’s name.
 *
 * ### `pagePatterns: string[]`
 *
 * Used if you whish to check for an artboard only on certain page(s). An array of patterns towards
 * which the rule will match the page’s name. It’s enought that one of the patterns in the array
 * matches the page’s name.
 *
 * ### `numberOfOccurrences: number`
 *
 * The number of times we want an artboard with a certain pattern(s) to occur.
 *
 * ### `comparisonOperator: enum`
 *
 * This property uses the enum _COMPARISON_OPERATORS_ in _CoreConstants_ that you import from
 * _@sketch2react/sketch2react-core-assistant_ and can be one of the following four:
 *
 * #### EQUALS
 *
 * The given pattern(s) must occur exactly X number of times.
 *
 * #### NOT_EQUALS
 *
 * The given pattern(s) must not occur exactly X number of times.
 *
 * #### LESS_THAN
 *
 * The given pattern(s) must occur less than X number of times.
 *
 * #### GREATER_THAN
 *
 * The given pattern(s) must occur more than X number of times.
 *
 * ## Example configuration
 *
 * Document must only contain one artboard matching the pattern **^Turtles\$** on page(s) matching the
 * pattern **^Teenage Mutant Ninja\$**.
 *
 * ```javascript
 * {
 *  active: true,
 *  ruleTitle: `Document must contain exactly one page named 'Teenage Mutant Ninja' with an artboard named 'Turtles'`,
 *  artboardPatterns: ['^Turtles$'],
 *  pagePatterns: ['^Teenage Mutant Ninja$'],
 *  numberOfOccurrences: 1,
 *  comparisonOperator: CoreConstants.COMPARISON_OPERATORS.EQUAL,
 * }
 * ```
 *
 * Document must contain more than three artboards matching the pattern **^always\$** on page(s)
 * matching the pattern **^May the Force be with you\$**.
 *
 * ```javascript
 * {
 *  active: true,
 *  ruleTitle: `Document must contain more than three artboards named 'always' on page(s) named 'May the Force be with you'`,
 *  artboardPatterns: ['^always$'],
 *  pagePatterns: ['^May the Force be with you$'],
 *  numberOfOccurrences: 3,
 *  comparisonOperator: CoreConstants.COMPARISON_OPERATORS.GREATER_THAN,
 * }
 * ```
 *
 */
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
