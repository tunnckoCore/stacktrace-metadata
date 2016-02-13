# [stacktrace-metadata][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] 

> Modify given `err` object to be more useful. Adds `line`, `column` and `filename` properties.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]


## Install
```
npm i stacktrace-metadata --save
```


## Usage
> For more use-cases see the [tests](./test.js)

**example.js**

```js
'use strict'

var assert = require('assert')
var metadata = require('stacktrace-metadata')

function foobar (val) {
  assert.equal(val, true)
  return val
}

try {
  foobar(1234)
} catch (err) {
  var e = metadata(err)
  console.log(e) // => AssertionError
  console.log(e.line) // => 7
  console.log(e.column) // => 10
  console.log(e.actual) // => 1234
  console.log(e.expected) // => true
  console.log(e.message) // => '1234 == true'
}
```


## Related libs
* [abbrev-kindof](https://www.npmjs.com/package/abbrev-kindof): Use abbreviations for checking type of given value. Like `kindof(val, 'soa')` to check that value is string, object or array. | [homepage](https://github.com/tunnckocore/abbrev-kindof)
* [assert-kindof](https://www.npmjs.com/package/assert-kindof): Check native type of the given value and throw TypeError if not okey. Expressive, elegant, behavior-driven API, good descriptive default error messages, simple and clean syntax. | [homepage](https://github.com/tunnckoCore/assert-kindof)
* [assertit](https://www.npmjs.com/package/assertit): Thin sugar layer on top of `testit` framework, `is-kindof` and `assert`. | [homepage](https://github.com/tunnckoCore/assertit)
* [is-kindof](https://www.npmjs.com/package/is-kindof): Check type of given javascript value. Support promises, generators, streams, and native types. Thin wrapper around `kind-of` module. | [homepage](https://github.com/tunnckocore/is-kindof)
* [is-typeof-error](https://www.npmjs.com/package/is-typeof-error): Check that given value is any type of error and instanceof Error | [homepage](https://github.com/tunnckocore/is-typeof-error)
* [kind-error](https://www.npmjs.com/package/kind-error): Base class for easily creating meaningful and quiet by default Error classes with sane defaults and assertion in mind. | [homepage](https://github.com/tunnckocore/kind-error)
* [kind-of-extra](https://www.npmjs.com/package/kind-of-extra): Additional functionality to `kind-of` type check utility, support promises, generators, streams, errors. Like that `kindOf(new Error('foo')) === 'error'`. | [homepage](https://github.com/tunnckocore/kind-of-extra)
* [kind-of-types](https://www.npmjs.com/package/kind-of-types): List of all javascript types. Used and useful for checking, validation, sanitizing and testing. Like isStream, isPromise, isWeakset and etc. | [homepage](https://github.com/tunnckocore/kind-of-types)
* [map-types](https://www.npmjs.com/package/map-types): Map single letter abbreviations to javascript native types. Useful as a shorthand for pseudo-argument destructuring when debugging. | [homepage](https://github.com/jonschlinkert/map-types)


## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/stacktrace-metadata/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.


## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckocore.tk][author-www-img]][author-www-url] [![keybase tunnckocore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]


[npmjs-url]: https://www.npmjs.com/package/stacktrace-metadata
[npmjs-img]: https://img.shields.io/npm/v/stacktrace-metadata.svg?label=stacktrace-metadata

[license-url]: https://github.com/tunnckoCore/stacktrace-metadata/blob/master/LICENSE
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg


[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/stacktrace-metadata
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/stacktrace-metadata.svg

[travis-url]: https://travis-ci.org/tunnckoCore/stacktrace-metadata
[travis-img]: https://img.shields.io/travis/tunnckoCore/stacktrace-metadata.svg

[coveralls-url]: https://coveralls.io/r/tunnckoCore/stacktrace-metadata
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/stacktrace-metadata.svg

[david-url]: https://david-dm.org/tunnckoCore/stacktrace-metadata
[david-img]: https://img.shields.io/david/tunnckoCore/stacktrace-metadata.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg


[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/ama
[new-message-img]: https://img.shields.io/badge/ask%20me-anything-green.svg