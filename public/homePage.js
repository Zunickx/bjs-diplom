// Выход из личного кабинета

const logoutButton = new LogoutButton();

class LogoutButton {
    constructor() {
        this.action = () => {
            ApiConnector.logout((response) => {
                if(response.success) {
                    location.reload();
                }
            })
        }
    }
}

// Получение информации о пользователе

ApiConnector.current((response) => {
    if(response.success) {
        ProfileWidget.showProfile(response.data);
    }
});