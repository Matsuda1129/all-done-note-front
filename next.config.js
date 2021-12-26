// 各環境のenvファイルを読み込む
let alive;
const isProd = process.env.NODE_ENV === 'production';
module.exports = {
  env: {
    baseURL: isProd ? 'http://localhost:8000' : 'http://localhost:8000',
    ACCESS_KEY: '',
    SECRET_KEY: '',
    REGION: 'ap-northeast-1',
    BUCKET_NAME: 'all-done-note-dev-picture-bucket',
    Image_S3:
      'https://all-done-note-dev-picture-bucket.s3.ap-northeast-1.amazonaws.com/',
    FAVORITE_POKEMON: 'pppppp',
  },
  images: {
    domains: [
      'all-done-note-dev-picture-bucket.s3.ap-northeast-1.amazonaws.com',
    ],
  },
};
