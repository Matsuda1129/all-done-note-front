import aws from 'aws-sdk';

export async function uploadPhoto(e) {
  const file = e.target.files[0];
  const filename = encodeURIComponent(file.name);
  const res = await fetch(`/api/upload-url?file=${filename}`);
  const { url, fields } = await res.json();
  const formData: any = new FormData();

  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const upload = await fetch(url, {
    method: 'POST',
    body: formData,
  });
  console.log(upload);

  if (upload.ok) {
    console.log(upload);
    console.log('Uploaded successfully!');
  } else {
    console.error('Upload failed.');
  }
}

export async function deletePhoto(e) {
  aws.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION,
    signatureVersion: 'v4',
  });
  const file = e.target.files[0];
  console.log(file);
  const filename = encodeURIComponent(file.name);

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: filename,
  };

  const s3 = new aws.S3();
  await s3.deleteObject(params, function (err, data) {
    if (err) console.log(err);
    else console.log('### delete image ok'); // successful response
  });
}

export async function deleteProfilephoto(filename) {
  aws.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION,
    signatureVersion: 'v4',
  });
  // const file = e.target.files[0];
  // console.log(file);
  // const filename = encodeURIComponent(file.name);

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: filename,
  };

  const s3 = new aws.S3();
  await s3.deleteObject(params, function (err, data) {
    if (err) console.log(err);
    else console.log('### delete image ok'); // successful response
  });
}
