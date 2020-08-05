# occurrence-of-artboard

A rule to verify the number of occurrences of an artboard matching a certain name pattern within a
document.

## Options

### `active: boolean`

Default Sketch Assistant property

### `artboardPatterns: string[]`

An array of patterns towards which the rule will match the artboard's name. It’s enought that one of
the patterns in the array matches the artboard’s name.

### `pagePatterns: string[]`

Used if you whish to check for an artboard only on certain page(s). An array of patterns towards
which the rule will match the page’s name. It’s enought that one of the patterns in the array
matches the page’s name.

### `numberOfOccurrences: number`

The number of times we want an artboard with a certain pattern(s) to occur.

### `comparisonOperator: enum`

This property uses the enum _ComparisonOperators_ from the package
_@sketch2react/sketch2react-assistant-types_ and can be one of the following four:

#### EQUALS

The given pattern(s) must occur exactly X number of times.

#### NOT_EQUALS

The given pattern(s) must not occur exactly X number of times.

#### LESS_THAN

The given pattern(s) must occur less than X number of times.

#### GREATER_THAN

The given pattern(s) must occur more than X number of times.

## Example configuration

Document must only contain one artboard matching the pattern **^Turtles\$** on page(s) matching the
pattern **^Teenage Mutant Ninja\$**.

```javascript
{
  active: true,
  ruleTitle: `Document must contain exactly one page named 'Teenage Mutant Ninja' with an artboard named 'Turtles'`,
  artboardPatterns: ['^Turtles$'],
  pagePatterns: ['^Teenage Mutant Ninja$'],
  numberOfOccurrences: 1,
  comparisonOperator: ComparisonOperators.EQUAL,
}
```

Document must contain more than three artboards matching the pattern **^always\$** on page(s)
matching the pattern **^May the Force be with you\$**.

```javascript
{
  active: true,
  ruleTitle: `Document must contain more than three artboards named 'always' on page(s) named 'May the Force be with you'`,
  artboardPatterns: ['^always$'],
  pagePatterns: ['^May the Force be with you$'],
  numberOfOccurrences: 3,
  comparisonOperator: ComparisonOperators.GREATER_THAN,
}
```
