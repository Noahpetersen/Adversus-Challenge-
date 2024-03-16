
## Frontend Coding Challenge

The aim of this task is to implement a dashboard leaderboard for a call center selling subscriptions to monthly cat magazines. The dashboard should continously update and react to new sales with splash screen notifications, by handling updates asynchonously.

### Background

A call-center wants to motivate their agents to sell more subscriptions, and wishes to do so by having a leaderboard clearly display who among the agents has sold the most.

The dashboard should continously switch between showing a list of the 10 most recent sales, and then showing a list of the 10 highest grossing agents that day.

All sales will be registered into a system to which the dashboard is also connected.

We will assume that the frontend application is always running, and pretend that it is hooked up to the backend using a websocket from which it receives events about new sales.

This task will be implemented against a mock library for handling such a web-socket.

The library has the following interface:
```javascript
class SalesEventListener {
/**
	Connect to the backend API
*/

	connect();

	// Register a callback function taking one argument (i.e. the event)
	registerSalesEventListener(callback);
	// Unregister a callback
	unregisterSalesEventListener(callback);
}
```

The salesEventListener callback will receive events which has the following form
```javascript
{
	type: 'sale', // this is the only type of event we're concerned with
	userId: 1, // the user who made the sale
	productId: 3, // the product (i.e. the cat magazine) that was sold
	months: 6 // the duration of the subscription in months
}
```
There is furthermore an interface available which has two function for retrieving meta-data about users and products
```javascript
class EntityStore {
	getUser(id)
	getProduct(id)
}
```
A user object has the following form

```javascript
{
	type: 'user',
	id: 1,
	name: 'Alice'
}
```

and a product object has the following form

```javascript
{
	type: 'product',
	id: 1,
	name: 'Cats and their secret hobbies',
	unitPrice: 79.99 // the cost for one months subscription
}
```

The SalesEventHub and EntityStore services are made available to the dashboard view as a react context.

The requirements are as follows:

- The scoreboard should have 2 modes: display top sellers, and display recent sales

- The top sellers mode should show a list of the 10 people who has sold the most (accounting for the total sales value for each sale), by listing their name, and how much they have sold for in total

- The recent sales mode should display a list of the 10 most recent sales, by listing the person who sold them, the product name, and the value of the sales

- The scoreboard should switch between showing the top sellers and the most recent sales

- The top sellers list should be displayed for a minute, and the most recent sales should only be display for half a minute

- The frontend application is responsible for bookkeeping the sales data such that it can display the most recent sales and top sellers

- Whenever a sale has been received a splash screen should be displayed for 5 seconds showing the person who made the sale, which magazine was sold, and the total value of that sale

- If multiple sales are received at more or less the same time, they should each be shown for 5 seconds in the order they are received



Examples:

Suppose we have the following meta-data

Users:

```javascript
[{
	type: 'user',
	id: 1,
	name: 'Alice'
},{
	type: 'user',
	id: 2,
	name: 'Bob'
},{
	type: 'user',
	id: 3,
	name: 'Carl'
}]
```

Products:

```javascript
[{
	type: 'product',
	id: 1,
	name: 'Cats and their secret hobbies',
	unitPrice: 79.95
},{
	type: 'product',
	id: 2,
	name: 'Cat psychology today',
	unitPrice: 89.95
},{
	type: 'product',
	id: 3,
	name: 'Curious tails and other novels',
	unitPrice: 79.95
},{
	type: 'product',
	id: 4,
	name: 'Culinary cooking for cats',
	unitPrice: 69.95
}]
```

And then suppose we have received the following events:
```javascript
[{
	type: 'sale',
	userId: 1,
	productId: 1,
	duration: 3
},{
	type: 'sale',
	userId: 2,
	productId: 1,
	duration: 6
},{
	type: 'sale',
	userId: 1,
	productId: 2,
	duration: 12
},{
	type: 'sale',
	userId: 3,
	productId: 4,
	duration: 3
}]
```

The top sales leaderboard should look as follows:

----------------------

--- Alice - 1319.25 ---

--- Bob - 479.7 ---

--- Carl - 209.85 ---

and the 10 most recent sales should look as follows

--- Alice - 239.85 ---

--- Bob - 539.70 ---

--- Alice - 1079.40 ---

--- Carl - 209.85 ---

## Getting started
### Installation
1. Open the `_frontend` folder in your favourite shell (e.g. Terminal, Command Promp, iTerm)
2. Run `npm install`

### Firing up the challenge
1. Type in `npx vite` in `_frontend` directory and access the project at [http://localhost:8080](http://localhost:8080)

Happy coding!
