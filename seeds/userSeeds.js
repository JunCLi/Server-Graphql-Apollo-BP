const userSeeds = [
  {
		id: 'oEYInOxNe3MryevgGUYeM8DC',
		first_name: 'Linus',
		last_name: ' Sebastion',
    email: 'LinusSebastion@LTTStore.com',
    password: '$2b$12$fNnGo60D/19iB6U0yKg8H.jzp.vlKR3oAQNUVJsX3uKz9qeihZSyC',
  },
  {
		id: 'sfmpHQic9II9o35xcFiF5Lyl',
		first_name: 'James',
		last_name: 'Strieb',
    email: 'JamesStrieb@LTTStore.com',
    password: '$2b$12$rglqSuxQbiGZJJy/DtKwbuDsEv55RzpcTw2iDmd9ccy8vIrukCCrK',
  },
  {
		id: '2XdfHBF0dTa0WEPsCc5nnlh2',
		first_name: 'Riley',
		last_name: 'Murdock',
    email: 'RileyMurdock@LTTStore.com',
    password: '$2b$12$m2LQjNXYwnTZKXfql66Nb.H4OUheGewIaUc9E/z5mWsxbeBKphnja',
	},
	{
		id: 'EzxaYt8R0x3fKnHlVPopDU6A',
		first_name: 'Alex',
		last_name: 'Clark',
    email: 'AlexClark@LTTStore.com',
    password: '$2b$12$g6E5here.8d2AKSFA/8xPeDW4ZajdKDvVJ.QJklm9wZ6IE8U9OVom',
	}
]

module.exports = {
	table: 'users',
	seeds: userSeeds,
}