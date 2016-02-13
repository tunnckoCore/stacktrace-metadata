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