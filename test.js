/*!
 * stacktrace-metadata <https://github.com/tunnckoCore/stacktrace-metadata>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('mukla')
var stacktraceMetadata = require('./index')

test('should throw TypeError if not passed with real error', function (done) {
  function fixture () {
    stacktraceMetadata(123)
  }

  test.throws(fixture, TypeError)
  test.throws(fixture, /expect `error` to be real error/)
  done()
})

test('should return the same error', function firstTest (done) {
  var err = new Error('foo bar')
  var e = stacktraceMetadata(err)

  test.strictEqual(err === e, true)
  test.strictEqual(e instanceof Error, true)
  test.strictEqual(err.name, e.name)
  test.strictEqual(err.stack, e.stack)
  test.strictEqual(err.message, e.message)
  test.strictEqual(err.message, e.message)
  test.strictEqual(e.line, 26)
  test.strictEqual(e.column, 13)
  test.strictEqual(e.filename, 'test.js')
  test.strictEqual(e.place, 'Function.firstTest')
  done()
})

test('should have relative paths by default', function (done) {
  var err = new Error('opts.relativePaths: true')
  var e = stacktraceMetadata(err)

  test.strictEqual(e.message, 'opts.relativePaths: true')
  test.strictEqual(e.stack.indexOf('(test.js:43') > 0, true)
  test.strictEqual(e.line, 43)
  test.strictEqual(e.column, 13)
  test.strictEqual(e.filename, 'test.js')
  test.ok(e.at)
  done()
})

test('should have absolute paths if opts.relativePaths: false', function (done) {
  var error = new Error('foo qux bar')
  var e = stacktraceMetadata(error, {
    relativePaths: false
  })

  test.strictEqual(e.message, 'foo qux bar')
  test.strictEqual(e.stack.indexOf('(test.js:') === -1, true)
  test.strictEqual(e.line, 56)
  test.ok(e.at)
  test.ok(e.place)
  test.ok(e.column)
  test.ok(e.filename)
  done()
})

test('should clean stack by default', function (done) {
  var error = new TypeError('woohooo')
  var stack = [
    'Error: woohooo',
    '    at Function.xyz (/home/charlike/apps/stacktrace-metadata/test.js:111:33)',
    '    at Function.tryCatch (/home/charlike/apps/node_modules/try-catch-callback/index.js:75:14)',
    '    at Function.tryCatchCallback (/home/charlike/apps/node_modules/try-catch-callback/index.js:58:21)',
    '    at Function.tryCatch (/home/charlike/apps/node_modules/always-done/node_modules/try-catch-core/index.js:80:26)',
    '    at Function.tryCatchCore (/home/charlike/apps/node_modules/always-done/node_modules/try-catch-core/index.js:64:12)',
    '    at Function.alwaysDone (/home/charlike/apps/node_modules/always-done/index.js:61:24)',
    '    at mukla (/home/charlike/apps/node_modules/mukla/index.js:55:9)',
    '    at Object.<anonymous> (/home/charlike/apps/stacktrace-metadata/zazzy.js:15:1)',
    '    at Module._compile (module.js:571:32)',
    '    at Object.Module._extensions..js (module.js:580:10)'
  ]
  error.stack = stack.join('\n')

  var e = stacktraceMetadata(error, {
    shortStack: false
  })

  // should not exist, because stack is cleaned
  var notExists = e.stack.indexOf('at Module._compile (module.js:571:32)') === -1
  test.strictEqual(notExists, true)

  // should new stack be shorter than the old one
  test.strictEqual(e.stack.split('\n').length < stack.length, true)
  test.strictEqual(e.line, 111)
  test.strictEqual(e.column, 33)
  test.strictEqual(e.place, 'Function.xyz')
  test.strictEqual(/Function\.xyz/.test(e.at), true)
  test.strictEqual(/test\.js:111:33/.test(e.at), true)
  test.strictEqual(e.filename, 'test.js')
  done()
})

test('should not clean stack if opts.cleanStack: false', function bazzyTest (done) {
  var err = new Error('quxie bazzy')
  var opts = {
    cleanStack: false,
    shortStack: false
  }
  var e = stacktraceMetadata(err, opts)

  var internals = e.stack.indexOf('at Module._compile') > 0
  test.strictEqual(internals, true)
  test.strictEqual(e.line, 108)
  test.strictEqual(e.column, 13)
  test.strictEqual(e.filename, 'test.js')
  test.strictEqual(e.place, 'Function.bazzyTest')
  test.strictEqual(/Function\.bazzyTest/.test(e.at), true)
  test.strictEqual(/test\.js:108:13/.test(e.at), true)
  done()
})

test('should have empty string err.stack property if opts.showStack: false', function emptyStack (done) {
  var err = stacktraceMetadata(new Error('abc'), {
    showStack: false
  })

  test.strictEqual(err.stack, '')
  test.strictEqual(err.line, 127)
  test.strictEqual(err.column, 32)
  test.strictEqual(err.place, 'Function.emptyStack')
  test.ok(err.filename)
  test.ok(err.at)
  done()
})

test('should have props like `err.line`, `err.filename` and `err.column`', function myQuxTest (done) {
  var err = new Error('my special error')
  var e = stacktraceMetadata(err)

  test.strictEqual(e.name, 'Error')
  test.strictEqual(e.message, 'my special error')
  test.strictEqual(e.line, 141)
  test.strictEqual(e.column, 13)
  test.strictEqual(e.place, 'Function.myQuxTest')
  test.strictEqual(e.filename, 'test.js')
  test.strictEqual(/Function\.myQuxTest/.test(e.at), true)
  test.strictEqual(/test\.js:141:13/.test(e.at), true)
  done()
})

test('should not have special props if passed error has empty stack', function (done) {
  var err = new Error('foo')
  err.stack = ''

  var e = stacktraceMetadata(err)

  test.strictEqual(e.at, undefined)
  test.strictEqual(e.line, undefined)
  test.strictEqual(e.place, undefined)
  test.strictEqual(e.column, undefined)
  test.strictEqual(e.filename, undefined)
  test.strictEqual(e === err, true)
  done()
})

test('should work for errors thrown like what rimraf.sync throws', function quxieTest (done) {
  var rimraf = require('rimraf')

  try {
    rimraf.sync(12345)
  } catch (err) {
    var e = stacktraceMetadata(err, {
      mapper: function () {}
    })

    test.strictEqual(e.line, 174)
    test.strictEqual(e.column, 12)
    test.strictEqual(e.place, 'Function.quxieTest')
    test.strictEqual(e.filename, 'test.js')
    test.strictEqual(/Function\.quxieTest/.test(e.at), true)
    test.strictEqual(/test\.js:174:12/.test(e.at), true)
  }
  done()
})

test('should be able to pass custom opts.mapper function', function (done) {
  var err = new Error('custom mapper')
  var e = stacktraceMetadata(err, {
    mapper: function (line) {
      test.strictEqual(typeof line, 'string')
      return line
    }
  })

  test.strictEqual(e.stack.trim().length > 0, true)
  done()
})
