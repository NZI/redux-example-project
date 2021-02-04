const path = require('path');

console.log(path.resolve(__dirname, 'node_modules'))

module.exports = {
    entry: {
        frontend: './src/frontend/index.tsx',
    },
    resolveLoader: {
        modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    'style-loader',
                    'css-loader?modules&importLoaders=1&url=false',
                    'sass-loader',
                ],
                exclude: /node_modules/,
            }
        ]
    },
}