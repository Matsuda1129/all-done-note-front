# all-done-note-front

バックエンドのGithubのURL
https://github.com/Matsuda1129/all-done-note-server

インフラのGithubのURL
https://github.com/Matsuda1129/all-done-note-infrastructure


all-done-noteの機能要件
https://docs.google.com/spreadsheets/d/1gcqagdTxwYFXmaDIrUQ6CupCxMB-yPidHHFw46s_Kfs/edit?usp=sharing

Adobe xd デザイン　ｘｄファイル
https://all-done-note-dev-picture-bucket.s3.ap-northeast-1.amazonaws.com/All+Done+Note+%E3%83%86%E3%82%99%E3%82%B5%E3%82%99%E3%82%A4%E3%83%B3.xd

Adobe xd デザイン　webで見れるが全体図で見れず一枚ずつしか見れない。
https://xd.adobe.com/view/95d8c6d1-e6d9-4b22-a093-be8d49d97390-c08b/

ER図　MysqlWorkBench 
https://all-done-note-dev-picture-bucket.s3.ap-northeast-1.amazonaws.com/alldone_note+ER+8%3A7.mwb

awsの全体図 
https://drive.google.com/file/d/12rG_23aNNPJF81GcZfZn7_8w1XaY1ljP/view?usp=sharing

# アプリ説明
このアプリは終活を目的に作ったSNSアプリです。基本的なSNSの機能に加えてTodoリスト、データ分析機能があります。

Todoリストの項目は準備、生活費用、やりたいことの３つに大きく別れています。
準備は今自分が死んでも大丈夫にするためにしなくてはならないことを登録します。例えば遺書や葬儀などの準備です。
生活費用は自分が死ぬまでに必要な生活費用を登録するための項目です。
やりたいことは自分が死ぬまでにやりたいことを登録するための項目です。

目標金額１はTodoリスト項目の準備の合計金額です。つまり目標金額１は今自分が死んでも家族や親しい人が困らないために必要な金額です。
目標金額２はTodoリストのすべての合計金額です。つまり目標金額２は自分が死ぬまでに必要な金額です。

データ分析ページではそれらのTodoリストデータやプロフィール情報を元にデータの平均の達成率などを調べられます。プロフィール情報にuserの生死情報を加えているのは、死ぬのいつかわからない、生きているうちにあなたのやりたいこと、やるべきことをやっていかなくてはいけないと実感して欲しいためです。

# Usage
You need to prepare S3 bucket and vercel　enviroment variable.

Please make your S3 bucket and IAM role for using S3 bucket
After make S3 bucket, please change next.config.js images:domains: url for your S3buket URl.

You have to make vercel account for using vercel env.
First create vercel account.
Second create a git repository for this app and import it on vercel.
Third You can use vercel enviroment. Please create these  env. 

```bash
NEXT_PUBLIC_IMAGE_URL = your s3 bucket url and /
NEXT_PUBLIC_baseURL = localhost:3000(server localhost is 3000)
NEXT_PUBLIC_BUCKET = your s3 bucket name
NEXT_PUBLIC_REGION = your aws region
NEXT_PUBLIC_SECRET_KEY = your IAM role SECRET_KEY
NEXT_PUBLIC_ACCESS_KEY = ACCESS_KEY
```

Next, You need to install vercel cli

```bash
npm i -g vercel
vercel login
vercel dev --listen 8000  because server cors origin url is 8000
```
That's　all
