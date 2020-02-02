import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';

export function render(store: Store<State>, EntryPoint: React.ComponentClass) {
	ReactDOM.render(
		<Provider store={store}>
			{React.createElement(EntryPoint)}
		</Provider>,
		document.getElementById('root')
	);

}