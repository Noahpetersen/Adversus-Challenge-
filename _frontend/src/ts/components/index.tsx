import * as React from 'react';
import { RecentSalesView } from './views/recent-sales';
import { TopSalesView } from './views/top-sales';
import { SplashModal } from './widgets/splash-modal';
import { Sidebar } from './views/sidebar';
import { Header } from './views/header';

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
		const { splash, mode } = this.state;

		return (
			<>
				<Sidebar />
				<div className="main">
					<Header />

					{mode === 'recent' 
							? <RecentSalesView />
							: <TopSalesView />
					}

					{splash && <SplashModal />}
				</div>
			</>
		)
	}
}
