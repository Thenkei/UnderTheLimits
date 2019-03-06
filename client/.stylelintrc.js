module.exports = {

    "defaultSeverity": "warning",

    "plugins": [
        "stylelint-selector-bem-pattern"
    ],

    "extends": [
        "stylelint-config-property-sort-order-smacss",
        "stylelint-config-sass-guidelines",
        "stylelint-config-standard"
    ],

    "rules": {
        // Base rules
        "at-rule-no-unknown": null, // autorise les @-whatever-
        "block-no-empty": true, // empêche les block ( { } ) vides
        "color-named": "always-where-possible",
        "function-parentheses-space-inside": "always",
        // "indentation": "tab",
        "max-empty-lines": 1,
        "media-feature-parentheses-space-inside": "always",
        "no-descending-specificity": null, // tolère l'ordre des classes
        "number-leading-zero": "never",
        "selector-no-qualifying-type": [
            true,
            { ignore: [ "attribute", "class" ] }
        ],
        "property-no-vendor-prefix": null, // tolère les prefixes pour les propriétés
        "selector-class-pattern": null, // viens de scss rules
        "selector-pseudo-class-parentheses-space-inside": "always",
        "selector-pseudo-element-colon-notation": "single",
        "string-quotes": "single",
        "unit-whitelist": [ "em", "rem", "%", "s", "deg", "vh", "fr", "px" ],
        "max-nesting-depth": 3,
        "selector-max-compound-selectors": 9,

        // Sass rules
        "scss/at-rule-no-unknown": true, // autorise les @-whatever-
        "scss/percent-placeholder-pattern": "^[a-zA-Z]+([a-zA-Z0-9-]+[a-zA-Z0-9]+)?$", // tolère les nom de classes au choix pour les placeholders

        // Order rules
        "order/properties-alphabetical-order": null, // retire la règle de tri alphabètique soumise dans les Sass rules (préserve SMACSS)

        // BEM pattern
        "plugin/selector-bem-pattern": {
            "preset": "suit",
            "componentName": "[A-Z]+",
            componentSelectors: function(componentName, presetOptions) {
                const ns = (presetOptions && presetOptions.namespace) ? `${presetOptions.namespace}-` : '';
                const WORD = '[a-z0-9][a-zA-Z0-9]*';
                const WORDUPERCAMELCASE = '[A-Z0-9][a-zA-Z0-9]*';
                const descendant = `(?:-${WORD})?`;
                const modifier = `(?:_${WORD}(?:\\.${ns}${componentName}${descendant}_${WORD})*)?`;
                const attribute = '(?:\\[.+\\])?';
                const state = `(?:\\.is${WORDUPERCAMELCASE})*`;
                const body = descendant + modifier + attribute + state;
                return new RegExp(`^\\.${ns}${componentName}${body}$`);
            }
        }
    }
}
