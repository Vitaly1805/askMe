let modalWindow;
let bodyBackground;

export function createModal(title, content) {
  modalWindow = document.createElement('div');
  modalWindow.classList.add('modal');
  modalWindow.innerHTML = `<h1 class="modal__title">${title}</h1>` + content;
  document.body.append(modalWindow);

  createDarkBackgroundForBody();
  document.addEventListener('keydown', (event) => {
    if(event.code === 'Escape') {
      delModal();
    }
  }, {once: true});
}

function createDarkBackgroundForBody() {
  bodyBackground = document.createElement('div');
  bodyBackground.classList.add('mode-modal');
  document.body.append(bodyBackground);

  bodyBackground.addEventListener('click', delModal);
}

export function delModal() {
  modalWindow.remove();
  bodyBackground.remove();
}
