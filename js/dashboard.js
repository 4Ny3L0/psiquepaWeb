(()=>{

  window.addEventListener('load',(e)=>{
    let h2User = document.querySelector('#user-name')
    const user_info = JSON.parse(localStorage.getItem('user'))
    h2User.textContent=`Hola, ${user_info.body.first_name} !!!`;
    console.log(user_info);
  })

})();