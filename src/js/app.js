import AddImg from './AddImg.js';

const blockImg = document.getElementsByClassName('block-img')[0];
const elementError = document.getElementById('error-url');

const buttonSelectFile = document.querySelector('#button-select');
const elSelectFile = document.querySelector('#drop-file');

const addImg = new AddImg(blockImg, elementError);
//const server = 'http://localhost:7070';
const server = 'https://heroku-ahj-7-3.herokuapp.com/';


function loadFile(files) {
  for (const item of files) {
    // *****************************************
    const formData = new FormData();
    formData.append('file', item);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${server}`);

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const urlImg = `${server}/${xhr.response}`;
        addImg.createImg('nameImg', urlImg);
      }
    });
    xhr.send(formData);
  }
}

elSelectFile.addEventListener('click', () => {
  buttonSelectFile.value = null;
  buttonSelectFile.dispatchEvent(new MouseEvent('click'));
});

elSelectFile.addEventListener('dragover', (event) => {
  event.preventDefault();
});

elSelectFile.addEventListener('drop', (event) => {
  event.preventDefault();
  const files = Array.from(event.dataTransfer.files);
  loadFile(files);
});

buttonSelectFile.addEventListener('change', (event) => {
  const files = Array.from(event.currentTarget.files);
  loadFile(files);
});

blockImg.addEventListener('click', (event) => {
  if (event.target.className === 'close') {
    const itemElemnt = event.target.closest('.item-img-div');

    const params = new URLSearchParams();
    params.append('file', itemElemnt.querySelector('.item-img').src);

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${server}/?${params}`);
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
      }
      // TODO: handle other status
      console.log(xhr.responseText);
    });
    xhr.send();

    blockImg.removeChild(itemElemnt);
  }
});
