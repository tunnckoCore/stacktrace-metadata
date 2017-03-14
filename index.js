/*!
 * stacktrace-metadata <https://github.com/tunnckoCore/stacktrace-metadata>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

'use strict'

var extend = require('extend-shallow')
var findCallsite = require('find-callsite')
var clean = require('clean-stacktrace')
var metadata = require('clean-stacktrace-metadata')
var relative = require('clean-stacktrace-relative-paths')

/**
 * > Cleans stack trace and attaches few more metadata properties,
 * such as `at`, `line`, `column`, `filename` and `place`. By default
 * it cleans stack, makes is short (4 length) and makes paths relative.
 * But all this is controllable through `options` object.
 * Throws `TypeError` if `error` is not an instance of Error.
 *
 * **Example**
 *
 * ```js
 * const metadata = require('stacktrace-metadata')
 *
 * const error = new Error('foo quxie')
 * error.stack = `Error: foo quxie
 *     at zazz (/home/charlike/apps/alwa.js:8:10)
 *     at module.exports (/home/charlike/apps/foo.js:6:3)
 *     at Object.<anonymous> (/home/charlike/apps/dush.js:45:3)
 *     at Module._compile (module.js:409:26)
 *     at Object.Module._extensions..js (module.js:416:10)
 *     at Module.load (module.js:343:32)
 *     at Function.Module._load (module.js:300:12)
 *     at Function.Module.runMain (module.js:441:10)
 *     at startup (node.js:139:18)
 * `
 * const err = metadata(error)
 *
 * console.log(err.line) // => 8
 * console.log(err.column) // => 10
 * console.log(err.filename) // => 'alwa.js'
 * console.log(err.place) // => 'zazz'
 * console.log(err.at) // => 'zazz (alwa.js:8:10)'
 * console.log(err.stack)
 * // =>
 * // Error: foo quxie
 * //     at zazz (alwa.js:8:10)
 * //     at module.exports (foo.js:6:3)
 * //     at Object.<anonymous> (dush.js:45:3)
 * ```
 *
 * @name   stacktraceMetadata
 * @param  {Error} `error` real error object, checked against `instanceof Error`
 * @param  {Object} `options` optional options object for more control
 * @param  {Boolean} `options.cleanStack` if `false` won't clean stack trace from node internals
 * @param  {Boolean} `options.shortStack` if `false` full stack traces, otherwise they are just four
 * @param  {Boolean} `options.showStack` if `false` the error.stack will be empty string
 * @param  {Boolean} `options.relativePaths` if `false` paths in stack traces will be absolute
 * @param  {String} `options.cwd` current working directory, default `process.cwd()`
 * @return {Error} same error object, but modified
 * @throws {TypeError} If `error` not instance of Error
 * @api public
 */

module.exports = function stacktraceMetadata (error, options) {
  if (!(error instanceof Error)) {
    throw new TypeError('stacktrace-metadata: expect `error` to be real error')
  }

  if (typeof error.stack === 'string' && error.stack.length) {
    var opts = extend({
      showStack: true,
      shortStack: true,
      cleanStack: true,
      relativePaths: true
    }, options)

    var at = findCallsite(error)
    at = opts.relativePaths ? relative(opts.cwd)(at) : at

    metadata(function (_, info) {
      error.at = [
        info.place,
        ' (',
        info.filename,
        ':',
        info.line,
        ':',
        info.column,
        ')'
      ].join('')

      error.line = info.line
      error.place = info.place
      error.column = info.column
      error.filename = info.filename
    })(at)

    var mapper = opts.relativePaths ? relative(opts.cwd) : null
    var stack = clean(error.stack, mapper)

    if (opts.showStack) {
      error.stack = opts.cleanStack ? stack : error.stack
      error.stack = opts.shortStack
        ? error.stack.split('\n').splice(0, 4).join('\n')
        : error.stack
    } else {
      error.stack = '' // or delete error.stack?
    }
  }

  return error
}
