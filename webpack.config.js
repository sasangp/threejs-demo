const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, 'src/script.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                loader: 'html-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'static'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|otf|eot|woff|woff2)$/,
                use:
                [
                    {
                        loader: 'url-loader',
                        options:
                        {
                            outputPath: 'fonts'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'static'),
                    to: path.resolve(__dirname, 'dist'),
                    noErrorOnMissing: true
                }
            ]
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack App',            
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/index.html')
        })
    ],
    devtool: 'source-map',
    devServer: {
        client: {
            logging: 'info',
            overlay: true,
            progress: true,
            reconnect: 6
        },
        compress: true,
        host: 'localhost',
        port: 8080,
        open: true,
        liveReload: true,
        watchFiles: {
            paths: ['src/**/*', 'static/**/*'],
            options: {
              usePolling: true,
            },
        },
        static: ['src']
    }
};

module.exports = config;