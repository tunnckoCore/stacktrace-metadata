/*!
 * stacktrace-metadata <https://github.com/tunnckoCore/stacktrace-metadata>
 *
 * Copyright (c) 2015-2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var isError = require('is-typeof-error')

module.exports = function stacktraceMetadata (err) {
  if (!isError(err)) {
    throw new TypeError('stacktrace-metadata: expect `err` to be error object')
  }
  if (typeof err.stack === 'string' && err.stack.length) {
    var filename = cameFrom(module.parent)
    var stack = err.stack
    stack = stack.slice(stack.indexOf(filename))
    stack = stack.slice(0, stack.indexOf('\n') - 1)
    var matches = stack.match(/([^:\s]+):(\d+)(?::(\d+))$/)
    if (matches) {
      err.filename = matches[1]
      err.line = Number(matches[2])
      err.column = Number(matches[3])
    }
  }
  return err
}

function cameFrom (mod) {
  // rare cases
  /* istanbul ignore next */
  if (mod && mod.parent) {
    return cameFrom(mod.parent)
  }
  return mod && mod.filename || ''
}
