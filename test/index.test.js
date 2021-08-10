import { createDisassembler, fingerprintFile } from "../src/index.js";

describe("Dasm Core", () => {
  it("should be returned by createDisassembler()", async () => {
    const dasm = await createDisassembler("dummyFile");

    expect(dasm.getFilePath()).toEqual("dummyFile");
  });

  it("should have a status of loadSuccess === false, if file loading failed", async () => {
    const dasm = await createDisassembler("dummyFile");

    expect(dasm.getStatus().loading).toBeFalsy();
  });

  it("should have a lastError set, if path is not a file", async () => {
    const dasm = await createDisassembler("./testFiles");

    expect(dasm.getStatus().lastError).toMatch(/EISDIR/);
  });

  it("should have a status of loadSuccess === true, if file loading was successful", async () => {
    const dasm = await createDisassembler("./testFiles/cabview.dll");

    expect(dasm.getStatus().loading).toBeTruthy();
  });

  it("should have a lastError set, if unable to identify the file signature", async () => {
    const dasm = await createDisassembler(
      "./testFiles/128602992-c334153d-da5e-4666-8546-b0a72f342286.png"
    );
    fingerprintFile(dasm);
    expect(dasm.getStatus().lastError).toMatch(/Unsupported file signature/);
  });
});

describe("fingerprintFile()", () => {
  it("should be able to fingerprint a file", async () => {
    const dasm = await createDisassembler("./testFiles/cabview.dll");
    fingerprintFile(dasm);

    expect(dasm.getFingerprint()).toMatch("dos mz executable");
  });
});
