const fs = require('fs');
const path = require('path');

var dirpath = "./docs"
var dirs = fs.readdirSync(dirpath).filter((f) => {
  return fs.existsSync(dirpath + "/" + f) && fs.statSync(dirpath + "/" + f).isDirectory() && f != "assets" && f != "images"
})
var sidebarArray = ["/"].concat(dirs.map((dir) => {
  return {
    title: dir,
    collapsable: true,
    children: fs.readdirSync(dirpath + "/" + dir).map((childDir) => {
      return dirpath + "/" + dir + "/" + childDir
    })
  }
}))

module.exports = {
  title: 'aikazuyendo\'s memo',
  description: '個人的に気になったことを調査したりやってみた結果をメモしています。',
  dest: 'docs/',
  base: '/mywiki/',
  locales: {
    '/': {
      lang: 'ja'
    }
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about/' },
      { text: 'GitHub', link: 'https://github.com/yoshikazuendo/mywiki' }
    ],
    sidebar: sidebarArray
  }
}
