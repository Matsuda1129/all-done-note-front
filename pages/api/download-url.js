import aws from 'aws-sdk';

export default async function handler(req, res) {
  const key = req.query.file;
  const s3 = new aws.S3();

  const params = {
    Bucket: process.env.NEXT_PUBLIC_BUCKET,
    Key: key,
  };

  s3.getObject(params)
    .createReadStream()
    .on('error', (err) => {
      res.status(500).send({ error: err });
    })
    .pipe(res);
}
