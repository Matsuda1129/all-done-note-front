import aws from 'aws-sdk';

export default async function handler(req, res) {

  const key = `${req.query.file}`;

  const s3 = new aws.S3();
  const post = await s3.createPresignedPost({
    Bucket: process.env.NEXT_PUBLIC_BUCKET,
    Fields: {
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
