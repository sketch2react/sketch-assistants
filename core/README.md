This is a "rules only" Assistant, meaning it contains only rule implementations and no
configuration. Adding this Assistant to Sketch won't do anything because rules need to be activated
in configuration before they will report anything.

Make use of this Assistant by _extending_ from it in your own Assistants and adding configuration
for the rules listed below.

## Available rules

This Assistant exports the following rules.

- [@sketch2react/sketch2react-core-assistant/group-name-component-name](https://github.com/sketch2react/sketch-assistants/tree/master/core/src/rules/group-name-component-name)
- [@sketch2react/sketch2react-core-assistant/text-name-component-name](https://github.com/sketch2react/sketch-assistants/tree/master/core/src/rules/text-name-component-name)
- [@sketch2react/sketch2react-core-assistant/occurrence-of-artboard](https://github.com/sketch2react/sketch-assistants/tree/master/core/src/rules/occurrence-of-artboard)
- [@sketch2react/sketch2react-core-assistant/occurrence-of-page](https://github.com/sketch2react/sketch-assistants/tree/master/core/src/rules/occurrence-of-page)
- [@sketch2react/sketch2react-core-assistant/group-name-css-classnames](https://github.com/sketch2react/sketch-assistants/tree/master/core/src/rules/group-name-css-classnames)
- [@sketch2react/sketch2react-core-assistant/text-name-css-classnames](https://github.com/sketch2react/sketch-assistants/tree/master/core/src/rules/text-name-css-classnames)
