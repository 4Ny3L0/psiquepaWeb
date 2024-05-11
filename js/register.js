(() => {
  let inputsForm = {
    first_name: [{ error: false, message: "" }],
    last_name: [{ error: false, message: "" }],
    mobile: [{ error: false, message: "" }],
    email: [{ error: false, message: "" }],
    document_id: [{ error: false, message: "" }],
    username: [{ error: false, message: "" }],
    password: [{ error: false, message: "" }],
    password_c: [{ error: false, message: "" }],
  };
  document.addEventListener("DOMContentLoaded", () => {
    let registerFormMain = document.querySelector("#register-form");
    registerFormMain.addEventListener("input", (e) => {
      for (const inputId of Object.keys(inputsForm)) {
        let inputElement = document.querySelector(`#${inputId}`);
        inputsValidations(inputElement, inputId);
      }
    });
    registerFormMain.addEventListener("focusout", (e) => {
      console.log(e.target.tagName);
      console.log(inputsForm);
    });
    registerFormMain.addEventListener("submit", (e) => {
      let loginBtn = document.querySelector("#login-btn");
      e.preventDefault();
      let submitBtnIsActive = Array.from(loginBtn.classList);
      if (submitBtnIsActive.includes("active")) {
        validateForm();
      }
      //
    });
  });

  const validateForm = () => {
    let registerForm = document.querySelector("#register-form");
    let registerFormElements = Array.from(registerForm.children);
    console.log(registerFormElements.length);
    registerFormElements.forEach((element, index) => {
      let elementId = element.id;
      if (elementId != "login-btn") {
        inputsValidations(element, elementId);
      }
      return;
    });
  };

  const inputsValidations = (element, elementId) => {
    let error = false;
    let messages = "";
    if (element.value.length <= 0) {
      error = true;
      messages = `El campo "${element.placeholder} es requerido"`;
      inputsForm[elementId][0]["error"] = error;
      inputsForm[elementId][0]["message"] = messages;
      return true;
    }
    if (element.value.log > 0) {
      if (elementId === "username") {
        usernameValidations(element.value);
      }
    }
  };
  const usernameValidations = (username) => {};
  const passwordValidations = () => {};
})();
