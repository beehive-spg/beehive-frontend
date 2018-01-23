import * as types from 'constants/actionTypes'
import * as actions from '../infoActions'

it('change sidebar info from drones to droneports', () => {
	const sidebarInfo = 'Drones'
	const changed = actions.changeInfo(sidebarInfo)

	expect(changed).toHaveProperty('type', types.CHANGE_SIDEBAR_INFO)
	expect(changed).toHaveProperty('payload', 'Drone Ports')
})

it('change sidebar info from droneports to drones', () => {
	const sidebarInfo = 'Drone Ports'
	const changed = actions.changeInfo(sidebarInfo)

	expect(changed).toHaveProperty('type', types.CHANGE_SIDEBAR_INFO)
	expect(changed).toHaveProperty('payload', 'Drones')
})

it('change sidebar info from some string to drones', () => {
	const sidebarInfo = 'asdf'
	const changed = actions.changeInfo(sidebarInfo)

	expect(changed).toHaveProperty('type', types.CHANGE_SIDEBAR_INFO)
	expect(changed).toHaveProperty('payload', 'Drones')
})

it('dispatch selecting drone by id', () => {
	const id = 1
	const selected = actions.selectDrone(id)

	expect(selected).toHaveProperty('type', types.SELECT_DRONE)
	expect(selected).toHaveProperty('payload', id)
})
