export function setupImageUpload(row) {
    const uploadBtn = row.querySelector('.upload-btn');
    const fileInput = row.querySelector('.image-upload');
    const img = row.querySelector('.cell-image');

    if (!uploadBtn || !fileInput || !img) return;

    uploadBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                img.src = e.target.result;
                img.style.display = 'block';
                img.classList.add('animate__animated', 'animate__zoomIn');
                uploadBtn.style.display = 'none';
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    img.addEventListener('click', () => {
        img.classList.add('animate__animated', 'animate__zoomOut');
        img.addEventListener('animationend', () => {
            img.style.display = 'none';
            img.classList.remove('animate__animated', 'animate__zoomOut');
            uploadBtn.style.display = 'block';
            fileInput.value = '';
        }, { once: true });
    });
}