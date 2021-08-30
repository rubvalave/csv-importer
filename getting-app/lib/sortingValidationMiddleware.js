const { StatusCodes } = require('http-status-codes');

module.exports = (req, res, next) => {
  const orderByRegEx = /(.)+\.(des|asc)$/gm;
  const orderByParam = req.query.orderBy;
  if (!orderByParam) {
    req.query.orderBy = {
      field: 'createdAt',
      method: -1,
    };
    return next();
  }
  if (orderByRegEx.test(orderByParam)) {
    const splittedParam = orderByParam.split('.');
    req.query.orderBy = {
      field: splittedParam[0],
      method: splittedParam[1] === 'asc' ? 1 : -1,
    };
    return next();
  }
  return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Malformed orderBy param' });
};
