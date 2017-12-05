import * as types from 'constants/actionTypes'
import reducer from '../infoReducer'

const state = {
	sidebarInfo: 'Drones',
	selectedDrone: null,
}
describe('info reducer', () => {
	it('return initial state', () => {
		expect(reducer(undefined, {})).toEqual(state)
	})

	it('handle CHANGE_SIDEBAR_INFO', () => {
		const dispatched = {
			type: types.CHANGE_SIDEBAR_INFO,
			payload: 'Drone Ports',
		}

		let newState = reducer(undefined, dispatched)
		expect(newState.sidebarInfo).toBe('Drone Ports')

		dispatched.payload = 'Drones'
		newState = reducer(newState, dispatched)
		expect(newState.sidebarInfo).toBe('Drones')
	})

	it('handle SELECT_DRONE', () => {
		const dispatched = {
			type: types.SELECT_DRONE,
			payload: 1,
		}

		const newState = reducer(undefined, dispatched)
		expect(newState.selectedDrone).toBe(dispatched.payload)
	})
})
