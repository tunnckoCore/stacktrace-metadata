'use strict'

var assert = require('assert')
var metadata = require('./index')

function foobar (val) {
  assert.equal(val, true)
  return val
}

try {
  foobar(1234)
} catch (err) {
  var e = metadata(err)
  console.log(e)
  console.log(e.line) // => 4
}
