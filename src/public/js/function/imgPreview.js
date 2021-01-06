// Show preview admin image
const fileInput = document.getElementById('fileInput');
const imgPreview = document.getElementById('imgPreview');
const btnDeleteImg = document.getElementById('btnDeleteImg');

var currentImg = imgPreview.src;
var file, srcImgTem;

fileInput.addEventListener('change', () => {
    files = event.target.files;
    if (files.length > 0) {
        if(files[0].type && files[0].type.split('/')[0] == 'image') {
        
            srcImgTemp = URL.createObjectURL(files[0]);
            imgPreview.src = srcImgTemp;

            if(btnSaveAvt) {
                btnSaveAvt.removeAttribute("hidden");
            }
        }
                
        else { 
                fileInput.value = '';
                imgPreview.src = currentImg;
                if(btnSaveAvt) {
                    btnSaveAvt.setAttribute("hidden", "hidden");
                }
            }   
    }
})

btnDeleteImg.addEventListener('click', () => {
    imgPreview.src = currentImg;
    fileInput.value = '';
    if(btnSaveAvt && currentImg != imgPreview.src) {
        btnSaveAvt.removeAttribute("hidden");
    } else {
        btnSaveAvt.setAttribute("hidden", "hidden");
    }
})
