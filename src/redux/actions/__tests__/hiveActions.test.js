import * as types from 'constants/actionTypes'
import * as actions from '../hiveActions'
const dispatch = jest.fn()

beforeEach(() => {
	dispatch.mockClear()
})
const hives = [
	{
		id: '0',
		location: 'Spengergasse',
		data: [
			{
				position: [16.3568, 48.1857],
				radius: 15,
				color: [255, 255, 255],
			},
			{
				position: [16.3568, 48.1857],
				radius: 15,
				color: [217, 71, 31],
			},
		],
	},
]

it('add multiple new hives from newHivesAction()', () => {
	const multHives = [...hives, ...hives]
	const hiveStore = []

	const thunk = actions.newHivesAction(multHives, hiveStore)
	thunk(dispatch)

	const calls = dispatch.mock.calls

	expect(calls.length).toBe(1)
	expect(calls[0][0]).toHaveProperty('type', types.ADD_HIVES)
	expect(calls[0][0]).toHaveProperty('payload', multHives)
})

it('add new hive from newHivesAction()', () => {
	const hiveStore = []

	const thunk = actions.newHivesAction(hives, hiveStore)
	thunk(dispatch)

	const calls = dispatch.mock.calls

	expect(calls.length).toBe(1)
	expect(calls[0][0]).toHaveProperty('type', types.ADD_HIVES)
	expect(calls[0][0]).toHaveProperty('payload', hives)
})

it('update hive from newHivesAction()', () => {
	const hiveStore = hives

	const thunk = actions.newHivesAction(hives, hiveStore)
	thunk(dispatch)

	const calls = dispatch.mock.calls

	expect(calls.length).toBe(1)
	expect(calls[0][0]).toHaveProperty('type', types.UPDATE_HIVE)
	expect(calls[0][0].payload).toHaveProperty('index')
	expect(calls[0][0].payload).toHaveProperty('hive', hives)
})

it('remove hive from removeHiveAction()', () => {
	const removed = actions.removeHiveAction(hives[0])

	expect(removed).toHaveProperty('type', types.REMOVE_HIVE)
	expect(removed).toHaveProperty('payload', hives[0])
})
