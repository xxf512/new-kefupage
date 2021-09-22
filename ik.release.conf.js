const { version } = require('ik-release/package.json')
const { checkout, getBranchName, dispatcher } = require('ik-release')
const { spawn, execSync } = require('child_process')
const chalk = require('chalk');
const fs = require('fs')
const semver = require('semver')
const path = require('path')
const shelljs = require('shelljs')


const incUpdateConf = {
  destinationFolder: '../kefu.inke.cn/backend/modules/chat/views/chat-channel', // 目标文件夹,
  maxChangesLimit: 200,
}

const envMap = { // 环境变量配置
  test: {
    destinationBranch: 'feature/4.8.0',
    maxChangesLimit: 100,
    ...incUpdateConf,
  }
}

const envConfig = envMap[process.env.SCRIPT_ENV]

if (semver.lt(version, '0.8.9')) {
  console.log(chalk.red(`[ik-release]版本过低, 请执行cnpm install ik-release, 再进行自动化提交, 谢谢`))
  console.log()
  process.exit(1)
}

const unOnlineTask = {
  source: 'dist/src/pages/setting', // 要copy的文件夹
  destinationCwd: '../kefu.inke.cn', // 目标仓库位置
  destinationRepo: 'git@code.inke.cn:opd/kefu/kefu.inke.cn.git', // 目标仓库地址
  filter: [/asset-manifest.json/, /.php/], // 空数组则表示全量拷贝
  ...envConfig,
  onCopyStart() {
    // 重命名文件为php后缀
    fs.rename('dist/src/pages/setting/index.html', 'dist/src/pages/setting/setting.php', function(err) {
      if (err) {
        console.log(err)
        console.log(chalk.red('文件重命名失败'))
        process.exit(1)
      } else {
        console.log('文件重命名成功')
      }
    })
  },
}

module.exports = {
  isNeedGitHandle: true, // 是否包含 git 操作 type: Boolean
  task: [
    unOnlineTask,
    {
      source: 'dist', // 要copy的文件夹
      destinationFolder: '../kefu.inke.cn/web', // 目标文件夹
      destinationCwd: '../kefu.inke.cn', // 目标仓库位置
      destinationBranch: envConfig.destinationBranch, // 要提交的分支
      destinationRepo: 'git@code.inke.cn:opd/kefu/kefu.inke.cn.git', // 目标仓库地址
      filter: [/^((?!(php|asset-manifest.json|favicon.ico|html)).)*$/],
    }
  ].filter(Boolean)
}