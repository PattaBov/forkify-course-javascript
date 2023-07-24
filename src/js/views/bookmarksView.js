import View from './View';
import previewView from './previewView';

class BookmarksView extends View {
  constructor() {
    const parentEl = document.querySelector('.bookmarks__list');
    const errorMessage =
      'No bookmarks yet. Find a nice recipe and bookmark it :)';
    super(parentEl, errorMessage);
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data.map(bookmark => previewView.render(bookmark, false));
  }
}

export default new BookmarksView();
