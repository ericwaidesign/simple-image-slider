/**
 * simple-image-slider
 * @author <ericwaidesign@gmail.com>
 */

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [WebpackStripLoader.loader('console.log')],
                exclude: /node_modules/
            }
        ]
    }
});