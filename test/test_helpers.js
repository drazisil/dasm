const { beforeAll, afterAll, } = require('@jest/globals')

const realLog = console.log

console.log = jest.fn()
console.debug = jest.fn()
console.error = jest.fn()