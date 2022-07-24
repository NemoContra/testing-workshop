const webpackPreprocessor = require('@cypress/webpack-batteries-included-preprocessor');

module.exports = (on) => {
  on(
    'file:preprocessor',
    webpackPreprocessor({
      typescript: require.resolve('typescript'),
    })
  );
};
