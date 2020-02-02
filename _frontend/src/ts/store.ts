import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { reducer } from './reducers'

let devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

function composeWithDevTools() {
	const middleware = [thunkMiddleware]
	const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
	return composeEnhancers(applyMiddleware(thunkMiddleware));
}

const enhancer = devTools ?
	composeWithDevTools()
	: applyMiddleware(thunkMiddleware);

export const store = createStore<State>(reducer, enhancer);

if (module && module.hot) {
	console.log('Hot reloading is active')
	module.hot.accept('./reducers', () => {
		console.log('Accepting')
		const next = require('./reducers').reducer;
		store.replaceReducer(next);
		console.log(store.getState());
	})
}
