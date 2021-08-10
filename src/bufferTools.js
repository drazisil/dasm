/**
 * @typedef IShiftedBuffer
 * @property {Buffer} value
 * @property {Buffer} remainder
 */

/**
 * Remove count from inputBuffer and return both parts
 * @param {Buffer} inputBuffer
 * @param {number} count
 * @returns {IShiftedBuffer} shiftedBuffer
 */
export function shiftBuffer(inputBuffer, count) {
  const value = Buffer.from(inputBuffer.slice(0, count));
  const remainder = Buffer.from(inputBuffer.slice(count));
  return { value, remainder };
}

export class ExtendedBuffer {
  /**
   * @private
   * @type {Buffer}
   * */
  #buffer;

  /**
   * Wraps the native Buffer object to provide extra functionality
   * @param {Buffer} inputBuffer
   */
  constructor(inputBuffer) {
    this.#buffer = inputBuffer;
  }

  /**
   * Remove count from self removed part, return value
   * value of the property buffer is set to remainder
   * @public
   * @param {number} count
   * @returns {IShiftedBuffer} The value that has been removed
   */
  shiftBuffer(count) {
    const result = shiftBuffer(Buffer.from(this.#buffer), count);
    this.#buffer = result.remainder;
    return result;
  }

  /**
   * @public
   * @returns {Buffer}
   */
  get rawBuffer() {
    return this.#buffer;
  }

  /**
   * @public
   * @returns {string}
   */
  toString() {
    return this.rawBuffer.toString();
  }
}
