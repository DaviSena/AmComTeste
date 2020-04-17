module.exports = {
  root: true,
  extends: '@react-native-community',
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
