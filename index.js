/*!
 * stacktrace-metadata <https://github.com/tunnckoCore/stacktrace-metadata>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

'use strict'

var extend = require('extend-shallow')
var clean = require('clean-stacktrace')
var metadata = require('clean-stacktrace-metadata')
var relative = require('clean-stacktrace-relative-paths')

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

    if (!opts.showStack) {
      error.stack = ''
      return error
    }

    if (opts.cleanStack) {
      var relativePaths = opts.relativePaths
        ? relative(opts.cwd)
        : function (line) { return line }

      error.stack = clean(error.stack, function mapper (line, index) {
        // hint: use `parent-module` package
        // and `line.indexOf(parentModule())`
        // if not works correctly

        line = relativePaths(line)

        if (index === 1) {
          return metadata(function meta (_, info) {
            error.line = info.line
            error.place = info.place
            error.column = info.column
            error.filename = info.filename
          })(line)
        }

        return line
      })
    }

    error.stack = opts.shortStack
      ? error.stack.split('\n').splice(0, 4).join('\n')
      : error.stack
  }

  return error
}
