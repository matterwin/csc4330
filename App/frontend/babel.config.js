module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['react-native-reanimated/plugin', { disableOnAnimatedValueUpdate: true }],
      ['transform-remove-console', { exclude: ['error', 'warn'] }],
    ],
  };
};