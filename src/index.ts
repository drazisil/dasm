import EventEmitter from "events";
import { FileHandle, stat, open } from "fs/promises";

export interface IStatusResult {
  loading: boolean;
  processing?: boolean;
  lastError: Error | "";
}

export class Dasm {
  private _buffer: Buffer | undefined;
  private _filePath = "";
  private _loadSuccess = false;
  private _lastError: Error | "" = "";
  private _fileHandle: FileHandle | undefined;

  constructor(filePath: string) {
    this._filePath = filePath;
  }

  private async _readFile() {
    try {
      this._fileHandle = await open(this._filePath, "r");

      const result = await this._fileHandle.readFile();

      this._fileHandle.close();
      return result
    } catch (error) {
      this._lastError = error;
      return Buffer.alloc(0)
    }
  }

  public static async create(filePath: string): Promise<Dasm> {
    const self = new Dasm(filePath);

    /* Welcome! We have just created a new Dasm class instance
     * We have been passed a file path. Our first step should be to see if it's a valid file
     */

    self._buffer = await self._readFile();

    console.log(`Read ${self._buffer.byteLength} bytes`);

    if (self._lastError) {
      return self;
    }

    self._loadSuccess = true;

    return self;
  }

  public get filePath(): string {
    return this._filePath;
  }

  public get status(): IStatusResult {
    return { loading: this._loadSuccess, lastError: this._lastError };
  }
}
