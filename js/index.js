(() => {
  document.addEventListener("DOMContentLoaded", () => {
    login();
  });

  const login = () => {
    let loginBtn = document.querySelector("#login-btn");
    const userInput = document.querySelector("#username");
    const passInput = document.querySelector("#password");
    let inputsReadys = { username: true, password: true };

    userInput.addEventListener("input", (e) => {
      if (e.target.value.length > 0) {
        inputsReadys.username = false;
      } else {
        inputsReadys.username = true;
      }
      enableLogin(inputsReadys);
    });

    passInput.addEventListener("input", (e) => {
      if (e.target.value.length > 0) {
        inputsReadys.password = false;
      } else {
        inputsReadys.password = true;
      }
      enableLogin(inputsReadys);
    });

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
        let userInfo = {
          user_name: userInput.value,
          password: passInput.value,
        };
        LoginService(userInfo);
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
    if (!inputsError.username && !inputsError.password) {
      loginBtn.classList.add("active");
      return;
    }
    loginBtn.classList.remove("active");
  };

  const LoginService = async (userInfo) => {
    let { user_name, password } = userInfo;
    let userFormated = user_name.toLowerCase();
    let body = { user_name: userFormated, password: password };
    let loginBtn = document.querySelector("#login-btn");
    try {
      loginBtn.classList.add("loader");
      let inputValue = loginBtn.value;
      loginBtn.value = "";
      const request = await fetch(
        "https://fortunate-exploration-production.up.railway.app/login",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const response = await request.json();
      setTimeout(() => {
        loginBtn.classList.remove("loader");
        loginBtn.value = inputValue;
        validateSesion(response);
      }, 2500);
    } catch (e) {
      setTimeout(() => {
        loginBtn.classList.remove("loader");
        loginBtn.value = "Iniciar sesion";
        showErrorMessage({
          error: true,
          message:
            "Algo ocurrio con el sistema, ya estamos revisando. le pedimos disculpa",
        });
      }, 2000);
    }
  };

  const validateSesion = async (s) => {
    let { status, token } = s;
    if (status == "PS-0000") {
      console.log("Sesion iniciada correctamente");
      localStorage.setItem('token', JSON.stringify({'token': token}))
      const user_logged = await fetch("https://fortunate-exploration-production.up.railway.app/user/profile",
        {
          headers: {Authorization: token}
        }
      )
      const response = await user_logged.json();
      localStorage.setItem('user', JSON.stringify( response))
      window.location = "../pages/dashboard.html";
      return;
    }
    showErrorMessage({
      error: true,
      message: "Usuario o contraseña incorrectos, valida e intenta nuevamente",
    });
  };
})();
