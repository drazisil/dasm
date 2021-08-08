import EventEmitter from "events";
import { FileHandle, stat, open } from "fs/promises";

export interface IStatusResult {
  loading: boolean;
  processing?: boolean;
  lastError: string;
}

export class Dasm {
  private _buffer: Buffer | undefined;
  private _filePath = "";
  private _loadSuccess = false;
  private _processSuccess = false;
  private _lastError: string = "";
  private _fileHandle: FileHandle | undefined;
  name: any;

  constructor(filePath: string, wasCreated: boolean = false) {
    if (!wasCreated) {
      throw new Error("Please create a new instance with the create() method");
      
    }
    this._filePath = filePath;
  }

  private async _readFile() {
    try {
      this._fileHandle = await open(this._filePath, "r");

      const result = await this._fileHandle.readFile();

      this._fileHandle.close();
      return result;
    } catch (error) {
      this._lastError = error.message;
      return Buffer.alloc(0);
    }
  }

  public static async create(filePath: string): Promise<Dasm> {
    const self = new Dasm(filePath, true);

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
    return { loading: this._loadSuccess, processing: this._processSuccess, lastError: this._lastError };
  }
}

