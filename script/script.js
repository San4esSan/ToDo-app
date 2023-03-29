'use strict';

let data = [];

{
    const newId = () => Math.random().toString().substring(2, 10);

    const addTaskData = task => {
        data.push(task);
    }

    const getStorage = (user) => {
        const taskLocalStorage = localStorage.getItem(user);
        if (taskLocalStorage !== null) {
            return data = JSON.parse(taskLocalStorage);
        }
        return data = [];
    };

    const setStorage = (user, newTask) => {
        const task = getStorage(user);
        task.push(newTask);
        localStorage.setItem(user, JSON.stringify(task));
    };

    const removeStorage = (user, idTask) => {
        const taskAll = getStorage(user);

        const newList = [];
        for (let i = 0; i < idTask.length; i++) {
            for (let k = 0; k < taskAll.length; k++) {
                if (taskAll[k]['task'] === idTask[i]) {
                    newList.push(taskAll[k]);
                }
            }
        }
        localStorage.setItem(user, JSON.stringify(newList));
    };

    const appContainer = document.querySelector('.app-container');
    appContainer.classList.add('vh-100', 'w-100', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-column')

    const createTitle = () => {
        const title = document.createElement('h3');
        title.textContent = 'Todo App';

        return title;
    };

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
        return form
    }

    const createButtonsGroup = params => {
        const btns = params.map(({className, type, text}) => {
            const button = document.createElement('button');
            button.className = className;
            button.type = type;
            button.textContent = text;
            return button;
        })
        return {btns}
    }

    const createWrapper = () => {
        const tableWrapper = document.createElement('div');
        tableWrapper.classList.add('table-wrapper');
        return tableWrapper;
    }

    const createTable = () => {
        const table = document.createElement('table');
        table.classList.add('table', 'table-hover', 'table-bordered')

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
    }

    const renderToDo = (app) => {
        const title = createTitle();
        const form = createForm();
        const table = createTable();

        const wrapper = createWrapper();
        wrapper.append(table)

        app.append(title, form, wrapper);

        return {
            list: table.tbody,
            form,
        };
    };

    const createRow = ({task}) => {
        const table = document.querySelector('table');
        const tr = document.createElement('tr');
        tr.classList.add('table-light');
        tr.id = newId();
        const tdNumber = document.createElement('td');
        tdNumber.classList.add('number');
        tdNumber.textContent = table.rows.length;
        const tdTasc = document.createElement('td');
        tdTasc.classList.add('task');
        tdTasc.textContent = task;
        const tdStatus = document.createElement('td');
        tdStatus.classList.add('status');
        tdStatus.textContent = 'В процессе';
        const tdActions = document.createElement('td');
        const btnActions = createButtonsGroup([
            {
                className: 'btn btn-danger me-3',
                type: 'button',
                text: 'Удалить',
            },
            {
                className: 'btn btn-success',
                type: 'button',
                text: 'Завершить',
            },
        ]);

        tdActions.append(...btnActions.btns);

        tr.append(tdNumber, tdTasc, tdStatus, tdActions);
        return tr;
    }

    const renderTascs = (elem, data) => {
        const allRow = data.map(createRow);
        elem.append(...allRow);
    };

    const delControl = (user, list) => {
        list.addEventListener('click', e => {
            if (e.target.closest('.btn-danger')) {
                if (confirm('Вы уверены?')) {
                    if (e.target.closest('.table-light')) {
                        e.target.closest('.table-light').remove();
                        addNumber()
                        delRowLocalStorage(user)
                    } else if (e.target.closest('.table-success')) {
                        e.target.closest('.table-success').remove();
                        addNumber()
                        delRowLocalStorage(user)
                    }
                }

            }
        });
    }

    const completeControl = (user, list) => {
        list.addEventListener('click', e => {
            if (e.target.closest('.btn-success')) {
                if (e.target.closest('.table-light')) {
                    e.target.closest('.table-light').className = 'table-success';
                    e.target.closest('.table-success').children[1].className = 'text-decoration-line-through';
                    e.target.closest('.table-success').children[2].textContent = 'Выполнена';
                } else if (e.target.closest('.table-success')) {
                    e.target.closest('.table-success').className ='table-light';
                    e.target.closest('.table-light').children[1].className = 'task';
                    e.target.closest('.table-light').children[2].textContent = 'В процессе';
                }
            }
        });
        addNumber()
    }

    const addTaskPage = (newTask, list) => {
        list.append(createRow(newTask));
    }

    const addNumber = () => {
        const task = document.querySelectorAll('.table-light');
        Array.from(task).forEach((elem, index) => {
            elem.firstChild.textContent = index+1;
        })
    }
    addNumber()

    const delRowLocalStorage = (user) => {
        const taskTableLight = document.querySelectorAll('.table-light');
        const taskTableSuccess = document.querySelectorAll('.table-success');
        const idTask = [];
        for (const key of Array.from(taskTableLight)) {
            if (key.id) {
                idTask.push((key.children[1].textContent))
            }
        }
        for (const key of Array.from(taskTableSuccess)) {
            idTask.push((key.children[1].textContent))
        }
        removeStorage(user, idTask);
    }

    const formControl = (user, form, list) => {
        form.addEventListener('change', e => {
            if (e.target.value.trim() !== "") {
                form.save.disabled = false;
            }
        })

        form.addEventListener('click', e => {
            if (e.target.closest('.btn-warning')) {
                form.save.disabled = true;
            }
        })

        form.addEventListener('submit', e => {
            e.preventDefault();

            const formData = new FormData(e.target);
            const newTask = Object.fromEntries(formData);
            addTaskPage(newTask, list);
            addTaskData(newTask);
            setStorage(user, newTask);
            form.reset();
            form.save.disabled = true;
        })
    }

    const init = (selectorApp, user) => {
        const app = document.querySelector(selectorApp);
        const data = getStorage(user);
        const {list, form} =  renderToDo(app)

        renderTascs(list, data);

        delControl(user, list);
        completeControl(user, list);
        formControl(user, form, list)
    }

    window.toDoInit = init;
}