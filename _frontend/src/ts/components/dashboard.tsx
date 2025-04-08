import { useState, useContext, useEffect } from 'react';
import { RecentSalesView } from './views/recent-sales';
import { TopSalesView } from './views/top-sales';
import { SplashModal } from './widgets/splash-modal';
import { Header } from './views/header';
import { SalesConnnectorContext } from '../context/sales-connector';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { addSale } from '../state/sales/salesSlice';

interface CompleteSale {
	timestamp: number;
	user: {
		type: string;
		id: number;
		name: string;
	};
	product: {
		type: string;
		id: number;
		name: string;
		unitPrice: number;
	};
	months: number;
	value: number;
}

export const DashBoardView = () => {
	const { hub, store } = useContext(SalesConnnectorContext)

	const [mode, setMode] = useState<'top' | 'recent'>('recent');
	const [splash, setSplash] = useState<boolean>(true);
	const [sales, setSales] = useState<CompleteSale[]>([]);
	const dispatch = useDispatch();


	useEffect(() => {
		// initialize callback
		const cb = async (e) => {
			let user = await store.getUser(e.userId)
			let product = await store.getProduct(e.productId)
			const value = product.unitPrice * e.duration;

			console.log('User', user.name, 'sold', product, 'with subscription length', e.duration, value)

			const completeSale: CompleteSale = {
				timestamp: Date.now(),
				user,
				product,
				months: e.duration,
				value
			};

			dispatch(addSale(completeSale));

			setSales(prev => [completeSale, ...prev]);

		}

		hub.registerSalesEventListener(cb)
		return () => hub.unregisterSalesEventListener(cb)
	}, []);

	return (
		<>
			<div className="flex-auto p-5">
				<Header mode={mode}/>
				{mode === 'recent' ?
					<RecentSalesView/>
					: <TopSalesView sales={sales}/>
				}	

				{splash &&
					<SplashModal />
				}
			</div>
		</>
	)
}
