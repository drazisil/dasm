export class Dasm {
    private _filePath: string

constructor(filePath: string) {
    this._filePath = filePath
    
}

    public static create(filePath: string): Dasm {
        const self = new Dasm(filePath)
        return self
    }

    public get filePath(): string {
        return this._filePath
    }
}