import { Dasm} from './src/index'

async function main() {
    const dasm = Dasm.create("./testFiles/cabview.dll")
}

Promise.all([main()])