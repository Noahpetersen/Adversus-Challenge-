import { DashboardApplication } from './components';
import { render } from './render';
import { store } from './store';

// Render
render(store, DashboardApplication);

// HMR
if (module && module.hot) {
	console.log('Hot reloading is active')
	module.hot.accept('./components', () => {
		const Replacement = require('./components').DashboardApplication
		render(store, Replacement);
	})
}