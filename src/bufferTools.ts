/**
 * Remove count from inputBuffer and return both parts
 * @param inputBuffer
 * @param count
 * @returns {Object} shiftedBuffer
 * @returns {Buffer} shiftedBuffer.value The value that has been removed
 * @returns {Buffer} shiftedBuffer.remainder The remainder of the buffer
 */
export function shiftBuffer(
  inputBuffer: Buffer,
  count: number
): { value: Buffer; remainder: Buffer } {
  const value = Buffer.from(inputBuffer.slice(0, count));
  const remainder = Buffer.from(inputBuffer.slice(count));
  return { value, remainder };
}

export class ExtendedBuffer {
    private _buffer: Buffer

    /**
     * Wraps the native Buffer object to provide extra functionality
     * @param inputBuffer {Buffer}
     */
    constructor(inputBuffer: Buffer) {
        this._buffer = inputBuffer
    }

  /**
   * Remove count from self removed part, return value
   * value of the property buffer is set to remainder
   * @param inputBuffer
   * @param count
   * @returns {Buffer} The value that has been removed
   */
  public shiftBuffer(count: number): ExtendedBuffer {
    const result = shiftBuffer(Buffer.from(this._buffer), count)
    this._buffer = result.remainder
    return new ExtendedBuffer(result.value)
  }

  public get rawBuffer(): Buffer {
      return this._buffer
  }

  public toString(): string {
      return this.rawBuffer.toString()
  }
  
}
