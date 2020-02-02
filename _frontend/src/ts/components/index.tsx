import * as React from 'react';
import { RecentSalesView } from './views/recent-sales';
import { TopSalesView } from './views/top-sales';
import { SplashModal } from './widgets/splash-modal';
import { Sidebar } from './views/sidebar';

interface State {
	mode: 'top' | 'recent';
	splash: boolean;
	// ...
}
export class DashboardApplication extends React.Component<{}, State> {
	state: State = {
		mode: 'top',
		splash: true
	}
	componentDidMount() {
		// initialize services
		// ...
	}
	render() {
		return (
			<>
				<Sidebar />
				<div className="main">
					<h1>Dashify</h1>
					{this.state.mode === 'recent' ?
						<RecentSalesView />
						: <TopSalesView />
					}
					{this.state.splash ?
						<SplashModal />
						: null
					}
				</div>
			</>
		)
	}
}
