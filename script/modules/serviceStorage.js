let data = [];
// добавляем новую задачу в массив задач
const addTaskData = task => {
  data.push(task);
};

// записываем в массив все задачи из localStorage
const getStorage = (user, data) => {
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

export default {
  addTaskData,
  getStorage,
  setStorage,
  removeStorage,
};
