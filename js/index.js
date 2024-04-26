(() => {
  document.addEventListener("DOMContentLoaded", () => {
    login();
  });

  const login = () => {
    let loginBtn = document.querySelector("#login-btn");
    const userInput = document.querySelector("#username");
    const passInput = document.querySelector("#password");
    let inputsReadys = { username: true, password: true };

    userInput.addEventListener("blur", (e) => {
      let error = inputsValidations(e, { error: false, element: e.target.id });
      let existsError = showErrorMessage(error);
      inputsReadys.username = existsError;
      enableLogin(inputsReadys);
    });
    passInput.addEventListener("blur", (e) => {
      let error = inputsValidations(e, { error: false, element: e.target.id });
      inputsReadys.password = error.loginBtn;
      let existsError = showErrorMessage(error);
      inputsReadys.password = existsError;
      enableLogin(inputsReadys);
    });

    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (!inputsReadys.username && !inputsReadys.password) {
      } else {
        showErrorMessage({
          error: true,
          message: "El campo usuario y contraseña son requeridos",
        });
      }
    });
  };

  const inputsValidations = (input, error) => {
    let inputValue = input.target.value;
    if (inputValue.length == 0 || inputValue === undefined) {
      error = {
        error: true,
        message: `El campo ${input.target.placeholder} es requerido`,
        element: input.target.id,
      };
    } else {
      error = { error: false, loginBtn: true };
    }
    return error;
  };

  const showErrorMessage = (error) => {
    let errorElement = document.querySelector("#error");
    errorElement.textContent = "";
    if (error.error) {
      errorElement.textContent = error.message;
      setTimeout(() => {
        errorElement.textContent = "";
      }, 3000);
      return true;
    }
    return false;
  };
  const enableLogin = (inputsError) => {
    let loginBtn = document.querySelector("#login-btn");
    const userInput = document.querySelector("#username");
    const passInput = document.querySelector("#password");
    console.log(inputsError);
    console.log(userInput.value.length);
    console.log(passInput.value.length);
    if (!inputsError.username && !inputsError.password) {
      loginBtn.classList.add("active");
      return;
    }
    loginBtn.classList.remove("active");
  };
})();
