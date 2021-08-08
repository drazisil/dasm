import { Dasm } from "./src/index";

async function main() {
  try {
    const dasm = await Dasm.create("./testFiles/cabview.dll");

    if(!dasm.status.loading) {
      throw new Error(dasm.status.lastError)
    }
  } catch (err) {
    console.error(`There was an error: ${err}`);
  }
}

Promise.all([main()]);
