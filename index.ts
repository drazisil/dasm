import { helloWorld} from './src/index'

async function main() {
    helloWorld()
}

Promise.all([main()])