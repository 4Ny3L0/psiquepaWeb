(()=>{

    document.addEventListener('DOMContentLoaded', ()=>{
        login()
    })
    

    const login = ()=>{
        let loginBtn = document.querySelector('#login-btn')
        const userInput = document.querySelector('#username')
        const passInput = document.querySelector('#password')
        let inputsReadys = {'username': false, 'password': true}

        userInput.addEventListener('blur', (e)=>{
           let error =  inputsValidations(e, {'error': false, 'element':e.target.id})
           console.log(error)
           inputsReadys.username = error.loginBtn
           let existsError = showErrorMessage(error)
           let errorManager = {'username': existsError}
            enableLogin(errorManager)

        })
        passInput.addEventListener('blur', (e)=>{
            let error = inputsValidations(e, {'error': false, 'element':e.target.id})
            inputsReadys.password = error.loginBtn
            let existsError = showErrorMessage(error)
            let errorManager = {'password': existsError}
            enableLogin(errorManager)

        })

        
        loginBtn.addEventListener('click',(e)=>{
            e.preventDefault();
        })
    }

    const inputsValidations = (input, error)=>{
        let inputValue = input.target.value;
                if(inputValue.length == 0 || inputValue === undefined){
                    error = {
                        'error' : true,
                        'message' : `El campo ${input.target.placeholder} es requerido`,
                        'element' : input.target.id
                    }
                }else{
                    error = { 'error': false , 'loginBtn': true}
                }
            return error
    }

    const showErrorMessage = (error)=>{
        let errorElement = document.querySelector('#error')
        errorElement.textContent = ''
        if(error.error){
            console.log(error.message)
            console.log(errorElement)
            errorElement.textContent = error.message
            return true
        }
        return false
    }
    const enableLogin = (element)=>{
        let errorManager = {'password': false, 'username': false}
        errorManager.username = element
        console.log(errorManager)
    }
})();