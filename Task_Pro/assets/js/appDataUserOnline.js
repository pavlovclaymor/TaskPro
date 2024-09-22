function DataHomePageUserOnline() {
  const TaskProBd = JSON.parse(localStorage.getItem('TaskProBd'))
  const { users, online } = TaskProBd
  
  const imgProfileUserOnline = document.querySelectorAll('.img-profile-user-online')
  const firstNameUserOnline = document.querySelectorAll('.first-user-online')
  const lastNameUserOnline = document.querySelectorAll('.last-user-online')
  const emailUserOnline = document.querySelectorAll('.email-user-online')
  const countPostUserOnline = document.querySelectorAll('.count-post-user-online')

  imgProfileUserOnline .forEach((small)=>{
    small.innerHTML = `${online.firstname[0]}${online.lastname[0]}`
  })
  firstNameUserOnline.forEach((first)=>{
    first.innerHTML = online.firstname
  })
  lastNameUserOnline.forEach((last)=>{
    last.innerHTML = online.lastname
  })

  emailUserOnline.forEach((email)=>{
    email.innerHTML = online.email
  })
  countPostUserOnline.forEach((count)=>{
    count.innerHTML = online.tasks.length
  })

}