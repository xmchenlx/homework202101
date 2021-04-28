module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000'//目标域名地址
        },
        '/uploads': {
          target: 'http://localhost:3000'  //图片上传
        }
      }
    }
  }