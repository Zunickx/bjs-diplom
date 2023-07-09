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

// Получение текущих курсов валюты

const ratesBoard = new RatesBoard();

function ratesBoard() {
    ApiConnector.getStocks(result => {
        if (result.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(result.data);
        }
    });
}
newRatesBoard();
setInterval(() => newRatesBoard(), 60000);
