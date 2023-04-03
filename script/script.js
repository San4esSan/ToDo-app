import control from './modules/control.js'
import render from './modules/render.js'
import serviceStorage from './modules/serviceStorage.js'

const {delControl, completeControl, formControl, addNumber} = control;
const {renderToDo, renderTascs} = render;
const {getStorage} = serviceStorage;

{
  // получаем контейнер
  const appContainer = document.querySelector('.app-container');
  appContainer.classList.add('vh-100', 'w-100', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-column');

  const init = (selectorApp, user) => {
    const app = document.querySelector(selectorApp);
    const data = getStorage(user);
    const {list, form} = renderToDo(app);

    renderTascs(list, data);
    delControl(user, list, data);
    completeControl(user, list, data);
    formControl(user, form, list);
    addNumber();
  };

  window.toDoInit = init;
}
