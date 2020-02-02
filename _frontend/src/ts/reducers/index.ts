import { Action } from "redux";

const init: State = {
	state: 0
}

export function reducer(state: State = init, action: Action) {
	return state;
}