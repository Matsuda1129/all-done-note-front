// 各環境のenvファイルを読み込む
const isProd = process.env.NODE_ENV === 'production';
module.exports = {
  env: {
    Image_S3:
      'https://all-done-note-dev-picture-bucket.s3.ap-northeast-1.amazonaws.com/',
  },
  reactStrictMode: true,
  webp: {
    preset: 'default',
    quality: 100,
  },
  images: {
    domains: [
      'all-done-note-dev-picture-bucket.s3.ap-northeast-1.amazonaws.com',
    ],
  },
  i18n: {
    locales: ['en', 'it'],
    defaultLocale: 'en',
  },
};
