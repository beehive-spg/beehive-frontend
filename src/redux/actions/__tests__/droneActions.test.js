import * as types from 'constants/actionTypes'
import * as actions from '../droneActions'
const dispatch = jest.fn()

beforeEach(() => {
	dispatch.mockClear()
})

const drones = [
	{
		id: '2102052118',
		from: {
			location: 'Museum',
			longitude: 16.347037799999953,
			latitude: 48.1987534,
		},
		to: {
			location: 'Krankenhaus',
			longitude: 16.344824700000004,
			latitude: 48.1924122,
		},
		route: [['16.34704', '48.19875'], ['16.34704', '48.19875']],
		radius: 20,
		color: [0, 0, 0],
	},
]

it('add new drone with newDronesAction()', () => {
	const droneStore = []

	const thunk = actions.newDronesAction(drones, droneStore)
	thunk(dispatch)

	const calls = dispatch.mock.calls
	expect(calls.length).toBe(1)
	//expect(calls[0][0].type).toBe(types.ADD_DRONES)
	expect(calls[0][0]).toHaveProperty('type', types.ADD_DRONES)
	expect(calls[0][0].payload).toBe(drones)
})

it('update drone with newDronesAction()', () => {
	const droneStore = drones

	const thunk = actions.newDronesAction(drones, droneStore)
	thunk(dispatch)

	const calls = dispatch.mock.calls
	expect(calls.length).toBe(1)
	expect(calls[0][0]).toHaveProperty('type', types.UPDATE_DRONE)
	expect(calls[0][0].payload).toHaveProperty('index')
	expect(calls[0][0].payload).toHaveProperty('drone', drones)
})

it('remove drone with removeDroneAction()', () => {
	const removed = actions.removeDroneAction(drones[0])

	expect(removed).toHaveProperty('type', types.REMOVE_DRONE)
	expect(removed).toHaveProperty('payload', drones[0])
})
