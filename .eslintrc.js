module.exports ={
  root: true,
  plugins: ["sonarjs"],
  extends: ["airbnb-base", "plugin:sonarjs/recommended"],
  rules: {
    "no-underscore-dangle": "off",
    "sonarjs/cognitive-complexity": "error",
    "sonarjs/no-identical-expressions": "error"
  },
  overrides: [
    {
      files: ['migrations/*.js'],
      rules: {
        'sonarjs/no-duplicate-string': 'off'
      }
    },
  ]
}
