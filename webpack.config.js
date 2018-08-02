const path = require( 'path' );

module.exports = ( env = {

} ) => {
    return {
        entry: {
            app: [
                path.resolve( __dirname, './src/assets/js/app.js' ),
                path.resolve( __dirname, './src/assets/scss/style.scss' ),
            ],
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve( __dirname, './build/assets/' ),
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            minified: true,
                            presets: [
                                'env',
                            ],
                        },
                    },
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].css',
                            },
                        },
                        {
                            loader: 'extract-loader',
                        },
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                },
            ],
        },
    };
};
