//引入一个包
const path = require('path');

//引入HTML插件
const HTMLWebpackPlugin = require('html-webpack-plugin');

//引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// webpack中的所有配置信息都应该写在module.exports中
module.exports = {

    mode: "development",

    // 指定入口文件
    entry: './src/index.ts',

    output: {
        //指定打包文件放在哪
        path: path.resolve(__dirname, 'docs'),

        //指定打包文件叫什么
        filename: "bundle.js",

        environment: {
            //设置不用箭头函数
            arrowFunction: false,
        }
    },

    //指定webpack打包时要用的模块
    module: {
        // 指定加载的规则
        rules: [
            {
                // test指规则生效的文件，使用正则表达式
                // 这里的意思是用ts-loader去处理以ts结尾的文件
                test: /\.ts$/,
                // 写在后面的先执行
                use: [
                    {
                        //指定加载器
                        loader: "babel-loader",
                        // 设置babel
                        options: {
                            // 设置预定义的环境
                            presets: [
                                [
                                    //指定环境插件
                                    "@babel/preset-env",
                                    //配置信息
                                    {
                                        //要兼容的目标浏览器
                                        targets: {
                                            "chrome": "58",
                                            "ie": "11",
                                        },
                                        //指定corejs的版本
                                        "corejs": "3",
                                        //使用corejs的方式，usage表示按需加载
                                        "useBuiltIns": "usage",
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                // 要排除的文件
                exclude: /node-modules/
            },

            //设置less文件的处理
            {
                test: /\.less$/,
                // 从下到上处理
                use: [
                    "style-loader",
                    "css-loader",
                    //引入postcss
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browers:'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader",
                ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin(
            {
                //title: "MY TITLE",
                template: "./src/index.html",
            }
        ),
    ],

    // 设置哪些文件可以作为模块做引用
    resolve: {
        extensions: ['.ts', '.js']
    }
}