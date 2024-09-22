const user = {
  id:'',
  firstname: '',
  lastname: '',
  password: '',
  email: '',
  tasks: [],
  notification:[]
}

let regexNames = /^.[a-zA-Z]+$/
let regexEmail = /^[a-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
let regexPassword = /^.{8,}/

const inputFirstname = document.querySelector('#firstname')
let stateFirstname = false

const inputLastname = document.querySelector('#lastname')
let stateLastname = false

const inputEmail = document.querySelector('#email')
let stateEmail = false

const inputPassword = document.querySelector('#password')
let statePassword = false

function Validate() {
  stateFirstname = regexNames.test(inputFirstname.value.trim())
  stateLastname = regexNames.test(inputLastname.value.trim())
  stateEmail = regexEmail.test(inputEmail.value.trim())
  statePassword = regexPassword.test(inputPassword.value.trim())

  if (stateEmail && stateFirstname && stateLastname && statePassword)
    return true
  return false
}

function SignUp() {
  if (!Validate()) return WrongData()

  const TaskProBd = JSON.parse(localStorage.getItem('TaskProBd')) || {
    users: [],
    online: '',
    admin: '',
  }
  user.id = Math.floor(Math.random()*1e10)
  user.email = inputEmail.value.trim()
  user.firstname = inputFirstname.value.trim()
  user.lastname = inputLastname.value.trim()
  user.password = inputPassword.value.trim()

  if (TaskProBd.users.length === 0) {
    TaskProBd.users.push(user)
    TaskProBd.online = user
    localStorage.setItem('TaskProBd', JSON.stringify(TaskProBd))
    SucessData()
  } else {
    let verifyIfContactExistInDataBase = TaskProBd.users.some(
      (user) => user.email == inputEmail.value.trim(),
    )
  
    if (!verifyIfContactExistInDataBase) {
      TaskProBd.users.push(user)
      TaskProBd.online = user
      localStorage.setItem('TaskProBd', JSON.stringify(TaskProBd))
      SucessData()
    } else {
      inputEmail.style.borderColor = '#ea1d2c'
    }
  }
}
function WrongData() {
  if (!stateFirstname){
    inputFirstname.style.borderColor = "#ea1d2c";
}else{
    inputFirstname.style.borderColor = null;
}

if (!stateEmail){
    inputEmail.style.borderColor = "#ea1d2c";
}else {
  inputEmail.style.borderColor = null;
}

if (!stateLastname) {
    inputLastname.style.borderColor = "#ea1d2c";
} else {
    inputLastname.style.borderColor = null;
}

if (!statePassword) {
    inputPassword.style.borderColor = "#ea1d2c";
} else {
    inputPassword.style.borderColor = null;
}

}

function SucessData() {
  setInterval(()=>{
    window.location.href = '../index.html'
},2000)
inputFirstname.style.borderColor = "#008000"
inputLastname.style.borderColor = "#008000"
inputEmail.style.borderColor = "#008000"
inputPassword.style.borderColor = "#008000"

}
