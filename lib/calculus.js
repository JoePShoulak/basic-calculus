/**
 * Acceptable forms of a monomial:
 * N*x^N
 * N*x
 * x^N
 * x
 * N
 */

const { errors } = require("./errors");

const getMatch = regMatch => (regMatch ? regMatch[0] : null);

const parseExp = exp => exp.substring(1).replace(/\(|\)/, "");

// Differentiate Monomial Term
const parseMonomial = term => {
  const coef = parseFloat(term.match(/^\-*\d+.?\d*/) ?? 1);

  const varN = getMatch(term.match(/[a-zA-Z]/));

  const badExp = term.match(/\^\-/) != null;
  if (badExp) throw new Error(errors.negExpParenError);

  const expMatch = getMatch(term.match(/\^\(?\-?\d+\.?\d*\)?/));

  const exp = expMatch ? parseFloat(parseExp(expMatch)) : varN ? 1 : 0;

  return { coef, exp, varN };
};

module.exports = { parseMonomial };
