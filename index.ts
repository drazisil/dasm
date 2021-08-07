import { Dasm } from "./src/index";

async function main() {
  const dasm = Dasm.create("./testFiles/cabview.dll").catch((err) => {
    console.error(`There was an error: ${err}`);
  });
}

Promise.all([main()]);
