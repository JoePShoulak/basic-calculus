const { errors } = require("./errors");

const getMatch = regMatch => (regMatch ? regMatch[0] : null);

const parseExp = exp => exp.substring(1).replace(/\(|\)/, "");

/**
 * Parse a monomial for it's relevant information
 * coef: the coefficient of the monomial (1 if missing)
 * exp: the exponent of the variable (1 if missing, 0 if variable is also missing)
 * varN: the name of the variable used in the monomial
 */
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
