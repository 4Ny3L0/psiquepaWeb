(() => {
  let inputsForm = {
    first_name: [{ content: '', message: "Por favor escribe tu nombre" , max_length:20}],
    last_name: [{ content:'', message: "Por favor escribe tu apellido" , max_length:20}],
    mobile: [{ content:'', message: "Por favor escribe tu celular" , max_length:8}],
    email: [{ content:'', message: "Por favor escribe tu correo" , max_length:30}],
    document_id: [{ content:'', message: "Por favor escribe tu cedula" , max_length:15}],
    username: [{ content:'', message: "Por favor escribe tu usuario" , max_length:10}],
    password: [{ content:'', message: "Por favor escribe tu contraseña", max_length:16 }],
    password_c: [{ content:'', message: "Por favor confirma tu contraseña" , max_length:16}],
  };

  document.addEventListener("DOMContentLoaded", () => {
    let registerFormMain = document.querySelector("#register-form");
    registerFormMain.addEventListener("submit", (e) => {
      let loginBtn = document.querySelector("#login-btn");
      e.preventDefault();
      let submitBtnIsActive = Array.from(loginBtn.classList);
      if (submitBtnIsActive.includes("active")) {
        validateForm();
      }
    });

    registerFormMain.addEventListener("input",(e)=>{
      inputsForm[e.target.id][0]['content'] = e.target.value;
      if(e.target.id == 'mobile'){
        mobile_custom_input(e);
      }
    })
  });


  const validateForm = ()=>{
    const is_length_error = length_validations();
    const is_email_error = email_validations(inputsForm.email);
    const is_document_id_error = document_id_validation(inputsForm.document_id)
    if(is_length_error || is_email_error || is_document_id_error){
      return;
    }
    send_data();
  };

  const dismissMessage = ()=>{
    let errorElement = document.querySelector('#error');
    setTimeout(()=>{
      errorElement.textContent ='';
    },2500)
  }

const length_validations = ()=>{
  let errorElement = document.querySelector('#error');
  for(let input of Object.keys(inputsForm)){
    let actualInput = document.querySelector(`#${input}`)
    if(inputsForm[input][0].content.length <= 0 ){
      errorElement.textContent = `${inputsForm[input][0]['message']}`
      dismissMessage();
      return true;
  }if(inputsForm[input][0].content.length > inputsForm[input][0].max_length){
    errorElement.textContent = `Revisa que "${actualInput.placeholder}" sea menor a ${inputsForm[input][0]['max_length']}`;
    dismissMessage();
    return true;
  }
}
return false;
}
const email_validations = (input)=>{
  let errorElement = document.querySelector('#error');
  const regexEmail = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  let email = input[0].content
  if(email.match(regexEmail) == null){
    errorElement.textContent = `Revisa que el formato del correo sea valido`;
    dismissMessage();
    return true;
  }
  return false;
}

const document_id_validation = (input)=>{
  let errorElement = document.querySelector('#error');
  const document_id_regex = /^(?:[1-9]|1[0-3])-(?:[1-9]\d{0,3}|[1-9])-(?:[1-9]\d{0,3}|[1-9])$/;
  let document_id = input[0].content;
  if(document_id.match(document_id_regex)==null || document_id.match(document_id_regex)== undefined){
    errorElement.textContent = `Revisa que el formato de tu cedula sea valido`;
    dismissMessage();
    return true;
  }
  return false;
}

const mobile_validations = (e)=>{

}

const mobile_custom_input = (e)=>{
  e.target.maxLength = 9;
  let errorElement = document.querySelector('#error');
  if (e.target.value.length == 4) {
    e.target.value += '-'
  }
  if(e.target.value.length == 5 && e.inputType == 'deleteContentBackward'){
    let new_value = inputsForm.mobile[0].content.slice('-')
    e.target.value = new_value
  }
  if(e.inputType == 'insertText' && e.target.value.length > 9){
    // e.preventDefault();
    // errorElement.textContent = 'Este campo solo permite 8 digitos';
    // dismissMessage();
  }
}

const send_data = ()=>{
  let errorElement = document.querySelector('#error');
  errorElement.textContent = 'Enviando datos'
}

  
})();
