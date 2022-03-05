import aws from 'aws-sdk';

aws.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_SECRET_KEY,
  region: process.env.NEXT_PUBLIC_REGION,
  signatureVersion: 'v4',
});

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

  if (upload.ok) {
    console.log('Uploaded successfully!');
  } else {
    console.error('Upload failed.');
  }
}

export async function uploadWill(e, username) {
  const file = e[0];
  const res = await fetch(`/api/upload-url?file=will/${username}:will`);
  const { url, fields } = await res.json();
  const formData: any = new FormData();
  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const upload = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (upload.ok) {
    console.log('Uploaded successfully!');
  } else {
    console.error('Upload failed.');
  }
}

export async function deleteWill(username) {
  const params = {
    Bucket: process.env.NEXT_PUBLIC_BUCKET,
    Key: `will/${username}:will`,
  };

  const s3 = new aws.S3();
  await s3.deleteObject(params, function (err, data) {
    if (err) console.log(err);
    else console.log('### delete image ok'); // successful response
  });
}

export async function uploadPicture(files, username, pictureNames) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filename = pictureNames[i];
    const res = await fetch(
      `/api/upload-url?file=post/${username}/${filename}`
    );
    const { url, fields } = await res.json();
    const formData: any = new FormData();
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const upload = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (upload.ok) {
      console.log('Uploaded successfully!');
    } else {
      console.error('Upload failed.');

      return false;
    }
  }
}

export async function deletePicture(files, username) {
  console.log(files);
  for (let i = 0; i < files.length; i++) {
    const params = {
      Bucket: process.env.NEXT_PUBLIC_BUCKET,
      Key: `post/${username}/${files[i]}`,
    };
    const s3 = new aws.S3();
    await s3.deleteObject(params, function (err, data) {
      if (err) console.log(err);
      else console.log('### delete image ok'); // successful response
    });
  }
}
