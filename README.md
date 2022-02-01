# すけがお

日程調整用のスプレッドシートを自動生成する Slack bot です．

![Schega0](https://user-images.githubusercontent.com/10525696/111187140-145d3080-85f7-11eb-8d7f-f7aa2e6f3e88.PNG)

## Quick Start

事前に Slack app を作成しておいてください．Bot Token Scopes に以下の二つを設定してください．

- `commands`
- `users:read`

本リポジトリを clone します．

```bash
$ git clone git@github.com:Kasega0/Schega0.git
$ cd Schega0
$ cp env.js.example env.js
```

新規 **webapp** を作成．（clasp を導入していない場合は手動で設置してください）

```bash
$ clasp create sample_app
? Create which script? (Use arrow keys)
  standalone
  docs
  sheets
  slides
  forms
❯ webapp
  api
```

設定ファイル [env.js](./env.js.example) に各種値を設定．

```js
const APP_TOKEN = "";
const BOT_TOKEN = "xoxb-";
const ALLOW_CHANNELS = [];
const COMMAND_NAME = "/";
const CACHE_KEY = "Schega0";
```

GAS プロジェクトにアップロード

```bash
$ clasp push
```

調整用のスプレッドシートを一つ作成し，GAS プロジェクトと紐づけてください．このとき，スプレッドシートが調整に参加する全てのユーザーと共有されている必要があります．

最後にアプリをデプロイして Web アプリの URL を Slack API の Slash Commands に設定し，次のように timeDrivenFunction を毎分実行するようにトリガーを作成すれば設定完了です．

![trigger](https://user-images.githubusercontent.com/10525696/111203129-f1874800-8607-11eb-99ea-d96fd6017fd2.PNG)

## 使い方

ここでは Slack コマンドに `/schega0` を設定したとします．

```slack
/schega0 yyyy/MM/dd days @member1 @member2 ...
```

![reply](https://user-images.githubusercontent.com/10525696/111191346-50929000-85fb-11eb-8050-6d5ef7628650.PNG)

### 必須オプション

日程調整に参加するメンバー全員をメンションする形で指定します．コマンド使用者は自動で追加されるのでメンションする必要はありません．

### オプション引数

- 調整開始日
- 調整する日数

を指定できます．

調整開始日は `yyyy/MM/dd` 形式で指定しますが，`yyyy/` 部分は省略可能です．また，調整開始日を省略すると，デフォルトではコマンド使用日が設定されます．

調整する日数を 1 から 100 までの整数値で指定します．日数はデフォルトで 5 が設定されています．

## 開発者用

TODO: 追記

```bash
git config --local core.hooksPath .githooks
```
