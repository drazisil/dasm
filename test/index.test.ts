import { Dasm } from "../src/index";

describe("Dasm Core", () => {
  it("should throw an error when created as a new object without create()", async () => {
    expect(() => new Dasm("dummyFile")).toThrowError(/create()/);
  });

  it("should be able to be created with it's static create() method", async () => {
    const dasm = await Dasm.create("dummyFile");

    expect(dasm.filePath).toEqual("dummyFile");
  });

  it("should have a status of loadSuccess === false, if file loading failed", async () => {
    const dasm = await Dasm.create("dummyFile");

    expect(dasm.status.loading).toBeFalsy();
  });

  it("should have a lastError set, if path is not a file", async () => {
    const dasm = await Dasm.create("./testFiles");

    expect(dasm.status.lastError.toString()).toMatch(/EISDIR/);
  });

  it("should have a status of loadSuccess === true, if file loading was successful", async () => {
    const dasm = await Dasm.create("./testFiles/cabview.dll");

    expect(dasm.status.loading).toBeTruthy();
  });

  it("should have a lastError set, if unable to identify the file signature", async () => {
    const dasm = await Dasm.create("./testFiles/128602992-c334153d-da5e-4666-8546-b0a72f342286.png");

    expect(dasm.status.lastError.toString()).toMatch(/supported file/);
  });
});
