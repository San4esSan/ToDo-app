import createElements from './createElements.js'
import serviceStorage from './serviceStorage.js'

const {createRow} = createElements;


const {addTaskData, setStorage} = serviceStorage;

const newId = () => Math.random().toString().substring(2, 10);

// удаляем со страницы (из таблицы) задачу
const delControl = (user, list) => {
    list.addEventListener('click', e => {
        if (e.target.closest('.btn-danger')) {
            if (!confirm('Вы уверены?')) {
                return;
            }

            if (e.target.closest('.table-light')) {
                const todoArray = JSON.parse(localStorage.getItem(user));
                const item = e.target.parentNode.parentNode;
                const neaList = todoArray.filter(obj => obj.id !== item.id);
                localStorage.setItem(user, JSON.stringify(neaList));
                e.target.closest('.table-light').remove();
            }
            if (e.target.closest('.table-success')) {
                const todoArray = JSON.parse(localStorage.getItem(user));
                const item = e.target.parentNode.parentNode;
                const neaList = todoArray.filter(obj => obj.id !== item.id);
                localStorage.setItem(user, JSON.stringify(neaList));
                e.target.closest('.table-success').remove();
            }
        }
        addNumber();
    });
};

// меняем статус задачи
const changeTaskStatus = (arr, item) => {
    arr.map(obj => {
        if (obj.id === item.id) {
            obj.status = !obj.status;
        }
    });
};

// меняем стили задачи (выполнено / не выполнено)
const completeControl = (user, list) => {
    list.addEventListener('click', (e) => {
        if (e.target.closest('.btn-success')) {
            if (e.target.closest('.table-light')) {
                e.target.closest('.table-light').className = 'tb table-success';
                e.target.closest('.table-success').children[1].className = 'text-decoration-line-through';
                e.target.closest('.table-success').children[2].textContent = 'Выполнена';

                const todoArray = JSON.parse(localStorage.getItem(user));
                const item = e.target.parentNode.parentNode;
                changeTaskStatus(todoArray, item);
                localStorage.setItem(user, JSON.stringify(todoArray));
            } else if (e.target.closest('.table-success')) {
                e.target.closest('.table-success').className = 'tb table-light';
                e.target.closest('.table-light').children[1].className = 'task';
                e.target.closest('.table-light').children[2].textContent = 'В процессе';

                const item = e.target.parentNode.parentNode;
                const todoArray = JSON.parse(localStorage.getItem(user));
                changeTaskStatus(todoArray, item);
                localStorage.setItem(user, JSON.stringify(todoArray));
            }
        }
        addNumber();
    });
};

// добавляем новую задачу на странице
const addTaskPage = (newTask, list) => {
    list.append(createRow(newTask));
};

// перерисовываем нумерацию задач в таблице
const addNumber = () => {
    const task = document.querySelectorAll('.tb');
    Array.from(task).forEach((elem, index) => {
        elem.firstChild.textContent = index + 1;
    });
};
addNumber();

const formControl = (user, form, list) => {
    // проверяем на пустоту поле ввода, активируем кнопку если поле не пустое
    form.addEventListener('input', () => {
        if (form[0].value.trim() !== '') {
            form.save.disabled = false;
        } else {
            form.save.disabled = true;
        }
    });

    // очищаем поле и блокируем кнопку
    form.addEventListener('click', e => {
        if (e.target.closest('.btn-warning')) {
            form.save.disabled = true;
        }
    });

    form.addEventListener('submit', e => {
        e.preventDefault();
        if (!form[0].value) {
            return;
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
    });
};

export default {
    delControl,
    changeTaskStatus,
    completeControl,
    addTaskPage,
    addNumber,
    formControl,
};
