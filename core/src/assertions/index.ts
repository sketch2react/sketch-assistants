import { ComparisonOperators } from '../sketch2react-assistant-types'

const isString = (val: unknown): boolean => typeof val === 'string'
const isNumber = (val: unknown): boolean => typeof val === 'number'
const isArray = (val: unknown): boolean =>
  typeof val === 'object' && val !== null && val.constructor === Array
const isStringArray = (val: unknown): boolean => {
  if (isArray(val)) {
    const array: Array<string> = val as Array<string>
    return array.map((str) => typeof str === 'string').includes(false) ? false : true
  }
  return false
}

const assertString = (option: unknown): void => {
  if (!isString(option)) throw Error(`AssertionError: value "${option}" is not a string!`)
}

const assertStringArray = (option: unknown): void => {
  if (!isStringArray(option))
    throw Error(`AssertionError: value "${option}" is not a string array!`)
}

function assertNumber(option: unknown): void {
  if (!isNumber(option)) throw Error(`AssertionError: value "${option}" is not a number!`)
}

function assertArray(option: unknown): void {
  if (!isArray(option)) throw Error(`AssertionError: value "${option}" is not an array`)
}

const assertComparisonOperators = (option: unknown): void => {
  /**
   *  Typescript does not provide a standard method to get the number of enum elements.
   *  But given the the implementation of enum reverse mapping, the following works:
   */
  const numberOfComparisonOperators = Object.keys(ComparisonOperators).length / 2

  if (
    !isNumber(option) ||
    (isNumber(option) && (option as Number) > numberOfComparisonOperators - 1)
  )
    throw Error(`value "${option}" is not a valid comparison operator!`)
}

export { assertString, assertNumber, assertArray, assertStringArray, assertComparisonOperators }
