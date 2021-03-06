# stacktrace-metadata [![NPM version](https://img.shields.io/npm/v/stacktrace-metadata.svg?style=flat)](https://www.npmjs.com/package/stacktrace-metadata) [![mit license][license-img]][license-url] [![NPM monthly downloads](https://img.shields.io/npm/dm/stacktrace-metadata.svg?style=flat)](https://npmjs.org/package/stacktrace-metadata) [![npm total downloads][downloads-img]][downloads-url]

> Modify given `err` object to be more useful - adds `at`, `line`, `column`, `place` and `filename` properties and also cleans stack traces.

[![code climate][codeclimate-img]][codeclimate-url] 
[![code style][standard-img]][standard-url] 
[![linux build][travis-img]][travis-url] 
[![windows build][appveyor-img]][appveyor-url] 
[![code coverage][coverage-img]][coverage-url] 
[![dependency status][david-img]][david-url]
[![paypal donate][paypalme-img]][paypalme-url] 

You might also be interested in [clean-stacktrace](https://github.com/tunnckocore/clean-stacktrace#readme).

## Highlights

- Works on Windows and Node.js >= 0.10
- Always normalizes Windows paths to be Unix-style
- Customizable through options
- Cleans stack trace using [clean-stacktrace][], `opts.cleanStack: false` to disable
- Passing different current working directory to use, `opts.cwd`, using [clean-stacktrace-relative-paths][]
- Makes paths relative against `opts.cwd`, `opts.relativePaths: false` to disable
- Makes stack trace short - top 4, `opts.shortStack: false` to disable
- Allow hiding the stack trace (making it empty string), `opts.showStack: false` to enable
- Adds useful properties like `line`, `column` and `filename`, using [clean-stacktrace-metadata][]

## Table of Contents
- [Install](#install)
- [Usage](#usage)
- [API](#api)
  * [stacktraceMetadata](#stacktracemetadata)
- [Related](#related)
- [Contributing](#contributing)
- [Building docs](#building-docs)
- [Running tests](#running-tests)
- [Author](#author)
- [License](#license)

_(TOC generated by [verb](https://github.com/verbose/verb) using [markdown-toc](https://github.com/jonschlinkert/markdown-toc))_

## Install
Install with [npm](https://www.npmjs.com/)

```
$ npm install stacktrace-metadata --save
```

or install using [yarn](https://yarnpkg.com)

```
$ yarn add stacktrace-metadata
```

## Usage
> For more use-cases see the [tests](test.js)

```js
const stacktraceMetadata = require('stacktrace-metadata')
```

## API

### [stacktraceMetadata](index.js#L69)
> Cleans stack trace and attaches few more metadata properties, such as `at`, `line`, `column`, `filename` and `place`. By default it cleans stack, makes is short (4 length) and makes paths relative. But all this is controllable through `options` object. Throws `TypeError` if `error` is not an instance of Error.

**Params**

* `error` **{Error}**: real error object, checked against `instanceof Error`    
* `options` **{Object}**: optional options object for more control    
* `options.cleanStack` **{Boolean}**: if `false` won't clean stack trace from node internals    
* `options.shortStack` **{Boolean}**: if `false` full stack traces, otherwise they are just four    
* `options.showStack` **{Boolean}**: if `false` the error.stack will be empty string    
* `options.relativePaths` **{Boolean}**: if `false` paths in stack traces will be absolute    
* `options.mapper` **{Function}**: called on each line of the stack with `(line, index)` signature    
* `options.cwd` **{String}**: current working directory, default `process.cwd()`    
* `returns` **{Error}**: same error object, but modified  

**Example**

```js
const metadata = require('stacktrace-metadata')

const error = new Error('foo quxie')
error.stack = `Error: foo quxie
    at zazz (/home/charlike/apps/alwa.js:8:10)
    at module.exports (/home/charlike/apps/foo.js:6:3)
    at Object.<anonymous> (/home/charlike/apps/dush.js:45:3)
    at Module._compile (module.js:409:26)
    at Object.Module._extensions..js (module.js:416:10)
    at Module.load (module.js:343:32)
    at Function.Module._load (module.js:300:12)
    at Function.Module.runMain (module.js:441:10)
    at startup (node.js:139:18)
`
const err = metadata(error)

console.log(err.line) // => 8
console.log(err.column) // => 10
console.log(err.filename) // => 'alwa.js'
console.log(err.place) // => 'zazz'
console.log(err.at) // => 'zazz (alwa.js:8:10)'
console.log(err.stack)
// =>
// Error: foo quxie
//     at zazz (alwa.js:8:10)
//     at module.exports (foo.js:6:3)
//     at Object.<anonymous> (dush.js:45:3)
```

## Related
- [abbrev-kindof](https://www.npmjs.com/package/abbrev-kindof): Use abbreviations for checking type of given value. Like `kindof(val, 'soa')` to check that value is string, object or array. | [homepage](https://github.com/tunnckocore/abbrev-kindof#readme "Use abbreviations for checking type of given value. Like `kindof(val, 'soa')` to check that value is string, object or array.")
- [assert-kindof](https://www.npmjs.com/package/assert-kindof): Check native type of value and throw AssertionError if not okey. Clean stack traces. Simplicity. Built on [is-kindof][]. | [homepage](https://github.com/tunnckocore/assert-kindof#readme "Check native type of value and throw AssertionError if not okey. Clean stack traces. Simplicity. Built on [is-kindof][].")
- [clean-stack](https://www.npmjs.com/package/clean-stack): Clean up error stack traces | [homepage](https://github.com/sindresorhus/clean-stack#readme "Clean up error stack traces")
- [clean-stacktrace-metadata](https://www.npmjs.com/package/clean-stacktrace-metadata): Plugin for `clean-stacktrace` lib. Parse each line to get additional info like `filename`, `column` and `line` of the error. | [homepage](https://github.com/tunnckocore/clean-stacktrace-metadata#readme "Plugin for `clean-stacktrace` lib. Parse each line to get additional info like `filename`, `column` and `line` of the error.")
- [clean-stacktrace-relative-paths](https://www.npmjs.com/package/clean-stacktrace-relative-paths): Meant to be used with [clean-stacktrace][] as mapper function. Makes absolute paths inside stack traces to relative paths. | [homepage](https://github.com/tunnckocore/clean-stacktrace-relative-paths#readme "Meant to be used with [clean-stacktrace][] as mapper function. Makes absolute paths inside stack traces to relative paths.")
- [clean-stacktrace](https://www.npmjs.com/package/clean-stacktrace): Clean up error stack traces from node internals | [homepage](https://github.com/tunnckocore/clean-stacktrace#readme "Clean up error stack traces from node internals")
- [dush](https://www.npmjs.com/package/dush): Microscopic & functional event emitter in ~260 bytes, extensible through plugins. | [homepage](https://github.com/tunnckocore/dush#readme "Microscopic & functional event emitter in ~260 bytes, extensible through plugins.")
- [is-kindof](https://www.npmjs.com/package/is-kindof): Check type of given javascript value. Support promises, generators, streams, and native types. Built on [kind-of][] lib. | [homepage](https://github.com/tunnckocore/is-kindof#readme "Check type of given javascript value. Support promises, generators, streams, and native types. Built on [kind-of][] lib.")

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/stacktrace-metadata/issues/new).  
Please read the [contributing guidelines](CONTRIBUTING.md) for advice on opening issues, pull requests, and coding standards.  
If you need some help and can spent some cash, feel free to [contact me at CodeMentor.io](https://www.codementor.io/tunnckocore?utm_source=github&utm_medium=button&utm_term=tunnckocore&utm_campaign=github) too.

**In short:** If you want to contribute to that project, please follow these things

1. Please DO NOT edit [README.md](README.md), [CHANGELOG.md](CHANGELOG.md) and [.verb.md](.verb.md) files. See ["Building docs"](#building-docs) section.
2. Ensure anything is okey by installing the dependencies and run the tests. See ["Running tests"](#running-tests) section.
3. Always use `npm run commit` to commit changes instead of `git commit`, because it is interactive and user-friendly. It uses [commitizen][] behind the scenes, which follows Conventional Changelog idealogy.
4. Do NOT bump the version in package.json. For that we use `npm run release`, which is [standard-version][] and follows Conventional Changelog idealogy.

Thanks a lot! :)

## Building docs
Documentation and that readme is generated using [verb-generate-readme][], which is a [verb][] generator, so you need to install both of them and then run `verb` command like that

```
$ npm install verbose/verb#dev verb-generate-readme --global && verb
```

_Please don't edit the README directly. Any changes to the readme must be made in [.verb.md](.verb.md)._

## Running tests
Clone repository and run the following in that cloned directory

```
$ npm install && npm test
```

## Author
**Charlike Mike Reagent**

+ [github/tunnckoCore](https://github.com/tunnckoCore)
+ [twitter/tunnckoCore](https://twitter.com/tunnckoCore)
+ [codementor/tunnckoCore](https://codementor.io/tunnckoCore)

## License
Copyright © 2015, 2017, [Charlike Mike Reagent](https://i.am.charlike.online). Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.4.3, on March 15, 2017._  
_Project scaffolded using [charlike][] cli._

[charlike]: https://github.com/tunnckocore/charlike
[clean-stacktrace-metadata]: https://github.com/tunnckocore/clean-stacktrace-metadata
[clean-stacktrace-relative-paths]: https://github.com/tunnckocore/clean-stacktrace-relative-paths
[clean-stacktrace]: https://github.com/tunnckocore/clean-stacktrace
[commitizen]: https://github.com/commitizen/cz-cli
[is-kindof]: https://github.com/tunnckocore/is-kindof
[kind-of]: https://github.com/jonschlinkert/kind-of
[standard-version]: https://github.com/conventional-changelog/standard-version
[verb-generate-readme]: https://github.com/verbose/verb-generate-readme
[verb]: https://github.com/verbose/verb

[license-url]: https://www.npmjs.com/package/stacktrace-metadata
[license-img]: https://img.shields.io/npm/l/stacktrace-metadata.svg

[downloads-url]: https://www.npmjs.com/package/stacktrace-metadata
[downloads-img]: https://img.shields.io/npm/dt/stacktrace-metadata.svg

[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/stacktrace-metadata
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/stacktrace-metadata.svg

[travis-url]: https://travis-ci.org/tunnckoCore/stacktrace-metadata
[travis-img]: https://img.shields.io/travis/tunnckoCore/stacktrace-metadata/master.svg?label=linux

[appveyor-url]: https://ci.appveyor.com/project/tunnckoCore/stacktrace-metadata
[appveyor-img]: https://img.shields.io/appveyor/ci/tunnckoCore/stacktrace-metadata/master.svg?label=windows

[coverage-url]: https://codecov.io/gh/tunnckoCore/stacktrace-metadata
[coverage-img]: https://img.shields.io/codecov/c/github/tunnckoCore/stacktrace-metadata/master.svg

[david-url]: https://david-dm.org/tunnckoCore/stacktrace-metadata
[david-img]: https://img.shields.io/david/tunnckoCore/stacktrace-metadata.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

[paypalme-url]: https://www.paypal.me/tunnckoCore
[paypalme-img]: https://img.shields.io/badge/paypal-donate-brightgreen.svg

