'use strict';

// Выход из личного кабинета

const logoutButton = new LogoutButton();

class LogoutButton {
    constructor() {
        this.action = () => {
            ApiConnector.logout((response) => {
                if(response.success) {
                    location.reload();
                }
            });
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

function newRatesBoard(ratesBoard) {
    ApiConnector.getStocks(result => {
        if (result.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(result.data);
        }
    });
}
newRatesBoard();
setInterval(() => newRatesBoard(), 60000);

// Операции с деньгами

const moneyManager = new MoneyManager();

// Реализация пополнения баланса
moneyManager.addMoneyCallback = function(data) {
    // Выполнение запроса на пополнение баланса
    ApiConnector.addMoney(data, (response) => {
      // Проверка успешности запроса
      if (response.success) {
        // Отображение новых данных о пользователе
        ProfileWidget.showProfile(response.data);
        // Вывод сообщения об успехе
        MessageWidget.setMessage(true, 'Баланс успешно пополнен');
      } else {
        // Вывод сообщения об ошибке
        MessageWidget.setMessage(false, response.error);
      }
    });
  };

moneyManager.conversionMoneyCallback  = function(data) {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.convertMoney(response.data);
            MessageWidget.setMessage(true, 'Конвертация выполнена успешно');
        } else {
            MessageWidget.setMessage(false, response.error);
        }
    });
};

moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.convertMoney(response.data);
            MessageWidget.setMessage(true, 'Перевод, выполнен успешно');
        } else {
            MessageWidget.setMessage(false, response.error);
        }
    });
};

// Работа с избранным

const favoritesWidget = new FavoritesWidget();

// Запрос начального списка избранного

favoritesWidget.getFavorites();

favoritesWidget.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data, (response) => {
        if(response.success) {
            // Очистка текущего списка избранного
            favoritesWidget.clearTable();
            // Отрисовка полученных данных
            favoritesWidget.fillTable(response.data);
            // Заполнение выпадающего списка для перевода денег
            favoritesWidget.updateUsersList(response.data);
            favoritesWidget.setMessage(true, 'Пользователь, успешно добавлен в избранное');
        } else {
            favoritesWidget.setMessage(false, response.error);
        }
    });
};

favoritesWidget.removeUserCallback = function(data) {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if(response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            favoritesWidget.updateUsersList(response.data);
            favoritesWidget.setMessage(true, 'Пользователь, успешно удален из избранного');
        } else {
            favoritesWidget.setMessage(false, response.error);
        }
    });
};
