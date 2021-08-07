import { Dasm } from '../src/index'

describe('Dasm Core', () => {

    it("should be able to be created with it's static create() method", () => {
        const dasm = Dasm.create('dummyFile')

        expect(dasm.filePath).toEqual('dummyFile')
    
    })
})