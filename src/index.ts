import { FileHandle, stat, open } from "fs/promises";

export interface IStatusResult {
  loading: boolean;
  processing?: boolean;
  lastError: Error | ''
}

export class Dasm {
  private _buffer: Buffer | undefined;
  private _filePath: string = ''
  private _loadSuccess = false;
  private _lastError: Error | '' = ''
  private _fileHandle: FileHandle | undefined;

  constructor(filePath: string) {
    this._filePath = filePath;
  }

  private async _readFile() {
    try {
        const fileStats = await stat(this.filePath)
        if (!fileStats.isFile()) {
            this._lastError = new Error(`Not a valid file.`)
            return
        }
    } catch (error) {
        this._lastError = error
    }

    this._fileHandle = await open(this._filePath, "r").catch((err) => {
      console.error(`Error opening ${this._filePath}: ${err}`);
      return undefined;
    });

    if (!this._fileHandle) {
      return console.error(`Unable to parse ${this._filePath}`);
    }

    console.log("Hi!");

    this._buffer = await this._fileHandle.readFile();

    this._fileHandle.close();

    console.log(`Read ${this._buffer.byteLength} bytes`);
  }

  public static async create(filePath: string): Promise<Dasm> {
    const self = new Dasm(filePath);

    /* Welcome! We have just created a new Dasm class instance
     * We have been passed a file path. Our first step should be to see if it's a valid file
     */

    
    await self._readFile()

    if (self._lastError) {
        return self
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
