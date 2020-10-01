/**
 * # artboard-contains-external-css-asset
 *
 * Artboards must contain at least one text layer named {externalasset.css} as a direct decendant.
 *
 * ## Rationale
 *
 * {externalasset.css} is used within the [Sketch2React](https://sketch2react.gitbook.io/sketch2react-io/)
 * framework to target external CSS assets (fonts, local CSS-files etc.) that should be included in the generated output.
 *
 * ## Options
 *
 * None.
 *
 */

import { RuleDefinition, FileFormat } from '@sketch-hq/sketch-assistant-types'

const ruleIdentifier = '@sketch2react/sketch2react-assistant/artboard-contains-external-css-asset'

const artboardContainsExternalCSSAsset: RuleDefinition = {
  rule: async (context) => {
    const { utils } = context
    const regex: RegExp = /{externalasset.css}/

    for (const artboard of utils.objects.artboard) {
      const layers = artboard.layers
      let hasExternalAssetCssTextLayer = false

      for (const layer of layers) {
        const isExternalAssetCssTextLayer =
          layer._class === FileFormat.ClassValue.Text && regex.test(layer.name)

        if (isExternalAssetCssTextLayer) {
          hasExternalAssetCssTextLayer = true
          break
        }
      }

      if (!hasExternalAssetCssTextLayer) {
        utils.report(`Artboard ${artboard.name} does not contain an {externalasset.css}`, artboard)
      }
    }
  },
  name: ruleIdentifier,
  title: (config) =>
    config.ruleTitle
      ? config.ruleTitle
      : `Artboards must contain at least one text layer named {externalasset.css}`,
  description: `{externalasset.css} is used within the Sketch2React framework to target external CSS assets`,
}

export default artboardContainsExternalCSSAsset
