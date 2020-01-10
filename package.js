Package.describe({
  name: 'pac-reach:denormalize',
  version: '0.6.6',
  // Brief, one-line summary of the package.
  summary: 'Simple denormalization for Meteor',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/pac-reach/denormalize',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
})

Npm.depends({
  'lodash': '4.17.4',
})

Package.onUse(function (api) {
  api.versionsFrom('1.9')
  api.use([
    'ecmascript',
    'mongo',
    'check',
    'pac-reach:meteor-collection-hooks'
  ])

  api.mainModule('cache.js', 'server')
  api.addFiles('cacheCount.js', 'server')
  api.addFiles('cacheField.js', 'server')
})

Package.onTest(function (api) {
  api.use([
    'herteby:denormalize',
    'ecmascript',
    'mongo',
    'check',
    'pac-reach:meteor-collection-hooks',
    'practicalmeteor:mocha',
    'practicalmeteor:chai'
  ])

  api.addFiles('tests.js', 'server')
})
