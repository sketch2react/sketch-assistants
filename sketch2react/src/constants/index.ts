const START_PAGE_NAME: string = 'Start here'
const START_ARTBOARD_NAME: string = 'Start'
const SUPPORTED_GROUP_NAMES: string[] = [
  'container',
  'container-fluid',
  'row',
  'col',
  'group',
  'group-fixed',
  'div',
  'button-primary',
  'button-secondary',
  'button-submit',
  'form',
  'form-group',
  'input',
  'navbar-light',
  'navbar-dark',
  'nav',
  'nav-item',
  'nav-item-active',
  'link',
  'Haiku',
  'Lottie',
]
const SUPPORTED_TEXT_NAMES: string[] = [
  'text',
  'text.p',
  'text.span',
  'input',
  'externalasset.css',
  'externalasset.js',
]
const ALL_SUPPORTED_NAMES: string[] = [
  'container',
  'container-fluid',
  'row',
  'col',
  'group',
  'group-fixed',
  'div',
  'text',
  'text.p',
  'text.span',
  'image',
  'image-fixed',
  'rectangle',
  'oval',
  'BG',
  'button-primary',
  'button-secondary',
  'button-submit',
  'form',
  'form-group',
  'input',
  'navbar-light',
  'navbar-dark',
  'nav',
  'nav-item',
  'nav-item-active',
  'link',
  'Haiku',
  'Lottie',
  'externalasset.css',
  'externalasset.js',
]

const SUPPORTED_GROUP_NAMES_REGEXP: string[] = SUPPORTED_GROUP_NAMES.map(
  (componentName: string) => `^[^{}]*{${componentName}}[^{}]*$`,
)

const SUPPORTED_TEXT_NAMES_REGEXP: string[] = SUPPORTED_TEXT_NAMES.map(
  (componentName: string) => `^[^{}]*{${componentName}}[^{}]*$`,
)

export {
  START_ARTBOARD_NAME,
  START_PAGE_NAME,
  SUPPORTED_GROUP_NAMES,
  SUPPORTED_TEXT_NAMES,
  ALL_SUPPORTED_NAMES,
  SUPPORTED_GROUP_NAMES_REGEXP,
  SUPPORTED_TEXT_NAMES_REGEXP,
}
