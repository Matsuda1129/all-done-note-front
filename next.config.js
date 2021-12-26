// 各環境のenvファイルを読み込む
const isProd = process.env.NODE_ENV === 'production';
module.exports = {
  images: {
    domains: [
      'all-done-note-dev-picture-bucket.s3.ap-northeast-1.amazonaws.com',
    ],
  },
};
