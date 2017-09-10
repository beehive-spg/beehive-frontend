const hives = [
	{
		id: 1,
		location: 'hütteldorf',
		coordinates: {
			longitude: 16.271334,
			latitude: 48.20962,
		},
	},
	{
		id: 2,
		location: 'leopoldau',
		coordinates: {
			longitude: 16.451428,
			latitude: 48.277378,
		},
	},
	{
		id: 3,
		location: 'spengergasse',
		coordinates: {
			longitude: 16.3568,
			latitude: 48.1857,
		},
	},
	{
		id: 4,
		location: 'karlsplatz',
		coordinates: {
			longitude: 16.3709,
			latitude: 48.2003,
		},
	},
]

const resolvers = {
	Query: {
		hives: () => hives,
		hive: (_, { id }) => hives.find(hive => hive.id == id),
	},
	Mutation: {
		addHive: (_, { hive }) => {
			hives.push(hive)
			return hive
		},
		updateHive: (_, { id, location }) => {
			const index = hives.findIndex(hive => hive.id == id)
			hives[index].location = location
			return hives[index]
		},
	},
}

export default resolvers
