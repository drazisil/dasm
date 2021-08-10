import { ExtendedBuffer, shiftBuffer } from "../src/bufferTools.js";

const testBuffer = Buffer.from("I_am_a_test_buffer");

describe("shiftBuffer()", () => {
  it("returns a value", () => {
    expect(shiftBuffer(testBuffer, 7).value.toString()).toEqual("I_am_a_");
  });

  it("returns a remainder", () => {
    expect(shiftBuffer(testBuffer, 7).remainder.toString()).toEqual(
      "test_buffer"
    );
  });

  it("return a value and remainder that combine to match inputBuffer", () => {
    const result = shiftBuffer(testBuffer, 7);
    expect(Buffer.concat([result.value, result.remainder])).toEqual(testBuffer);
  });
});

describe("ExtendedBuffer class", () => {
  let extendedTestBuffer = new ExtendedBuffer(Buffer.alloc(0));
  beforeEach(() => {
    extendedTestBuffer = new ExtendedBuffer(testBuffer);
  });

  it("returns a value", () => {
    expect(extendedTestBuffer.shiftBuffer(7).value.toString()).toEqual(
      "I_am_a_"
    );
  });

  it("returns a remainder", () => {
    const value = extendedTestBuffer.shiftBuffer(7).toString();
    expect(extendedTestBuffer.toString()).toEqual("test_buffer");
  });

  it("return a value and remainder that combine to match inputBuffer", () => {
    const result = extendedTestBuffer.shiftBuffer(7);
    expect(Buffer.concat([result.value, result.remainder]).toString()).toEqual(
      testBuffer.toString()
    );
  });
});
