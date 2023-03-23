const { parseMonomial } = require("../lib/calculus");
const { errors } = require("../lib/errors");

test("handles solitary constants", () => {
  // Zero
  const parsedZ = parseMonomial("0");
  expect(parsedZ.coef).toBe(0);
  expect(parsedZ.exp).toBe(0);
  expect(parsedZ.varN).toBe(null);

  // Integer
  const parsedI = parseMonomial("-3");
  expect(parsedI.coef).toBe(-3);
  expect(parsedI.exp).toBe(0);
  expect(parsedI.varN).toBe(null);

  // Float
  const parsedF = parseMonomial("3.14");
  expect(parsedF.coef).toBe(3.14);
  expect(parsedF.exp).toBe(0);
  expect(parsedF.varN).toBe(null);
});

test("handles solitary variables", () => {
  // x
  const parsedX = parseMonomial("x");
  expect(parsedX.coef).toBe(1);
  expect(parsedX.exp).toBe(1);
  expect(parsedX.varN).toBe("x");

  // y
  const parsedY = parseMonomial("y");
  expect(parsedY.coef).toBe(1);
  expect(parsedY.exp).toBe(1);
  expect(parsedY.varN).toBe("y");
});

test("handles lines", () => {
  // Integer
  const parsedI = parseMonomial("-3*x");
  expect(parsedI.coef).toBe(-3);
  expect(parsedI.exp).toBe(1);
  expect(parsedI.varN).toBe("x");

  // Float
  const parsedF = parseMonomial("3.14*y");
  expect(parsedF.coef).toBe(3.14);
  expect(parsedF.exp).toBe(1);
  expect(parsedF.varN).toBe("y");
});

test("handles missing coefficients", () => {
  // Integer
  const parsedI = parseMonomial("x^(-2)");
  expect(parsedI.coef).toBe(1);
  expect(parsedI.exp).toBe(-2);
  expect(parsedI.varN).toBe("x");

  // Float
  const parsedF = parseMonomial("y^3.14");
  expect(parsedF.coef).toBe(1);
  expect(parsedF.exp).toBe(3.14);
  expect(parsedF.varN).toBe("y");
});

test("handles 'heavy' monomials", () => {
  // Integer
  const parsedI = parseMonomial("-3*x^(-2)");
  expect(parsedI.coef).toBe(-3);
  expect(parsedI.exp).toBe(-2);
  expect(parsedI.varN).toBe("x");

  // Float
  const parsedF = parseMonomial("3.14*y^1.618");
  expect(parsedF.coef).toBe(3.14);
  expect(parsedF.exp).toBe(1.618);
  expect(parsedF.varN).toBe("y");
});

test("throws error when given negative exponent without parens", () => {
  try {
    parseMonomial("-3*x^-2");
  } catch (e) {
    expect(e).toBeInstanceOf(Error);
    expect(e.message).toBe(errors.negExpParenError);
  }
});
