import View from './View';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  constructor() {
    const parentEl = document.querySelector('.pagination');
    super(parentEl);
  }

  addHandlerClick(handler) {
    this._getParentElement().addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (this._data.page === 1 && numPages > 1) {
      return this.#getNextPageHTML();
    }
    // Last page
    if (this._data.page === numPages && numPages > 1) {
      return this.#getPrevPageHTML();
    }
    // Other page
    if (this._data.page < numPages) {
      return `
			${this.#getPrevPageHTML()}
			${this.#getNextPageHTML()}
      `;
    }

    // Page 1, and there are NO other pages
    return '';
  }

  #getNextPageHTML() {
    return `
		<button data-goto="${
      this._data.page + 1
    }" class="btn--inline pagination__btn--next">
			<span>Page ${this._data.page + 1}</span>
			<svg class="search__icon">
					<use href="${icons}#icon-arrow-right"></use>
			</svg>
		</button>
		`;
  }

  #getPrevPageHTML() {
    return `
		<button data-goto="${
      this._data.page - 1
    }" class="btn--inline pagination__btn--prev">
			<svg class="search__icon">
					<use href="${icons}#icon-arrow-left"></use>
			</svg>
			<span>Page ${this._data.page - 1}</span>
		</button>
		`;
  }
}

export default new PaginationView();
