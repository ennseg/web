const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../src/main/webapp/dist'),
        filename: 'app.bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'react-dom/lib/CSSPropertyOperations': path.resolve(__dirname, 'src/shims/CSSPropertyOperations.js')
        }
    },
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'webapp'),
        },
        historyApiFallback: true,
        port: 3000,
        proxy: [
            {
                context: ['/api'],
                target: 'http://localhost:8080',
                changeOrigin: true,
                pathRewrite: { '^/api': '' }
            }
        ],
        hot: true,
        open: true
    }
};