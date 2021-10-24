const path = require('path')

module.exports = {
    entry: './index.js',
    output: {
        filename: 'bricks-path-store.js',
        path: path.resolve(__dirname, 'lib'),
        library: { name: 'bricksPathStore', type: 'umd' }
    },
    externals: {
        'bricks-fp': 'bricks-fp'
    },
    mode: 'production'
}
