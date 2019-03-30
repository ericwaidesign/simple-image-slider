/**
 * simple-image-slider
 * @author <ericwaidesign@gmail.com>
 */

const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "./examples/src/index.html"),
    filename: "index.html"
});

module.exports = {
    entry: path.join(__dirname, "./examples/src/app.js"),
    module: {
        rules: [
            {
                test: [
                    /\.(js|jsx)$/
                ],
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(html)$/,
                use: ["html-loader"]
            },
            {
                test: /\.jpg$/, 
                use: ['ignore-loader']
            }
        ]
    },
    plugins: [htmlWebpackPlugin],
    resolve: {
        extensions: [".js", ".jsx"]
    }
};