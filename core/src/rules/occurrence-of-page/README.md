# occurrence-of-page

A rule to verify the number of occurrences of a page matching a certain name pattern within a
document.

## Options

### `active: boolean`

Default Sketch Assistant property

### `patterns: string[]`

An array of patterns towards which the rule will match the page’s name. It’s enought that one of the
patterns in the array matches the page’s name.

### `numberOfOccurrences: number`

The number of times we want a page with a certain pattern(s) to occur.

### `comparisonOperator: enum`

This property uses the enum _COMPARISON_OPERATORS_ in _CoreConstants_ that you import from
_@sketch2react/sketch2react-core-assistant_ and can be one of the following four:

#### EQUALS

The given pattern(s) must occur exactly X number of times.

#### NOT_EQUALS

The given pattern(s) must not occur exactly X number of times.

#### LESS_THAN

The given pattern(s) must occur less than X number of times.

#### GREATER_THAN

The given pattern(s) must occur more than X number of times.

## Example configuration

Document must only contain one page matching the pattern **^Bananas\$**.

```javascript
{
  active: true,
  ruleTitle: `Document must contain exactly one page named 'Bananas'`,
  patterns: ['^Bananas$'],
  numberOfOccurrences: 1,
  comparisonOperator: CoreConstants.COMPARISON_OPERATORS.EQUAL,
}
```

Document must contain more than three pages matching the pattern **^May the Force be with you\$**.

```javascript
{
  active: true,
  ruleTitle: `Document must contain more than three pages named 'May the Force be with you'`,
  patterns: ['^May the Force be with you$'],
  numberOfOccurrences: 3,
  comparisonOperator: CoreConstants.COMPARISON_OPERATORS.GREATER_THAN,
}
```
