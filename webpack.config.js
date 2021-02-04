const glob = require("glob")
const merge = require("webpack-merge")
const { resolve } = require('path')

const $webpackConfigFiles = new Promise((resolve, reject) => {
    glob("./src/*/webpack.config.js", (er, files) => er ? reject(er) : resolve(files))
})

const baseConfig = (name) => ({
    mode: 'development',
    externals: {
        sqlite3: 'commonjs sqlite3',
        typeorm: 'commonjs typeorm'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        alias: {
            '~': resolve(__dirname, `src/`),
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: '[name]/bundle.js'
    },
    entry: {
        [name]: `./src/${name}/index.ts`,
    }
})

module.exports = $webpackConfigFiles
    .then(webpackConfigFiles => webpackConfigFiles.map((webpackConfigFile) => {
        const name = webpackConfigFile.match(/\/src\/([^\/]+)/)[1]

        const cfg = merge(baseConfig(name), require(webpackConfigFile))
        console.log(cfg)
        return cfg
    }, {}))

// module.exports.then(cfgs => console.log(cfgs.map(cfg => cfg.module.rules)))
