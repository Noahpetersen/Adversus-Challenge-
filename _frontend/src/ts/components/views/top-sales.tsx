import React from "react";
import Table from "react-table";

export class TopSalesView extends React.Component<{}> {
	
	render() {
		const columns = [
			{
				Header: 'User',
				accessor: 'user',
			},{
				Header: 'Value',
				accessor: 'value'
			}
		];
		
		return (
			<table className="table">
				<thead>
					<tr>
						<th>User</th>
						<th>Value</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Scratchy</td>
						<td>1337</td>
					</tr>
					<tr>
						<td>Felix</td>
						<td>1337</td>
					</tr>
					<tr>
						<td>Tomcat</td>
						<td>1337</td>
					</tr>
				</tbody>
			</table>
		)
	}
}