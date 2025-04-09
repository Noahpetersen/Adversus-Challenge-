import { useState, useContext, useEffect } from 'react';
import { RecentSalesView } from './views/recent-sales';
import { TopSalesView } from './views/top-sales';
import { SplashModal } from './widgets/splash-modal';
import { Header } from './views/header';
import { SalesConnnectorContext } from '../context/sales-connector';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSale } from '../state/sales/salesSlice';
import { RootState } from '../state/store';
import {  enqueueSale, showNextToast } from '../state/sales/toastSlice';

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
	const [mode, setMode] = useState<'top' | 'recent'>('top');

	const toast = useSelector((state: RootState) => state.toast.current);
	const dispatch = useDispatch();
  
	useEffect(() => {
	  // initialize callback
	  const cb = async (e) => {
		let user = await store.getUser(e.userId)
		let product = await store.getProduct(e.productId)
		const value = product.unitPrice * e.duration;
  
		const completeSale: CompleteSale = {
		  timestamp: Date.now(),
		  user,
		  product,
		  months: e.duration,
		  value
		};
  
		dispatch(addSale(completeSale));
		dispatch(enqueueSale({
		  id: completeSale.timestamp, 
		  user: completeSale.user.name, 
		  product: completeSale.product.name, 
		  value
		}));
	  }
  
	  hub.registerSalesEventListener(cb)
	  return () => hub.unregisterSalesEventListener(cb)
	}, [dispatch, hub, store]);
  
	useEffect(() => {
	  const timeoutId: ReturnType<typeof setTimeout> =
		mode === 'recent'
		  ? setTimeout(() => setMode('top'), 30_000)
		  : setTimeout(() => setMode('recent'), 60_000);
	  
	  return () => clearTimeout(timeoutId);
	}, [mode]);
  
	return (
	  <>
		<div className="flex-auto p-5 relative">
		  <Header mode={mode}/>
		  {mode === 'recent' ?
			<RecentSalesView/>
			: <TopSalesView/>
		  }	
		  
		  <SplashModal />
		</div>
	  </>
	)
  }
