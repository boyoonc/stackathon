arr = [comp1:{name: 1, size:5}, comp2:{name:2, size:10}, ... ]

level2dict = {
1A: {name: bucket1a, childern:[]},
1B: {name: bucket1b, childern:[]},
2A: {name: bucket1b, childern:[]}
	}

level1dict = {
	1: {name: bucket1, children:[]},
	2: {name: bucket1, children:[]},
}

root = {
	name: root,
	children:[]
}

map = {comp1:1A, comp2:2A}

for key in arr:
	company = key
	targetValue = map[key]
	targetDict = level2dict[targetValue]
	targetDict[children].append(array[company]) //figure out
	nextTargetValue = targetValue[:-1]
	nextTargetDict = level1dict[nextTargetValue]
	nextTargetDict[children].append(targetDict)

for each in level1dict:
	root[children].append(level1dict[each])


//got this
level2dict = {
1A: {name: bucket1a, childern:[comp1:{name: 1, size:5}]},
1B: {name: bucket1b, childern:[]},
2A: {name: bucket1b, childern:[comp2:{name:2, size:10}]}
	}
