module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    cjs: true,
    umd: {
      global: 'TableUp',
      externals: {
        'react': 'React',
      },
    },
  },
};
