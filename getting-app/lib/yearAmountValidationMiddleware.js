const { StatusCodes } = require('http-status-codes');

module.exports = (req, res, next) => {
  const yearAmountRegEx = /^[0-9]+,[a-zA-Z]+,[0-9]*\.?[0-9](?:..+)$/;
  const yearAmountParam = req.query.yearAmount;
  if (!yearAmountParam) {
    req.query.yearAmount = {
      field: '',
      method: 'none',
      amount: 0,
    };
    return next();
  }
  if (yearAmountRegEx.test(yearAmountParam)) {
    const splittedParam = yearAmountParam.split(',');
    req.query.yearAmount = {
      field: splittedParam[0],
      method: `$${splittedParam[1]}`,
      amount: splittedParam[2],
    };
    return next();
  }
  return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Malformed yearAmount param' });
};
