// 各環境のenvファイルを読み込む
const isProd = process.env.NODE_ENV === 'production';
module.exports = {
  env: {
    baseURL: isProd ? 'http://localhost:8000' : 'http://localhost:8000',
  },
};
