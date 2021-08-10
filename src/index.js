import fs from "fs/promises";
import { SigDB } from "sigdb";

const sigdb = new SigDB();

/**
 * @typedef IStatusResult
 * @property {boolean} loading
 * @property {boolean=} processing
 * @property {string} lastError
 */

class Dasm {
  /** @type {Buffer} */
  _buffer = Buffer.alloc(0);
  /** @type {string} */
  _filePath = "";
  /** @type {boolean} */
  _loadSuccess = false;
  /** @type {boolean} */
  _processSuccess = false;
  /** @type {string} */
  _lastError = "";
  /** @type {fs.FileHandle | undefined} */
  _fileHandle;
  /** @type {string} */
  _fingerprint = "";

  /**
   *
   * @param {string} filePath
   * @param {boolean} [wasCreated=false]
   */
  constructor(filePath, wasCreated = false) {
    this._filePath = filePath;
  }

  /**
   * @public
   * @returns {Promise<number>}
   */
  async loadFile() {
    try {
      this._fileHandle = await fs.open(this._filePath, "r");

      this._buffer = await this._fileHandle.readFile();

      this._fileHandle.close();
      this._loadSuccess = true;
      return this._buffer.byteLength;
    } catch (error) {
      this._lastError = error.message;
      return this._buffer.byteLength;
    }
  }

  /**
   * @public
   * @param {string} errorMessage
   */
  setError(errorMessage) {
    this._lastError = errorMessage;
  }

  /**
   * @public
   * @param {string} fingerprintName
   */
  setFingerprint(fingerprintName) {
    this._fingerprint = fingerprintName;
  }

  /**
   * @public
   * @returns {Buffer}
   */
  getBuffer() {
    return this._buffer;
  }

  /**
   * @public
   * @returns {string}
   */
  getFilePath() {
    return this._filePath;
  }

  /**
   * @public
   * @returns {IStatusResult}
   */
  getStatus() {
    return {
      loading: this._loadSuccess,
      processing: this._processSuccess,
      lastError: this._lastError,
    };
  }

  /**
   * @public
   * @returns {string}
   */
  getFingerprint() {
    return this._fingerprint;
  }
}

/**
 *
 * @param {Dasm} disassembler
 * @returns {string}
 */
export function fingerprintFile(disassembler) {
  const sig = sigdb.find(disassembler.getBuffer());
  if (sig) {
    disassembler.setFingerprint(sig.name);
    return sig.name;
  } else {
    const message = "Unsupported file signature, fingerprinting failed.";
    disassembler.setError(message);
    return message;
  }
}

/**
 *
 * @param {string} inputPath
 * @returns {Promise<Dasm>}
 */
export async function createDisassembler(inputPath) {
  const dasm = new Dasm(inputPath);

  const bytesRead = await dasm.loadFile();

  console.log(`Read ${bytesRead} bytes`);

  return dasm;
}
