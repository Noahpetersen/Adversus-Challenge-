import * as React from 'react';
import * as ReactDOM from 'react-dom';

export function render(EntryPoint: React.ComponentClass) {
	ReactDOM.render(
		React.createElement(EntryPoint),
		document.getElementById('root')
	);

}