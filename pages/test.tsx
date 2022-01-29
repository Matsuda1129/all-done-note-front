import React from 'react';

export default function Test() {
  const OnFileSelect = async (e) => {
    // ファイルリストを取得
    console.log(e);
    let fileList = e.target.files;
    console.log(fileList);

    // ファイルの数を取得
    let fileCount = fileList.length;

    // HTML文字列の生成
    let fileListBody =
      '選択されたファイルの数 = ' + fileCount + '<br/><br/>¥r¥n';

    // 選択されたファイルの数だけ処理する
    for (let i = 0; i < fileCount; i++) {
      // ファイルを取得
      let file = fileList[i];

      // ファイルの情報を文字列に格納
      fileListBody += '[ ' + (i + 1) + 'ファイル目 ]<br/>¥r¥n';
      fileListBody += 'name             = ' + file.name + '<br/>¥r¥n';
      fileListBody += 'type             = ' + file.type + '<br/>¥r¥n';
      fileListBody += 'size             = ' + file.size + '<br/>¥r¥n';
      fileListBody +=
        'lastModifiedDate = ' + file.lastModifiedDate + '<br/>¥r¥n';
      fileListBody += 'lastModified     = ' + file.lastModified + '<br/>¥r¥n';
      fileListBody += '<br/>¥r¥n';
    }

    // 結果のHTMLを流し込む
    document.getElementById('ID001').innerHTML = fileListBody;
  };

  return (
    <div>
      <input type='file' onChange={OnFileSelect} multiple />
      <ul id='ID001'></ul>
    </div>
  );
}
