import createElements from './createElements.js';

const {
    createTitle,
    createForm,
    createWrapper,
    createTable,
    createRow,
} = createElements;

// добавляем в контейнер все ранее созданное
const renderToDo = (app) => {
    const title = createTitle();
    const form = createForm();
    const table = createTable();

    const wrapper = createWrapper();
    wrapper.append(table);

    app.append(title, form, wrapper);

    return {
        list: table.tbody,
        form,
    };
};

const renderTascs = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
};

export default {
    renderToDo,
    renderTascs,
};
