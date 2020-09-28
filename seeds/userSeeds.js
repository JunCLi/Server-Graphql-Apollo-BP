const userSeeds = [
  {
		id: 'VIJb4ld/d2Qxvwq0CsjKJnLL',
		first_name: 'Simon',
		last_name: ' Stern',
    email: 'simon@stern.com',
    password: '$2b$12$fNnGo60D/19iB6U0yKg8H.jzp.vlKR3oAQNUVJsX3uKz9qeihZSyC',
  },
  {
		id: 'nEEPTwSIxoc6ym4oziaNlUs4',
		first_name: 'Akshay',
		last_name: 'Manchanda',
    email: 'akshay@manchanda.com',
    password: '$2b$12$rglqSuxQbiGZJJy/DtKwbuDsEv55RzpcTw2iDmd9ccy8vIrukCCrK',
  },
  {
		id: 'uaJvV22Ufd7/gHoeOwYIYkt2',
		first_name: 'Alam',
		last_name: 'Talash',
    email: 'alam@talash.com',
    password: '$2b$12$m2LQjNXYwnTZKXfql66Nb.H4OUheGewIaUc9E/z5mWsxbeBKphnja',
	},
	{
		id: 'Ywlr7vxXm304TmiakhTQ6ZFL',
		first_name: 'Person1',
		last_name: 'Someone',
    email: 'person1@person.com',
    password: '$2b$12$g6E5here.8d2AKSFA/8xPeDW4ZajdKDvVJ.QJklm9wZ6IE8U9OVom',
	}
]

module.exports = {
	table: 'users',
	seeds: userSeeds,
}