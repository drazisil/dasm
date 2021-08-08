import { Dasm } from "./src/index";

async function main() {
  try {
    await Dasm.create("./testFiles/cabview.dll");
  } catch (err) {
    console.error(`There was an error: ${err}`);
  }
}

Promise.all([main()]);
