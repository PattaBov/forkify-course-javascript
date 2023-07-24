import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

import fracty from 'fracty';

class AddRecipeView extends View {
  #window = document.querySelector('.add-recipe-window');
  #overlay = document.querySelector('.overlay');
  #btnOpen = document.querySelector('.nav__btn--add-recipe');
  #btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    const parentEl = document.querySelector('.upload');
    super(parentEl, '', 'Recipe was successfully uploaded :)');
    this.#addHandlerShowWindow();
    this.#addHandlerHideWindow();
  }

  #addHandlerShowWindow() {
    this.#btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  #addHandlerHideWindow() {
    this.#btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this.#overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._getParentElement().addEventListener('submit', function (e) {
      e.preventDefault();
      const data = Object.fromEntries([...new FormData(this)]);
      handler(data);
    });
  }

  toggleWindow() {
    this.#overlay.classList.toggle('hidden');
    this.#window.classList.toggle('hidden');
  }
}

export default new AddRecipeView();
