let adm = {
  id: Math.floor(Math.random()*1e4),
  name: 'root',
  email: 'root@gmail.com',
  password: 'root1234',
  removed: [],
};

let regexEmail = /^[a-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let regexPassword = /^.{8,}/;

const inputEmail = document.querySelector('#email');
let stateEmail = false;

const inputPassword = document.querySelector('#password');
let statePassword = false;

function ValidateDateUser() {
  stateEmail = regexEmail.test(inputEmail.value.trim());
  statePassword = regexPassword.test(inputPassword.value.trim());

  if (stateEmail && statePassword) return true;
  return false;
}
function SignIn() {
  if (!ValidateDateUser()) return DataError();

  const TaskProBd = JSON.parse(localStorage.getItem('TaskProBd')) || {
    users: [],
    online: '',
    admin: '',
  };

  const { users } = TaskProBd;
  if (TaskProBd.admin == '') {
    TaskProBd.admin = adm
    
  }
  
   const obj = users.find((user)=> {
    if (user.email == inputEmail.value.trim() && user.password == inputPassword.value.trim()) {
      return user
    }
   })
   
 
    if ( obj ) {
      
      TaskProBd.online = obj
      localStorage.setItem('TaskProBd',JSON.stringify(TaskProBd))
      Sucessfull()
    }else if (TaskProBd.admin.email == inputEmail.value.trim() && TaskProBd.admin.password == inputPassword.value.trim()) {
      inputEmail.style.borderColor = '2px solid transparent'
      inputPassword.style.borderColor = '2px solid transparent'
     localStorage.setItem('TaskProBd',JSON.stringify(TaskProBd))
     window.location.href = '../admin/admin.html'
   }else{
    DataError()
   }
    
  
}

function Sucessfull() {
  setTimeout(() => {
     window.location.href = '../index.html'
  }, 1000);
  inputEmail.style.borderColor = '#008000'
  inputPassword.style.borderColor = '#008000'
}
function DataError(){
   inputEmail.style.borderColor = '#ea1d2c'
  inputPassword.style.borderColor = '#ea1d2c'
}