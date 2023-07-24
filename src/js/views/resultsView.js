import View from './View';
import previewView from './previewView';

class ResultsView extends View {
  constructor() {
    const parentEl = document.querySelector('.results');
    const errorMessage = 'No recipes found for your query. Please try again!';
    const message =
      'Start by searching for a recipe or an ingredient. Have fun!';
    super(parentEl, errorMessage, message);
  }

  _generateMarkup() {
    return this._data.map(res => previewView.render(res, false));
  }
}

export default new ResultsView();
