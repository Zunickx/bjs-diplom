"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = function(data) { // данные переданные в форму входа, используем в функции и передаем в ApiConnector для сверки с сервером
    ApiConnector.login(data, (response) => {
        if(response.success) {            // где в дальнейшем проверяем ответ на истину, если равно истине, то
            location.reloaded();          // перезагружаем страницу
        } else {
            userForm.setLoginErrorMessage(response.error);// если иначе, то выводит ошибку
        }
    })
}

userForm.registerFormCallback = function(data) {
    ApiConnector.login(data, (response) => {
        if(response.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(response.error);
        }
    })
}



