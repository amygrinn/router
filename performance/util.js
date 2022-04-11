/* eslint-disable no-eval */
/* eslint-disable no-param-reassign */
const getExcelColumn = (x) => {
  const DOMAIN = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // Value of one at order
  const one = (order) => DOMAIN.length ** order;

  let result = '/';

  do {
    let order = Math.floor(Math.log(x || 1) / Math.log(DOMAIN.length));
    do {
      digit = Math.floor(x / one(order));
      x -= digit * one(order);
      result += DOMAIN[digit];
      order--;
    } while (order >= 0);
  } while (x > 0);

  return result;
};

const getExcelColumns = (num) => {
  const result = [];

  for (let i = 0; i < num; i++) {
    result.push(getExcelColumn(i));
  }

  return result;
};

const getPages = (paths, depth) => {
  if (depth === 1) return paths;
  return [{ path: '/a', children: getPages(paths, depth - 1) }];
};

module.exports = { getPages, getExcelColumns };
