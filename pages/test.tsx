import React, { useState } from 'react';
import Avatar from 'react-avatar';

export default function Test() {
  const imgurl =
    'https://all-done-note-dev-picture-bucket.s3.ap-northeast-1.amazonaws.com/treeIcon.jpg';

  const [icon, setIcon] = useState<File | null>(null);
  const [previewIcon, setPreviewIcon] = useState<File | null>(null);

  return (
    <div>
      <Avatar
        size='160'
        name='アイコン'
        round
        color='#ddd'
        alt='アイコン'
        src={imgurl}
      />
    </div>
  );
}
