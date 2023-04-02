// создаем заголовок
const createTitle = () => {
    const title = document.createElement('h3');
    title.textContent = 'Todo App';
    return title;
};

// создаем форму
const createForm = () => {
    const form = document.createElement('form');
    form.classList.add('d-flex', 'align-items-center', 'mb-3');
    form.insertAdjacentHTML('beforeend', `
        <label class="form-group me-3 mb-0">
          <input type="text" class="form-control" name="task" placeholder="ввести задачу" required>
        </label>
        <button type="submit" class="btn btn-primary me-3" name="save" >
          Сохранить
        </button>
        <button type="reset" class="btn btn-warning" name="clear">
          Очистить
        </button>
  `);

    form.save.disabled = true;

    return form;
};

// создаем обертку для таблицы
const createWrapper = () => {
    const tableWrapper = document.createElement('div');
    tableWrapper.classList.add('table-wrapper');
    return tableWrapper;
};

// создаем таблицу
const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-hover', 'table-bordered');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
          <tr>
            <th>№</th>
            <th>Задача</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        `);

    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;
    return table;
};

// создаем верстку задачи
const createRow = (newTask) => {
    const table = document.querySelector('table');
    const tr = document.createElement('tr');
    tr.classList.add('tb', 'table-light');
    tr.id = newTask.id;
    const tdNumber = document.createElement('td');
    tdNumber.classList.add('number');
    tdNumber.textContent = table.rows.length;
    const tdTasc = document.createElement('td');
    tdTasc.classList.add('task');
    tdTasc.textContent = newTask.task;
    const tdStatus = document.createElement('td');
    tdStatus.textContent = 'В процессе';
    const tdActions = document.createElement('td');

    const btnDel = document.createElement('button');
    btnDel.classList.add('btn', 'btn-danger', 'me-3');
    btnDel.textContent = 'Удалить';

    const btnSuccess = document.createElement('button');
    btnSuccess.classList.add('btn', 'btn-success');
    btnSuccess.textContent = 'Завершить';

    if (newTask.status === true) {
        tr.className = 'tb table-success';
        tdTasc.className = 'text-decoration-line-through';
        tdStatus.textContent = 'Выполнена';
    } else {
        tr.className = 'tb table-light';
        tdTasc.className = 'task';
        tdStatus.textContent = 'В процессе';
    }

    tdActions.append(btnDel, btnSuccess);
    tr.append(tdNumber, tdTasc, tdStatus, tdActions);

    return tr;
};

export default {
    createTitle,
    createForm,
    createWrapper,
    createTable,
    createRow,
};
