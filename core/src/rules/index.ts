import occurrenceOfArtboard from './occurrence-of-artboard'
import occurrenceOfPage from './occurrence-of-page'
import squareBracketsGroup from './square-brackets-group'
import squareBracketsText from './square-brackets-text'
import curlyBracketsGroup from './curly-brackets-group'
import curlyBracketsText from './curly-brackets-text'

const rules = [
  occurrenceOfArtboard,
  occurrenceOfPage,
  squareBracketsGroup,
  squareBracketsText,
  curlyBracketsGroup,
  curlyBracketsText,
]

export default rules
export {
  occurrenceOfArtboard,
  occurrenceOfPage,
  squareBracketsGroup,
  squareBracketsText,
  curlyBracketsGroup,
  curlyBracketsText,
}
