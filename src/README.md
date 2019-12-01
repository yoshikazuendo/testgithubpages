# 2020年に向けて自分用ドキュメントツールを見直してみた[Visual Studio Code][VuePress][GitHub Pages][CircleCI]

特に理由は無いですが2020年も近いことですし自分用ドキュメントツールを見直してみようかと思います。

本稿では、ドキュメントツールを見直した際に行った作業を記録しておきます。

## 前置き

自分用のメモとして、技術的なことを調査した内容や検証してみた結果を、ドキュメントツールで記録をしていました。「前にアレやったことあったけどどうだったかな～」といった際に見直すことができたり、記録をする行為を経て「ああ、自分この辺わかってないなー」と気付けるきっかけにもなったりとメリットを感じていました。

### これまで使っていたドキュメントツール

2009年～2016年まで：pukiwiki

　PHPで動作するウィキクローンの一つ。自宅のノートPCをサーバーにして立ち上げてました。引越しを機に廃止。

2016年～2019年（現在）：Crowi-Plus

　Markdownで書けるWiki。pukiwikiとは違ったWikiサービス＆Markdownに慣れたかったので採用(pukiwikiでも頑張ればMarkdownで書けそうだけど）。自宅オンプレだと電源を入れっぱなしにする必要があるなど色々と面倒だったので、AzureにVMを立てて管理していました。現在もこれで運用中。

![Crowi-Plus](../src/.vuepress/public/images/README/crowi.png)

## どんなドキュメントツールを使いたいか

- Markdownで書きたい
  - リアルタイムでプレビューしたい
  - 画像を貼りたい
- クラウドにのせる
- クラウドサービスを使うのにお金をかけたくない
  - Azureは無償の範囲内で使えて入るが、その恩恵が受けられなくなる可能性もあるので事前に対策しておきたい気持ちもあった。
  - GCPの無料枠も悪くはないと思ったが今回はパス
- GitHub Pagesに公開したい
  - ドキュメントは最終的にはGitHub Pagesに公開したい（GitHubのCommit色をつけたい欲求も満たされる）
- ツールは今っぽいサービスを使いたい
  - GitBook v1（オンプレ向け）はメンテされていないなのでNG
  - GitBook v2 はホスティングのみなのでNG
  - docsifyも魅力的ではあるが、メンテされていない可能性あり？
  - MkDocs python基盤のMarkdownで書けるドキュメントツール。これも候補だった
  - VuePress
    - 去年あたりから流行っていそう？面白そうなので使ってみたい

ってことでVuePressを使ってみることにしました。

## [VuePress](https://vuepress.vuejs.org/)とは

VuePressは、Vue.jsの作者Evan You氏が作成した静的サイトジェネレータです。Markdownで書かれたファイルを元にHTMLを生成することができるのが特徴です。他にも、Markdown内でVueが使用できたり、Vueを利用してカスタムテーマの開発が可能だったりするそうです。

## 環境を準備する

ということで、VuePressを使ったドキュメント管理をするための環境を作ります。

利用OSやソフトウェアは以下を使用しています。

- OS: Windows 10
- Visual Studio Code: v1.40.2
- Node.js： v10.16.3
- npm： v6.9.0
- VuePress： 1.2.0

## 1. Visual Studio Code をインストールする

ドキュメントのエディタとして、Visual Studio Codeを使用します。
[公式サイト](https://azure.microsoft.com/ja-jp/products/visual-studio-code/)よりダウンロードしインストールします。

Visual Studio Codeのインストールが完了したら、Markdownを便利に編集するために、以下のExtensionをインストールします。

- Markdown All in One
- markdownlint
- Paste Image
- ※Markdownとは直接関係ないが、以下のExtensionもついでにインストールしておく
  - Japanese Language Pack for Visual Studio Code
  - vscode-icons

## 2. Node.js をインストールする

VuePressを使うにはNode.jsが必要なためインストールします。
[公式サイト](https://nodejs.org/en/download/)よりダウンロードしてインストールします。

インストールが終わったらコマンドを叩いて確認します。（npmも一緒に入るはず）

```bash
$ node --version
v10.16.3

$ npm --version
6.9.0
```

## 3. VuePress をインストールする

npmを使ってインストールします。

```bash
$ mkdir mywiki
$ cd mywiki
$ npm init -y
$ npm i -D vuepress
```

しばらくするとインストールが完了します。コマンドを叩いてインストールされたことを確認しまします。

```bash
$ npm list vuepress
`-- vuepress@1.2.0
```

## 4. VuePress の設定

Markdownを書き始める前に、VuePressの設定周りをいじっておきます。

### 4.1. ディレクトリ構成



### 4.2. package.json にVuePress用コマンドを追記する

```json
～中略～
"scripts": {
  "dev": "vuepress dev src",
  "build": "vuepress build src"
},
～中略～
```

`dev`、`build`はsrcフォルダに対してそれぞれ、VuePressの開発環境を起動、ビルド（静的ファイルの生成）するコマンドとして使用します。

### 4.3. VuePressの構成ファイルを編集する

VuePressは、サイト構成に対して色々なカスタマイズが可能なようです。詳しくは公式サイトの[設定](https://vuepress.vuejs.org/guide/basic-config.html#config-file)や[構成リファレンス](https://vuepress.vuejs.org/config/)を参照ください。

今回はいくつかの設定値を編集し、以下のような設定としています。

```json
module.exports = {
  title: 'Aikazuyendo\'s Memo',
  dest: 'docs/',
  base: '/mywiki/'
}
```

#### 4.3.1. title Config

サイトのタイトルを定義できます。すべてのページタイトルとして反映されるようです。VuePressのデフォルトテーマの場合、ナビゲーションバーに表示されます。

![title Config](../src/.vuepress/public/images/README/20191201164628.png)

#### 4.3.2. dest Config

srcフォルダ内のMarkdownに対してVuePressをビルドするため、ビルドで生成される静的ファイルをdocsフォルダに格納するように構成ファイルを編集します。
最終的には静的ファイルを含めGitHubにpushし、docsフォルダをGitHub Pagesの公開ディレクトリパスとするためこの設定を設けています。

#### 4.3.3. base Config

GitHub Pagesなどへデプロイする際に設定する必要があるようです。
例えば、GitHub PagesのURLが`https://yoshikazuendo.github.io/mywiki/`の場合は、base Configに`/mywiki/`を設定する必要があります。

### 4.4. VuePressの開発環境を起動する

以下のコマンドを実行すると開発環境が立ち上がります。

```bash
$ npm run dev
```

![npm run devの実行結果](../src/.vuepress/public/images/README/20191201002624.png)

表示されたURLにアクセスするとブラウザで動作確認ができます。

![ブラウザで確認](../src/.vuepress/public/images/README/20191201003143.png)

なお、開発環境を立ち上げた状態でMarkdownを修正すると、その内容がリアルタイムでブラウザに反映されます。

### 4.5. VuePressのビルドをする

以下のコマンドを実行するとビルドが行われ、htmlなどの静的ファイルが生成されます。

```bash
$ npm run build
```

今回は、docsフォルダ配下に静的ファイルが生成されます。

![ビルド結果](../src/.vuepress/public/images/README/20191201021009.png)

## 4.6. GitHub Pagesへ公開する

## 4.7. GitHub Pagesにアップロード

## 4.8. デプロイを自動化する

## 参考サイト

- [VS code で最強の Markdown 環境をつくる方法 -『tool』](https://webmanab-html.com/tip/vs-code-markdown/)
- [Paste Image](https://marketplace.visualstudio.com/items?itemName=mushan.vscode-paste-image)
- [【VSCode】Visual Studio Code のユーザー設定をカスタマイズ](https://mattyan1053.hatenablog.com/entry/2018/08/02/021144)
- [VuePressで自分向けのWiki的なページを作成した](https://yoshinorin.net/2019/10/06/create-wiki-by-vuepress/)
- [VuePress入門](https://www.nxworld.net/services-resource/hello-vuepress.html)
- [VuePress+GitHub Pagesで独自ドメイン＋HTTPS対応のサイトを作る in 2018](https://qiita.com/crea/items/9751c50d4c15a6b60ae1)
- [VuePress で静的ページを作成し、GitHub Pages に公開する](https://y4shiro.github.io/vue-press/)
- [【CircleCI】CircleCI 2.0からはじめる個人での簡単なCI導入方法 - githubとの連携まで](https://tweeeety.hateblo.jp/entry/2018/02/09/195345)
- [VuePressの基礎基礎メモ](https://nogson2.hatenablog.com/entry/2019/07/04/191648)
- [VuePress Config Reference](https://vuepress.vuejs.org/config/#basic-config)

[fuzzynavel](http://fuzzynavel.centralus.cloudapp.azure.com:3000/)
