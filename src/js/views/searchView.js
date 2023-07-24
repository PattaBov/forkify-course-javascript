import View from './View';

class SearchView extends View {
  constructor() {
    const parentEl = document.querySelector('.search');
    super(parentEl);
  }

  getQuery() {
    const query =
      this._getParentElement().querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._getParentElement().querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._getParentElement().addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
