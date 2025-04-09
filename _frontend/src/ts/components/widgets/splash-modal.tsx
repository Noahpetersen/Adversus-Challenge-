import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { showNextToast } from '../../state/sales/toastSlice';

export const SplashModal = () => {
	const dispatch = useDispatch();
	const { current: currentSale, queue } = useSelector((state: RootState) => state.toast);
  
	useEffect(() => {
	  
  
	  if (currentSale) {
		const timeout = setTimeout(() => {
		  dispatch(showNextToast());
		}, 5000);
  
		return () => clearTimeout(timeout);
	  }
	}, [currentSale, dispatch]);

	useEffect(() => {
		if (!currentSale && queue.length > 0) {
			dispatch(showNextToast());
		}
	}, [queue]);
  
	if (!currentSale) return null;
  
	return (
	  <div className="absolute bottom-20 left-0 right-0 mx-auto z-50 bg-white shadow-lg rounded-lg border-2 border-gray-300 p-6 w-[70rem] max-w-[90%] animate-toast-in">
		<h2 className="text-xl text-white bg-green-500 inline-block rounded-full px-3 py-1 mb-4">
		  New Sale
		</h2>
		<p className="text-lg mb-2">
		  <span className="font-semibold">{currentSale.user}</span>
		  <span> sold </span> 
		  <span className="font-semibold">{currentSale.product}</span>
		</p>
		<p className="text-lg">
		  Sale value: <span className="text-green-600 font-semibold">DKK {currentSale.value.toFixed(2)}</span>
		</p>
	  </div>
	);
};