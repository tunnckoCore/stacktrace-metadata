/*!
 * stacktrace-metadata <https://github.com/tunnckoCore/stacktrace-metadata>
 *
 * Copyright (c) 2015-2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('assertit')
var meta = require('./index')

test('should add `line`, `column` and `filename` properties', function (done) {
  var error = new Error('foo bar')
  var err = meta(error)

  test.ok(err.line)
  test.ok(err.column)
  test.ok(err.filename)
  done()
})

test('should throw TypeError if not error object is passed', function (done) {
  function fixture () {
    meta({foo: 'bar'})
  }
  test.throws(fixture, TypeError)
  test.throws(fixture, /expect `err` to be error object/)
  done()
})
