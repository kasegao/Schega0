# すけがお

日程調整用のスプレッドシートを自動生成する Slack bot です．

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

設定ファイル [env.js](./env.js) に各種値を設定．

```js
const APP_TOKEN = "";
const BOT_TOKEN = "xoxb-";
const ALLOW_CHANNELS = [];
const COMMAND_NAME = "/";
const CACHE_KEY = "Schega0";
```

App Script プロジェクトにアップロード

```bash
$ clasp push
```

最後にアプリをデプロイして Web アプリの URL を Slack API の Slash Commands に設定すれば完了です．

## 使い方

ここでは Slack コマンドに `/schega0` を設定したとします．

```slack
/schega0 yyyy/MM/dd days @member1 @member2 ...
```

### 必須オプション

日程調整に参加するメンバー全員をメンションする形で指定します．コマンド使用者は自動で追加されるのでメンションする必要はありません．

### オプション引数

- 調整開始日
- 調整する日数

を指定できます．

調整開始日は `yyyy/MM/dd` 形式で指定しますが，`yyyy/` 部分は省略可能です．また，調整開始日を省略すると，デフォルトではコマンド使用日が設定されます．

調整する日数を 1 から 100 までの整数値で指定します．日数はデフォルトで 5 が設定されています．
