const fs = require('fs');
const rootpath = "./src"; // 操作対象のルートディレクトリパス

// ルートディレクトリ直下のディレクトリ名を取得する。
var childDirctories = fs.readdirSync(rootpath).filter((f) => {
  // .vuepressディレクトリは除く。
  return fs.existsSync(rootpath + "/" + f) && fs.statSync(rootpath + "/" + f).isDirectory() && f != ".vuepress";
})
console.log(childDirctories);

// 各ディレクトリ配下のファイル名を元にsidebarのgroup要素とchildren要素を生成する。
// ※加えて、トップページ用の''も生成しておく。
var sidebarElement = [''].concat(childDirctories.map((dir) => {
  return {
    title: dir,
    collapsable: false,
    children: fs.readdirSync(rootpath + "/" + dir).map((filename) => {
      return childPath = dir + "/" + filename
    })
  };
}));
console.log(sidebarElement);

module.exports = {
  title: 'aikazuyendo\'s memo',
  description: '個人的に気になったことを調査したりやってみた結果をメモしています',
  dest: 'docs/',
  base: '/mywiki/',
  locales: {
    '/': {
      lang: 'ja'
    }
  },
  config: (md) => {
    md.options.linkify = true
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about/' },
      { text: 'GitHub', link: 'https://github.com/yoshikazuendo/mywiki' }
    ],
    sidebar: sidebarElement
  }
}
