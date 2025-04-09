import React from 'react';

interface Props {
	mode: string;
}

export const Header = ({ mode }: Props) => {
	return (
		<div className="flex items-center justify-between mb-4">
			<h1 className="text-2xl">{mode === 'top' ? "Top Sellers" : "Recent Sales"}</h1>
		</div>
	)
}
