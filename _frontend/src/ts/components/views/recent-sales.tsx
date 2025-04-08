import React from 'react';
import { Card } from '../widgets/card';
import Table from '../widgets/table';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

export const RecentSalesView = () => {
	const recentSales = useSelector((state: RootState) => 
        [...state.sales.sales]
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, 10) 
    );

	return (
		<Card>
			<Card.InsetBody>
				<Table>
					<Table.Headers>
						<Table.Header>User</Table.Header>
						<Table.Header>Product</Table.Header>
						<Table.Header>Value</Table.Header>
					</Table.Headers>
					<Table.Body>
						{recentSales.length > 0 ? (
							recentSales.map((sale, index) => (
								<Table.Row key={index}>
									<Table.Cell>{sale.user.name}</Table.Cell>
									<Table.Cell>{sale.product.name}</Table.Cell>
									<Table.Cell>{sale.value.toFixed(2)} DKK</Table.Cell>
								</Table.Row>
							))
						) : (
							<Table.Row>
								<Table.Cell>No sales yet</Table.Cell>
							</Table.Row>
						)}
					</Table.Body>
				</Table>
			</Card.InsetBody>
		</Card>
	)
}
