import { stat } from "fs/promises";

export interface IStatusResult {
  loading: boolean;
  processing?: boolean;
  lastError?: Error | ''
}

export class Dasm {
  private _filePath: string;
  private _loadSuccess = false;
  private _lastError: Error | '' = ''

  constructor(filePath: string) {
    this._filePath = filePath;
  }

  public static async create(filePath: string): Promise<Dasm> {
    const self = new Dasm(filePath);

    /** Welcome! We have just created a new Dasm class instance
     * We have been passed a file path. Our first step should be to see if it's a valid file
     */

    const fileStats = await stat(filePath).catch(err => {
        self._lastError = err
        return
    });

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
    return { loading: this._loadSuccess };
  }
}
