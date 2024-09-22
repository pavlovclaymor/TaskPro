function CreateTask() {
  const TaskProBd = JSON.parse(localStorage.getItem('TaskProBd'))
  const { online } = TaskProBd

  const Title = document.querySelector('#title').value.trim()
  const Description = document.querySelector('#description').value.trim()

  if (!Title || !Description) {
    alert('Campos vazios')
  } else {
    const task = {
      id: Math.floor(Math.random() * 1e4),
      title: Title,
      description: Description,
      timestamp:
        new Date().getDate() +
        '/' +
        (new Date().getMonth() + 1) +
        '/' +
        new Date().getFullYear(),
      state: true,
    }

    online.tasks.push(task)
    let index = TaskProBd.users.findIndex((obj) => obj.id == online.id)
    TaskProBd.users[index] = online
    localStorage.setItem('TaskProBd', JSON.stringify(TaskProBd))
    alert('Tarefa criada com sucesso')
    window.location.reload()
  }
}
