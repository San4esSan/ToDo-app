'use strict';

let data = [];

{
    // получаем контейнер
    const appContainer = document.querySelector('.app-container');
    appContainer.classList.add('vh-100', 'w-100', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-column')

    const newId = () => Math.random().toString().substring(2, 10);

    // добавляем новую задачу в массив задач
    const addTaskData = task => {
        data.push(task);
    }

    // записываем в массив все задачи из localStorage
    const getStorage = (user) => {
        const taskLocalStorage = localStorage.getItem(user);
        if (taskLocalStorage !== null) {
            return data = JSON.parse(taskLocalStorage);
        }
        return data = [];
    };

    // записываем в localStorage задачу
    const setStorage = (user, newTask) => {
        const task = getStorage(user);
        task.push(newTask);
        localStorage.setItem(user, JSON.stringify(task));
    };

    // удаляем из localStorage задачу по id
    const removeStorage = (user, idTask) => {
        const taskAll = getStorage(user);

        const newList = [];
        for (let i = 0; i < idTask.length; i++) {
            for (let k = 0; k < taskAll.length; k++) {
                if (taskAll[k]['id'] === idTask[i]) {
                    newList.push(taskAll[k]);
                }
            }
        }
        localStorage.setItem(user, JSON.stringify(newList));
    };

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

        return form
    }

    // шаблон создания кнопок
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

    // создаем обертку для таблицы
    const createWrapper = () => {
        const tableWrapper = document.createElement('div');
        tableWrapper.classList.add('table-wrapper');
        return tableWrapper;
    }

    // создаем таблицу
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

    // добавляем в контейнер все ранее созданное
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
        btnDel.classList.add('btn','btn-danger', 'me-3');
        btnDel.textContent = 'Удалить'

        const btnSuccess = document.createElement('button');
        btnSuccess.classList.add('btn', 'btn-success');
        btnSuccess.textContent = 'Завершить'

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
    }

    const renderTascs = (elem, data) => {
        const allRow = data.map(createRow);
        elem.append(...allRow);
    };

    // удаляем со страницы (из таблицы) задачу
    const delControl = (user, list) => {
        list.addEventListener('click', e => {
            if (e.target.closest('.btn-danger')) {
                if (!confirm('Вы уверены?')) {
                    return
                }

                if (e.target.closest('.table-light')) {
                    const todoArray = JSON.parse(localStorage.getItem(user))
                    const item = e.target.parentNode.parentNode
                    const neaList = todoArray.filter(obj => obj.id !== item.id)
                    localStorage.setItem(user, JSON.stringify(neaList))
                    e.target.closest('.table-light').remove();
                }
                if (e.target.closest('.table-success')) {
                    const todoArray = JSON.parse(localStorage.getItem(user))
                    const item = e.target.parentNode.parentNode
                    const neaList = todoArray.filter(obj => obj.id !== item.id)
                    localStorage.setItem(user, JSON.stringify(neaList))
                    e.target.closest('.table-success').remove();

                }
            }
            addNumber()
        });
    }

    // меняем статус задачи
    const changeTaskStatus = (arr, item) => {
        arr.map(obj => {
            if (obj.id === item.id) {
                obj.status = !obj.status
            }
        })
    }

    // меняем стили задачи (выполнено / не выполнено)
    const completeControl = (user, list) => {
        list.addEventListener('click', (e) => {
            if (e.target.closest('.btn-success')) {
                if (e.target.closest('.table-light')) {
                    e.target.closest('.table-light').className = 'tb table-success';
                    e.target.closest('.table-success').children[1].className = 'text-decoration-line-through';
                    e.target.closest('.table-success').children[2].textContent = 'Выполнена';

                    const todoArray = JSON.parse(localStorage.getItem(user))
                    const item = e.target.parentNode.parentNode
                    changeTaskStatus(todoArray, item)
                    localStorage.setItem(user, JSON.stringify(todoArray));
                } else if (e.target.closest('.table-success')) {
                    e.target.closest('.table-success').className ='tb table-light';
                    e.target.closest('.table-light').children[1].className = 'task';
                    e.target.closest('.table-light').children[2].textContent = 'В процессе';

                    const item = e.target.parentNode.parentNode
                    const todoArray = JSON.parse(localStorage.getItem(user))
                    changeTaskStatus(todoArray, item)
                    localStorage.setItem(user, JSON.stringify(todoArray));
                }
            }
            addNumber()
        })
    }

    // добавляем новую задачу на странице
    const addTaskPage = (newTask, list) => {
        list.append(createRow(newTask));
    }

    // перерисовываем нумерацию задач в таблице
    const addNumber = () => {
        const task = document.querySelectorAll('.tb');
        console.log(task)
        Array.from(task).forEach((elem, index) => {
            elem.firstChild.textContent = index+1;
        })
    }
    addNumber()

    const formControl = (user, form, list) => {
        // проверяем на пустоту поле ввода, активируем кнопку если поле не пустое
        form.addEventListener('input', () => {
            if (form[0].value.trim() !== "") {
                form.save.disabled = false;
            } else {
                form.save.disabled = true;
            }
        })

        // очищаем поле и блокируем кнопку
        form.addEventListener('click', e => {
            if (e.target.closest('.btn-warning')) {
                form.save.disabled = true;
            }
        })

        form.addEventListener('submit', e => {
            e.preventDefault();
            if (!form[0].value) {
                return
            }

            // получаем данные из формы
            const formData = new FormData(e.target);
            const {id = newId(), task, status = false} = Object.fromEntries(formData);
            addTaskPage({id, task, status}, list);
            addTaskData({id, task, status});
            setStorage(user, {id, task, status});

            // после отправки данных очищаем форму и блокируем кнопку
            form.reset();
            form.save.disabled = true;
        })
    }

    const init = (selectorApp, user) => {
        const app = document.querySelector(selectorApp);
        const data = getStorage(user);
        const {list, form} =  renderToDo(app)

        renderTascs(list, data);
        delControl(user, list, data);
        completeControl(user, list, data);
        formControl(user, form, list)
    }

    window.toDoInit = init;
}