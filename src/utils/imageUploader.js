function ImageUploadWithProgress(img, callback) {
    var xhr = new XMLHttpRequest();
  
    xhr.onload = function (e) {
      try {
        callback({
          progess: 100,
          url: JSON.parse(xhr.responseText),
        });
      } catch (err) {
        console.log(err);
        console.log(xhr.responseText);
      }
    };
  
    xhr.upload.onprogress = function (e) {
      var done = e.position || e.loaded,
        total = e.totalSize || e.total;
      var present = Math.floor((done / total) * 100);
      callback({
        progess: present,
        url: xhr.responseText,
      });
    };
  
    xhr.open(
      'POST',
      'https://api.imgbb.com/1/upload?key=a93e83eb482f9d317720c75c023d9874',
      true
    );
  
    xhr.send(img);
  }
  export default ImageUploadWithProgress