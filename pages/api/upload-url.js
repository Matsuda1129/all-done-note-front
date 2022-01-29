import aws from 'aws-sdk';

export default async function handler(req, res) {
  aws.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_KEY,
    region: process.env.NEXT_PUBLIC_REGION,
    signatureVersion: 'v4',
  });

  console.log(req.query.file);
  const key = `dir/${req.query.file}`;

  const s3 = new aws.S3();
  const post = await s3.createPresignedPost({
    Bucket: process.env.NEXT_PUBLIC_BUCKET,
    Fields: {
      // key: req.query.file,
      key: key,
    },
    Key: key,
    Expires: 60, // seconds
    Conditions: [
      ['content-length-range', 0, 1048576], // up to 1 MB
    ],
  });
  res.status(200).json(post);
}
