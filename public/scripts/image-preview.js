const imgPickerElement = document.querySelector('#image-preview-control input');
const imgPreviewElement = document.querySelector('#image-preview-control img');

function updateImagePreview(event){
    const files = imgPickerElement.files;

    if(!files || files.length === 0){
        imgPreviewElement.style.display = 'none';
        return;
    }

    const pickedFile = files[0]; 
    
    const fileURL = URL.createObjectURL(pickedFile);
    imgPreviewElement.src = fileURL;
    imgPreviewElement.style.display = 'block';

}

imgPickerElement.addEventListener('change', updateImagePreview);
