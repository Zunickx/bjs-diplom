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