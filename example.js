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
  console.log(e) // => AssertionError
  console.log(e.line) // => 7
  console.log(e.column) // => 10
  console.log(e.actual) // => 1234
  console.log(e.expected) // => true
  console.log(e.message) // => '1234 == true'
}
