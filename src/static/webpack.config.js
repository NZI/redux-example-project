const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/static/files', to: 'static'}
            ]
        })
    ]
};