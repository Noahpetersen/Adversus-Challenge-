import * as React from 'react';
import { RecentSalesView } from './views/recent-sales';
import { TopSalesView } from './views/top-sales';
import { SplashModal } from './widgets/splash-modal';

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
            <div className="container" >
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
        )
    }
}
