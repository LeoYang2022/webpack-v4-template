/** webpack.config.js --- webpack的配置文件 */
// 注意：webpack.config.js 使用 commonJS 模块化规范
// loader 安装完即可直接使用，plugin 安装完后必须引入（import）才能使用

const path = require("path");

// 引入 plugin 插件
const htmlWebpackPlugin = require("html-webpack-plugin");   // 生成 html 文件
const miniCssExtractPlugin = require("mini-css-extract-plugin");    // 生成 css 文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');     // 每次打包时，删除上次打包的残留文件，保证打出的包整洁
const { VueLoaderPlugin } = require("vue-loader");    // 处理 Vue 文件加载

module.exports = {
    /** 入口：整个项目必须要指定一个打包的入口文件 */
    entry: "./src/main.js",
    
    /** 出口： */
    output: {
        // 打包后的文件
        filename: "js/app.js",
        // 打包文件的输出路径，__dirname（全局变量，返回当前项目的绝对路径），dist（打包后文件保存的目录）
        path: path.resolve(__dirname, "dist"),
    },
    /** loader */
    // webpack 默认只能处理 js、json 文件，如果需要处理其他文件的话，需要引入对应的加载器
    // 通过 module.rules 选项配置加载器
    module: {
        rules: [
            // 每个对象处理对应的文件类型
            // 处理 css 文件
            // {
            //     test: /\.css$/i,    // 文件类型，使用正则表达式匹配
            //     // 注意：loader 的加载顺序是 “从右向左”
            //     // css-loader：将 css 文件以模块化的方式导入到 js 中
            //     // style-loader：将 js 中的 css 代码以 <style> 标签的方式嵌入到网页中
            //     use: ["style-loader", "css-loader"]
            // },

            /** 抽离 css 样式 */
            {
                test: /\.css$/i,
                use: [
                    {
                        /** 替换了 style-loader */
                        loader: miniCssExtractPlugin.loader,
                        options: {  // 配置
                            publicPath: "../../",   // 获取资源的路径，★ 多了一层目录，往前退一层 ../
                        }
                    }, 
                    "css-loader"
                ]
            },

            // 处理图片文件
            // {
            //     test: /\.(png|jpg|gif)$/i,
            //     use: ["file-loader"]
            // },
            {   // 添加 base64 处理
                test: /\.(png|jpg|gif)$/i,
                use: [{
                    loader: "url-loader",
                    options: {
                        // 重新生成文件名（可指定目录）
                        name: "img/[name].[hash:8].[ext]",
                        // 限制大小（单位：kb），超过指定大小的图片直接打包，不超过的则直接转为 base64 编码
                        limit: 50 * 1024,   // 50kb
                        // url-loader 默认采用 ES6 的模块化，html-loader 采用的是 commonJs 的模块化
                        // 为了让 html 模板中直接引入的图片可以正常显示，需要关闭 ES6 模块化，统一采用 commonJS 模块化
                        esModule: false,
                    }
                }]
            },

            // 处理 html 文件中的图片资源
            {
                test: /\.html$/i,
                use: ["html-loader"]
            },

            // 处理 vue 文件
            {
                test: /\.vue$/i,
                loader: "vue-loader"
            },
        ]
    },

    /** plugin：插件，功能比 loader 更强大，用于处理复杂业务 */
    plugins: [
        // 该插件在打包时，会自动创建 html 文件，并引入打包后的 js 文件
        // 也可以指定一个 html 文件，作为页面的模板被创建
        new htmlWebpackPlugin({
            template: "./public/index.html",   // 模板文件所在路径
        }),

        // 该插件在打包时，会将 HTML 的内嵌样式（<style>）抽离出去，形成一个外部的 css 文件
        new miniCssExtractPlugin({
            filename: "css/app.css",    // ★ 多一层目录 css
        }),

        // 清理目录
        new CleanWebpackPlugin(),

        new VueLoaderPlugin(),
    ],

    // 配置 webpack-dev-server 服务代理
    devServer: {
        port: 9005
    },

    /** 模式：开发模式(development)、生产模式(production) */
    mode: "development",
}
