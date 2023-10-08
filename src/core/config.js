/**
 * 网站配置文件
 */

const config = {
  appName: '聚鼎四方系统演示',
  appLogo: 'http://198.74.117.41/static/img/nav_logo.470f8f3e.png',
  showViteLogo: true
}

export const viteLogo = (env) => {
  if (config.showViteLogo) {
    const chalk = require('chalk')
    console.log(
      chalk.green(
        `> 欢迎使用聚鼎四方系统`
      )
    )
    console.log(
      chalk.green(
        `> 当前版本:v1.0.0`
      )
    )
    console.log('\n')
  }
}

export default config
