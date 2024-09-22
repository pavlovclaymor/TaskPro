function DataHomePage() {
  const TaskProBd = JSON.parse(localStorage.getItem('TaskProBd'))
  const { users, online } = TaskProBd

  ListTaskInHomePage(users, online)
}

function ListTaskInHomePage(allUsers, online) {
  const ul = document.querySelector('.list-task')
  allUsers.forEach((user) => {
    if (user.id == online.id) {
      if (user.tasks != -1) {
        user.tasks.forEach((task) => {
          let timberclass
          let text
          if (task.state == false) {
            timberclass = 'btn-paiding'
            text = 'Paiding'
          } else {
            timberclass = 'btn-state'
            text = 'Paid'
          }
          const li = document.createElement('li')
          li.setAttribute('class', 'task')
          li.setAttribute('data-task-id', task.id)
          li.innerHTML = `
          <div class="contenter">
            <div class="content-principal">
              <strong>${user.firstname[0].toUpperCase()}${user.lastname[0].toUpperCase()}${task.id}</strong>
              <strong class='title'>${task.title.slice(0,3)}...</strong>
              <b>${task.timestamp}</b>
              <b>${task.description.slice(0,4)}...</b>
              <div class="${timberclass}" onclick='isSent(${task.id})'>
                <i class="bi bi-record-fill"></i>
                <span>${text}</span>
              </div>
              <i class="bi bi-chevron-down" onclick='DashBord(${task.id})'></i>
            </div>
             <div id="description-all-${task.id}" class="description-all" style="display: none">
              <div class="description">
                <div class="description-txt">
                    <h1>${task.title}</h1>
                    
                    <strong>${task.description}</strong>
                  </div>
                <div class="btn-edit-remove">
                  <button onclick='EditTask(${task.id})'>Editar</button>
                  <button onclick='Remover(${task.id})'>Remover</button>
                </div>
              </div>
            </div>
         </div>  
          `
          ul.appendChild(li)
        })
      }
    }
  })
}

function DashBord(taskId) {
  const allDescriptions = document.querySelectorAll('.description-all')

  allDescriptions.forEach((desc) => {
    if (desc.id === `description-all-${taskId}`) {
      desc.style.display = desc.style.display === 'none' ? 'block' : 'none'
    }
  })
}

function isSent(btn) {
  const TaskProBd = JSON.parse(localStorage.getItem('TaskProBd'))
  const { users, online } = TaskProBd
  online.tasks.forEach((status) => {
    if (status.id == btn) {
      status.state = status.state == false ? true : false
    }
  })
  let index = TaskProBd.users.findIndex((obj) => obj.id == online.id)
  TaskProBd.users[index] = online
  localStorage.setItem('TaskProBd', JSON.stringify(TaskProBd))
  window.location.reload()
}

function EditTask(taskId) {
  const TaskProBd = JSON.parse(localStorage.getItem('TaskProBd'))
  const { users, online } = TaskProBd

  const taskToEdit = online.tasks.find((task) => task.id == taskId)

  if (taskToEdit) {
    
    const newTitle = prompt("Edite o título da tarefa:", taskToEdit.title)
    const newDescription = prompt("Edite a descrição da tarefa:", taskToEdit.description)

    
    if (newTitle !== null || newDescription !== null) {
      taskToEdit.title = newTitle
      taskToEdit.description = newDescription

      let userIndex = TaskProBd.users.findIndex((user) => user.id == online.id)
      TaskProBd.users[userIndex] = online
      localStorage.setItem('TaskProBd', JSON.stringify(TaskProBd))

      window.location.reload()
    }
  } else {
    alert("Tarefa não encontrada!")
  }
}

function Remover(id) {
  const TaskProBd = JSON.parse(localStorage.getItem('TaskProBd'))
  const { online } = TaskProBd

  let removeIndex = TaskProBd.online.tasks.findIndex((user) =>user.id == id)

  if (removeIndex != -1) {
    online.tasks.splice(removeIndex, 1)
    let index = TaskProBd.users.findIndex((obj) => obj.id == online.id)
    TaskProBd.users[index] = online
    localStorage.setItem('TaskProBd', JSON.stringify(TaskProBd))
   window.location.reload()
  } else {
    alert('index não encontrado')
  }
}
