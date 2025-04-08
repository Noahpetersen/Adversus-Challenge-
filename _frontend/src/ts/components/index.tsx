import React from 'react';
import { Sidebar } from './views/sidebar';
import { SalesConnnectorProvider } from '../context/sales-connector';
import { DashBoardView } from './dashboard'
import { Provider } from 'react-redux';
import { store } from '../state/store';

export default () => (
	<React.StrictMode>
		<Provider store={store}>
			<Sidebar />
			<SalesConnnectorProvider>
				<DashBoardView />
			</SalesConnnectorProvider>
		</Provider>
	</React.StrictMode>
)

