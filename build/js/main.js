const dropZone = document.querySelector('.block__upload-area');

const addEventClass = () => {
    dropZone.classList.add('dragover');
};
const removeEventClass = () => {
    dropZone.classList.remove('dragover');
    dropZone.style.transition = '.2s';
};

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault(); 
    addEventClass();
});
dropZone.addEventListener('dragenter', (e) => {
    e.preventDefault();
    addEventClass();
});
dropZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    removeEventClass();
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    removeEventClass();

    const files = e.dataTransfer.files;

    if (files[0].size <= 5242880 && (files[0].type == 'image/jpeg' || files[0].type == 'image/jpg' || files[0].type == 'image/png')) {
        uploadFile(files[0]);
    } else {
        alert('Please upload picture up to 5Mb and file should be Jpeg, Jpg, Png.');
    }
});

const uploadFile = file => {
    let url = '../server/server.php';
    let formData = new FormData();
    const loader = document.querySelector('.loader');
    const dragNDropBlock = document.querySelector('.block');

    formData.append('image', file);
    dragNDropBlock.style.display = 'none';
    loader.style.display = 'block';
    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(res => {
        console.log(res.data.display_url);
        document.body.innerHTML = `
        <div class="uploaded">
            <img class="uploaded__icon"  src="./img/check.svg" alt="check icon">
            <h1>Uploaded Successfully!</h1>
            <img class="uploaded__img" src="${res.data.display_url}" alt="image">
            <div class="uploaded__input-area">
                <input class="uploaded__input-area-input" type="text" id="img-link" value="${res.data.display_url}">
                <button class="uploaded__input-area-btn block__main-btn">  Copy Link  </button>
            </div>
        </div>
        `;
        copyButtonInit();
    })
    .catch(() => { 
        dragNDropBlock.style.display = '';
        loader.style.display = '';
        alert('Something goes wrong, try again'); 
    })
};

// copy button 
const copyButtonInit = () => {
    const copyButton = document.querySelector('.uploaded__input-area-btn');

    copyButton.addEventListener('click', () => {
        const linkValue = document.querySelector('.uploaded__input-area-input');
        linkValue.select();
        document.execCommand("copy");
        copyButton.innerHTML = 'Copied!';
        copyButton.style.background = '#59a1ff'; 
    });
};
