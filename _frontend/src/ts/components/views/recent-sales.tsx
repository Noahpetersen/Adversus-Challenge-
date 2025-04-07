import React from 'react';
import { Card } from '../widgets/card';
import Table from '../widgets/table';

interface RecentSalesViewProps {
	sales: any[];
}

export const RecentSalesView = ({ sales }: RecentSalesViewProps) => {

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
						{sales.length > 0 ? (
							sales.map((sale, index) => (
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
