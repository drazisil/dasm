import { createDisassembler, fingerprintFile } from "./src/index.js";

async function main() {
  try {
    const dasm = await createDisassembler("./testFiles/cabview.dll");

    if (dasm.getStatus().loading === false) {
      throw new Error(dasm.getStatus().lastError);
    }

    const fileType = fingerprintFile(dasm);

    console.log(`File type is: ${fileType}`);
  } catch (err) {
    console.error(`There was an error: ${err}`);
  }
}

Promise.all([main()]);
