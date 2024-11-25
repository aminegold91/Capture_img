
    // الحصول على الفيديو وعناصر الكانفاس
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    
    let imgpro;
    
    if(localStorage.cavasora != null){
      imgpro = JSON.parse(localStorage.cavasora)
    }
    else{
      imgpro = [];
    }
    
    // طلب الوصول إلى الكاميرا
    navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" }
    })
    .then((stream) => {
      video.srcObject = stream;

      // انتظر حتى يتم تشغيل الفيديو
      video.onloadedmetadata = () => {
        // اضبط أبعاد الكانفاس
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // التقط صورة فورًا عند تحميل الصفحة
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // يمكنك حفظ الصورة أو عرضها هنا
        const imageData = canvas.toDataURL('image/png');
        console.log(imageData);
        let obj = {
          imageData :imageData
        }
        imgpro.push(obj);
        localStorage.setItem('cavasora',JSON.stringify(imgpro));
        
        for(let i=0;i<imgpro.length;i++){
          let box = document.querySelector('.im');
          box.innerHTML += `
       <img src="${imgpro[i].imageData}">
                  `;
        }
        
      };
    })
    .catch((err) => {
      console.error('Error accessing camera:', err);
    });
    
    
    
  
  
