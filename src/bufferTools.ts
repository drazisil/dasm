/**
 * Remove count from inputBuffer and return both parts
 * @param inputBuffer 
 * @param count 
 * @returns {Object} shiftedBuffer
 * @returns {Buffer} shiftedBuffer.value The value that has been removed
 * @returns {Buffer} shiftedBuffer.remainder The remainder of the buffer
 */
export function shiftBuffer(inputBuffer: Buffer, count:number): { value: Buffer, remainder: Buffer} {
    const value = Buffer.from(inputBuffer.slice(0, count))
    const remainder = Buffer.from(inputBuffer.slice(count))
    return { value, remainder}
}