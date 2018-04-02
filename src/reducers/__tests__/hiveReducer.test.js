import * as types from 'constants/actionTypes'
import reducer from '../hiveReducer'

const state = {
	hives: [],
	hiveActionItem: {
		action: '',
		hives: null,
	},
}

describe('hive reducer', () => {
	it('return initial state', () => {
		expect(reducer(undefined, {})).toEqual(state)
	})

	it('handle ADD_HIVES', () => {
		const dispatched = {
			type: types.ADD_HIVES,
			payload: [{ id: 1 }],
		}

		const newState = reducer(undefined, dispatched)

		expect(newState).toHaveProperty('hives', dispatched.payload)
		expect(newState.hiveActionItem).toHaveProperty('action', 'add')
		expect(newState.hiveActionItem).toHaveProperty(
			'hives',
			dispatched.payload,
		)
	})

	it('handle UPDATE_HIVE', () => {
		const dispatched = {
			type: types.UPDATE_HIVE,
			payload: {
				index: 0,
				hive: [{ id: 1 }],
			},
		}

		const newState = reducer(undefined, dispatched)

		expect(newState).toHaveProperty('hives', dispatched.payload.hive)
		expect(newState.hiveActionItem).toHaveProperty('action', 'update')
		expect(newState.hiveActionItem).toHaveProperty(
			'hives',
			dispatched.payload.hive,
		)
	})

	it('hande REMOVE_HIVE', () => {
		state.hives.push({ id: 1 })
		const dispatched = {
			type: types.REMOVE_HIVE,
			payload: 1,
		}

		const newState = reducer(state, dispatched)

		expect(newState).toHaveProperty('hives', [])
		expect(newState.hiveActionItem).toHaveProperty('action', 'remove')
		expect(newState.hiveActionItem).toHaveProperty(
			'hives',
			dispatched.payload,
		)
	})
})
