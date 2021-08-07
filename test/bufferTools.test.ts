import { shiftBuffer} from '../src/bufferTools'

const testBuffer = Buffer.from('I_am_a_test_buffer')

describe('shiftBuffer()', () => {
    it('returns a value', () => {
        expect(shiftBuffer(testBuffer, 7).value.toString()).toEqual('I_am_a_')
    })

    it('returns a remainder', () => {
        expect(shiftBuffer(testBuffer, 7).remainder.toString()).toEqual('test_buffer')
    })

    it('return a value and remainder that combine to match inputBuffer', () => {
        const result = shiftBuffer(testBuffer, 7)
        expect(Buffer.concat([result.value, result.remainder])).toEqual(testBuffer)
    })

})