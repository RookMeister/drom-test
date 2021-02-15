const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@modules': 'src/modules',
    '@assets': 'src/assets',
    '@reducers': 'src/reducers',
    '@actions': 'src/actions',
    '@store': 'src/store',
  })(config)

  return config
}
