//引入path模块
const path = require("path");
//引入webpack模块
const webpack = require("webpack");
//引入单独打包css/less/sass文件的插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//自动给css3添加属性，添加厂商前缀
const autoprefixer = require("autoprefixer");
//webpack配置
module.exports = {
	//入口文件
	entry:__dirname + "/App/app.js",
	//输出文件地址及其名字
	output:{
		path:path.join(__dirname,"public/js"),
    filename:"bundle.js"
	},
	//loader配置
	module:{
		rules:[
           {
           	    //使用babel编译js文件
	           	test:/\.js$/,
	           	use:[{
		          loader:"babel-loader",
		          options:{
		            presets:["es2015","react"]
		          }
		        }],
	           	exclude: [
		          path.resolve(__dirname, "node_modules")
		        ]
           },
           {
              //编译css问价
	           	test:/\.css$/,
                use:ExtractTextPlugin.extract({
			          fallback: 'style-loader',
			          use: ['css-loader','postcss-loader']
			        })
           },
           { 
                //编译less文件
           	    test:/\.less$/,
           	    use:ExtractTextPlugin.extract({
			          fallback: 'style-loader',
			          use: ['css-loader',"postcss-loader",'less-loader']
			        })
           },
           {
                //编译scss或者sass文件
           	    test:/\.(sass|scss)$/,
           	    use:ExtractTextPlugin.extract({
			          fallback: 'style-loader',
			          use: ['css-loader','sass-loader']
			        })
           },
           {
                //编译图片文件
           	    test:/\.(png|jpg|gif|svg)$/,
           	    loader:"url-loader?limit=500&name=../image/[name]-[hash].[ext]"
           }
		]
	},
	//webpack服务器配置
	devServer:{
        contentBase: __dirname + "/public",
        stats: {
            colors: true
        },
        historyApiFallback:true,
        inline:true,
        port:3000,
        hot:true
	},
	//使用的插件配置
    plugins:[
       //css样式单独打包的插件
       new ExtractTextPlugin("../css/[name].css"),
       //模块热更新插件
       new webpack.HotModuleReplacementPlugin(),
       //将jq配置成全局变量
       new webpack.ProvidePlugin({
			    $: "jquery",
			    jQuery: "jquery",
			    "window.jQuery": "jquery"
			}),
       //postcss配置
       new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function(){
                    return [
                        require("autoprefixer")({
                            browsers: ['ie>=8','>1% in CN']
                        })
                    ]
                }
            }
        })
    ]
}