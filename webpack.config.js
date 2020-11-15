let path = require('path');

let conf = { 
    entry:'./src/index.js',
    output: {
        path: path.resolve(__dirname,'./dist/'),
        filename: 'main.js',
        publicPath: 'dist/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
               },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
              }
        ]
    },
    
    /*devServer:{
        overlay: true
    }*/
    
};
module.exports = conf;