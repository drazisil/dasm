import { FileHandle, open } from "fs/promises";
import { SigDB } from "sigdb";

const sigdb = new SigDB();

export interface IStatusResult {
  loading: boolean;
  processing?: boolean;
  lastError: string;
}

class Dasm {
  private _buffer: Buffer = Buffer.alloc(0);
  private _filePath = "";
  private _loadSuccess = false;
  private _processSuccess = false;
  private _lastError = "";
  private _fileHandle: FileHandle | undefined;
  private _fingerprint = "";

  name: any;

  constructor(filePath: string, wasCreated = false) {
    this._filePath = filePath;
  }

  public async loadFile(): Promise<number> {
    try {
      this._fileHandle = await open(this._filePath, "r");

      this._buffer = await this._fileHandle.readFile();

      this._fileHandle.close();
      this._loadSuccess = true;
      return this._buffer.byteLength;
    } catch (error) {
      this._lastError = error.message;
      return this._buffer.byteLength;
    }
  }

  public setError(errorMessage: string) {
    this._lastError = errorMessage;
  }

  public setFingerprint(fingerprintName: string) {
    this._fingerprint = fingerprintName
  }

  public getBuffer(): Buffer {
    return this._buffer;
  }

  public getFilePath(): string {
    return this._filePath;
  }

  public getStatus(): IStatusResult {
    return {
      loading: this._loadSuccess,
      processing: this._processSuccess,
      lastError: this._lastError,
    };
  }

  public getFingerprint() {
    return this._fingerprint;
  }
}

export function fingerprintFile(disassembler: Dasm): string {
  const sig = sigdb.find(disassembler.getBuffer());
  if (sig) {
    disassembler.setFingerprint(sig.name)
    return sig.name;
  } else {
    const message = "Unsupported file signature, fingerprinting failed.";
    disassembler.setError(message);
    return message
  }
}

export async function createDisassembler(inputPath: string): Promise<Dasm> {
  const dasm = new Dasm(inputPath);

  const bytesRead = await dasm.loadFile();

  console.log(`Read ${bytesRead} bytes`);

  return dasm;
}
