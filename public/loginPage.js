"use strict";

const userForm = new UserForm();

class UserForm {
    constructor() {
        this.loginFormCallback = function(data) { // данные переданные в форму входа, используем в функции и передаем в ApiConnector для сверки с сервером
            ApiConnector.login(data, (response) => {
                if(response.success) {            // где в дальнейшем проверяем ответ на истину, если равно истине, то
                    location.reloaded();          // перезагружаем страницу
                } else {
                    console.error(response.error);// если иначе, то выводит ошибку
                }
            })
        }

        this.registerFormCallback = function(data) {
            ApiConnector.login(data, (response) => {
                if(response.success) {
                    location.reload();
                } else {
                    console.error(response.error);
                }
            })
        }
    }
}



