"use strict";
const path = require("path");
function resolve(dir) {
    console.log(__dirname,dir)
  return path.join(__dirname, dir);
}

module.exports = {
    transpileDependencies: ['uview-ui'],
    // 配置路径别名
    configureWebpack: {
        devServer: {
            // 调试时允许内网穿透，让外网的人访问到本地调试的H5页面
            disableHostCheck: true
        },
        
		resolve: {
			alias: {
				"@": resolve("src/"),
			},
		},
    },




    // productionSourceMap: false,
}
