const { getPages, getExcelColumns } = require('./util');
// (() => {
//   const test = `[...getPages(getExcelColumns(25), 1)]`;
//   console.log(test, eval(test));
// })();

// module.exports = { pages: getPages(getExcelColumns(1), 1) };
// module.exports = { pages: getPages(getExcelColumns(20), 1) };
// module.exports = { pages: getPages(getExcelColumns(100), 1) };
// module.exports = { pages: getPages(getExcelColumns(20), 2) };
// module.exports = { pages: getPages(getExcelColumns(20), 3) };
// module.exports = { pages: getPages(getExcelColumns(20), 4) };
module.exports = { pages: getPages(getExcelColumns(20), 5) };
