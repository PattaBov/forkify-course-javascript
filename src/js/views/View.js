import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  _data;
  #parentElement;
  #errorMessage;
  #message;

  constructor(parentEl, errorMessage, message) {
    this.#parentElement = parentEl;
    this.#errorMessage = errorMessage;
    this.#message = message;
  }

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this.#reload(markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this.#parentElement.querySelectorAll('*'));

    // Updates changed TEXT
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUTE
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _getParentElement() {
    return this.#parentElement;
  }

  #reload(markup) {
    this.#parentElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div> 
    `;
    this.#reload(markup);
  }

  renderError(message = this.#errorMessage) {
    const markup = `
        <div class="error">
            <div>
                <svg>
                <use href="${icons}#icon-alert-triangle"></use>
                </svg>
            </div>
            <p>${message}</p>
        </div>
    `;
    this.#reload(markup);
  }

  renderMessage(message = this.#message) {
    const markup = `
        <div class="message">
            <div>
            <svg>
                <use href="${icons}#icon-smile"></use>
            </svg>
            </div>
            <p>${message}</p>
        </div>
    `;
    this.#reload(markup);
  }
}
