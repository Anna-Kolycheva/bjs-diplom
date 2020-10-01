
const logoutBtn = new LogoutButton;

logoutBtn.action = () => ApiConnector.logout(response => {
	if (response.success) {
		location.reload();
	}
})


ApiConnector.current(response => { 
    if (response.success) {
    		ProfileWidget.showProfile(response.data);
    }
})

const tableBody = new RatesBoard;

let stocks = () => {
	ApiConnector.getStocks(response => {
	    if (response.success) {
		    tableBody.clearTable();
    		tableBody.fillTable(response.data);
    	}
    })
}

stocks();
setInterval(stocks, 60000);

const moneyForm = new MoneyManager;

moneyForm.addMoneyCallback = data => ApiConnector.addMoney(data, response => {
    if (response.success) {
    	    moneyForm.setMessage(response.success, `Счёт пополнен на ${data.amount} ${data.currency}`,);
    		ProfileWidget.showProfile(response.data);
    } else {
    	    moneyForm.setMessage(response.success, response.error);
    }
})

moneyForm.conversionMoneyCallback = data => ApiConnector.convertMoney(data, response => {
    if (response.success) {
    	    moneyForm.setMessage(response.success, `конвертация прошла успешно`,);
    		ProfileWidget.showProfile(response.data);
    } else {
    	    moneyForm.setMessage(response.success, response.error);
    }
})

moneyForm.sendMoneyCallback = data => ApiConnector.transferMoney(data, response => {
    if (response.success) {
    	    moneyForm.setMessage(response.success, `перевод пользователю ${data.to} выполнен успешно`,);
    		ProfileWidget.showProfile(response.data);
    } else {
    	    moneyForm.setMessage(response.success, response.error);
    }
})

const favorites = new FavoritesWidget;

ApiConnector.getFavorites(response => {
	if (response.success) {
		favorites.clearTable();
		favorites.fillTable(response.data);
		moneyForm.updateUsersList(response.data);
	}
});

favorites.addUserCallback = data => ApiConnector.addUserToFavorites(data, response => {
    if (response.success) {
    	favorites.clearTable();
		favorites.fillTable(response.data);
		moneyForm.updateUsersList(response.data);
		favorites.setMessage(response.success, 'пользователь  добавлен в Ваш список контактов');
    } else {
    	favorites.setMessage(response.success, response.error);
    }
})

favorites.removeUserCallback = data => ApiConnector.removeUserFromFavorites(data, response =>{
    if (response.success) {
    	favorites.clearTable();
		favorites.fillTable(response.data);
		moneyForm.updateUsersList(response.data);
		favorites.setMessage(response.success, 'пользователь удален');
    } else {
    	favorites.setMessage(response.success, response.error);
    }
})