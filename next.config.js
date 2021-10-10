// 各環境のenvファイルを読み込む
const isProd = process.env.NODE_ENV === 'production';
module.exports = {
  env: {
    baseURL: isProd
      ? 'http://18.181.147.191:3000'
      : 'http://localhost:3000',
  },
  typescript: {
    // !! 警告 !!
    // あなたのプロジェクトに型エラーがあったとしても、プロダクションビルドを正常に完了するために危険な許可をする。
    // !! 警告 !!
    ignoreBuildErrors: true
  }
};
