const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/, // следим за файлами .js
                exclude: /node_modules/, // исключаем модули node
                use: {
                    loader: "babel-loader" // обрабатываем с помощью bable
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"] // webpack выполняется справа на лево: сначала css-loader
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
};