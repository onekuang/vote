module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? './' 			// 生产环境,打包时候的根目录
    : '/',     // 开发环境


   devServer: {  
   	open: process.platform === 'darwin',  
   	host: '0.0.0.0',  
   	port: 8082, 
    open: true,
   	https: false,  
   	hotOnly: false,  
   	proxy: null, // 设置代理  before: app => {}
   },


   // outputDir: 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致  
   // outputDir: "dist",  

   
   // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）  
   assetsDir: "static",  

   
   // 指定生成的 index.html 的输出路径  (打包之后，改变系统默认的index.html的文件名)  
   // indexPath: "myIndex.html",
}