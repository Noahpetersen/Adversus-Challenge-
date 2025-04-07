import React, { useEffect, useState } from 'react';
import Table from '../widgets/table';
import { Card } from '../widgets/card';

interface Sale {
	user: {
		id: number;
		name: string;
	};
	value: number;
}

interface TopSalesViewProps {
	sales: Sale[];
}

export const TopSalesView = ({ sales }: TopSalesViewProps) => {
	const [topSales, setTopSales] = useState<{ user: string; total: number }[]>([]);

	useEffect(() => {
		const totalsMap = new Map<string, number>();

		sales.forEach((sale) => {
			const current = totalsMap.get(sale.user.name) ?? 0;
			totalsMap.set(sale.user.name, current + sale.value);
		});

		const top = Array.from(totalsMap.entries())
			.map(([user, total]) => ({ user, total }))
			.sort((a, b) => b.total - a.total)
			.slice(0, 10);

		setTopSales(top);
	}, [sales]);

	return (
		<Card>
			<Card.InsetBody>
				<Table>
					<Table.Headers>
						<Table.Header>User</Table.Header>
						<Table.Header>Total Value</Table.Header>
					</Table.Headers>
					<Table.Body>
						{topSales.map((entry, index) => (
							<Table.Row key={index}>
								<Table.Cell>{entry.user}</Table.Cell>
								<Table.Cell>{entry.total.toFixed(2)} DKK</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</Card.InsetBody>
		</Card>
	);
};
