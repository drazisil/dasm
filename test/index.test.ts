import { helloWorld } from '../src/index'

it('returns a sample', async() => {
    await helloWorld()
    expect(console.log).toBeCalledWith(expect.stringMatching(/Hello/))
})
