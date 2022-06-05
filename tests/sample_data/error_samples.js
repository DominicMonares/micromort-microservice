const commuterId1 = {
	"commuterID": "COM-Z",
	"actions": [{
		"ts": "2022-02-01 8:40:00",
		"action": "drove a car",
		"unit": "mile",
		"quantity": 67
	}]
}

const commuterId2 = {
	"commuterID": "MOC-1",
	"actions": [{
		"ts": "2022-02-01 8:40:00",
		"action": "drove a car",
		"unit": "mile",
		"quantity": 67
	}]
}

const timestamps = {
	"commuterID": "COM-42",
	"actions": [{
			"ts": "2022-01-01 10:05:11",
			"action": "walked on sidewalk",
			"unit": "mile",
			"quantity": 0.4
		},
		{
			"ts": "2022-01-11 10:16:52",
			"action": "took a bus",
			"unit": "mile",
			"quantity": 12
		}
	]
}

const units = {
	"commuterID": "COM-64",
	"actions": [{
			"ts": "2022-01-01 10:05:11",
			"action": "jogged",
			"unit": "mile",
			"quantity": 67
		},
		{
			"ts": "2022-01-01 10:16:52",
			"action": "scuba dove through a cave",
			"unit": "lightyear",
			"quantity": 20
		},
		{
			"ts": "2022-01-01 10:45:45",
			"action": "walked up stairs",
			"unit": "floor",
			"quantity": 120
		}
	]
}

module.exports = {
  commuterId1 = commuterId1,
  commuterId2 = commuterId2,
  timestamps = timestamps,
  units = units
}
