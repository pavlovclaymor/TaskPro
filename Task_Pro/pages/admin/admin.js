function ShowDataAdminHomePage() {
  const TaskProBd = JSON.parse(localStorage.getItem('TaskProBd'))
  const {admin} = TaskProBd

  const sortName = document.querySelector('#sort-name')
  const email = document.querySelector('.conteiner-email')
  const fullName = document.querySelector('.full-name')
  const idAdmin = document.querySelector('.id-admin')

  if ( admin ) {
    let wordSplit = admin.name.split(' ')
    let firstname = wordSplit[0]
    let lastname = wordSplit.length - 1 > 0 ? wordSplit[wordSplit.length - 1] : firstname[firstname.length - 1]
    console.log(wordSplit[wordSplit.length - 1]);
    
    sortName.innerHTML = admin.name != 'root' ? `${firstname[0].toUpperCase()}${lastname[0].toUpperCase()}`:'rt'

    email.innerHTML = `<i class="bi bi-envelope"></i>${admin.email}`

    fullName.innerHTML = `<i class="bi bi-person-fill">${admin.name}`

    idAdmin.innerHTML = `identificação: ${admin.id}`
  }
}

function Update() {
  const TaskProBd = JSON.parse(localStorage.getItem('TaskProBd'))
  const {admin} = TaskProBd

  let regexNames = /^.[a-zA-Z]+$/
  let regexEmail = /^[a-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  let regexPassword = /^.{8,}/

  const inputName = document.querySelector('#input-name').value.trim()
  let stateInputName = false

  const inputEmail = document.querySelector('#input-email').value.trim()
  let stateInputEmail = false

  const inputPassword = document.querySelector('#input-password').value.trim()
  let stateInputPassword = false

  let newName = inputName.split(' ')
  if (newName.length >= 0) {
    for (let index = 0; index < newName.length; index++) {
      stateInputName = regexNames.test(newName[index].trim())

      if ( !stateInputName ) {
        break;
      } 
    }
  }

  stateInputEmail = regexEmail.test(inputEmail.trim())
  stateInputPassword = regexPassword.test(inputPassword.trim())

  if ( !stateInputEmail && !stateInputName && !inputPassword ) return alert('verifique os campos')
    
    if ( stateInputEmail){
      let verifyIfEmailExists = TaskProBd.users.some((user)=>{ user.email == inputEmail})
      if ( verifyIfEmailExists ) {
        alert('este email já existe')
      }else{
        admin.email = inputEmail.trim()
      }
      
    } 
    
    if ( stateInputName ) 
      admin.name = inputName.trim()
    if ( stateInputPassword ) 
      admin.password = inputPassword.trim()

    localStorage.setItem('TaskProBd',JSON.stringify(TaskProBd))
    window.location.reload()

}