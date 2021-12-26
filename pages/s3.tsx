import { deletePhoto, uploadPhoto } from '../repositories/s3';

export default function Upload() {
  const imgurl =
    'https://all-done-note-dev-picture-bucket.s3.ap-northeast-1.amazonaws.com/treeIcon.jpg';

  return (
    <>
      <p>Upload a .png or .jpg image (max 1MB).</p>
      <div>{process.env.FAVORITE_POKEMON}</div>
      <img src={imgurl}></img>
      <input
        onChange={uploadPhoto}
        type='file'
        accept='image/png, image/jpeg'
      />
      <input
        onChange={deletePhoto}
        type='file'
        accept='image/png, image/jpeg'
      />
    </>
  );
}
