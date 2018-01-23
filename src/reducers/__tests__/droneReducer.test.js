import * as types from 'constants/actionTypes'
import reducer from '../droneReducer'

const state = {
	drones: [],
	droneActionItem: {
		action: '',
		drones: null,
	},
}

describe('drone reducer', () => {
	it('return initial state', () => {
		expect(reducer(undefined, {})).toEqual(state)
	})

	it('handle ADD_DRONES', () => {
		const dispatched = {
			type: types.ADD_DRONES,
			payload: [{ id: 1 }],
		}

		const newState = reducer(undefined, dispatched)

		expect(newState).toHaveProperty('drones', dispatched.payload)
		expect(newState.droneActionItem).toHaveProperty('action', 'add')
		expect(newState.droneActionItem).toHaveProperty(
			'drones',
			dispatched.payload,
		)
	})

	it('handle UPDATE_DRONE', () => {
		const dispatched = {
			type: types.UPDATE_DRONE,
			payload: {
				index: 0,
				drone: [{ id: 1 }],
			},
		}

		const newState = reducer(undefined, dispatched)

		expect(newState).toHaveProperty('drones', dispatched.payload.drone)
		expect(newState.droneActionItem).toHaveProperty('action', 'update')
		expect(newState.droneActionItem).toHaveProperty(
			'drones',
			dispatched.payload.drone,
		)
	})

	it('hande REMOVE_DRONE', () => {
		state.drones.push({ id: 1 })
		const dispatched = {
			type: types.REMOVE_DRONE,
			payload: 1,
		}

		const newState = reducer(state, dispatched)

		expect(newState).toHaveProperty('drones', [])
		expect(newState.droneActionItem).toHaveProperty('action', 'remove')
		expect(newState.droneActionItem).toHaveProperty(
			'drones',
			dispatched.payload,
		)
	})
})
