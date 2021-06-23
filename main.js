/*
	testing grounds for unique generation of something
	William Doyle
	Jun 22nd 2021
*/

const types = [
	{
		name: 'up',
		weights: {
			up: 100 / 2,
			down: 100 / 4,
			charm: 100 / 8,
			strange: 100 / 16,
			top: 100 / 32,
			bottom: 100 / 64,
		}
	},
	{
		name: 'down',
		weights: {
			up: 100 / 4,
			down: 100 / 8,
			charm: 100 / 16,
			strange: 100 / 32,
			top: 100 / 64,
			bottom: 100 / 2,
		}
	},
	{
		name: 'charm',
		weights: {
			up: 100 / 32,
			down: 100 / 8,
			charm: 100 / 4,
			strange: 100 / 16,
			top: 100 / 64,
			bottom: 100 / 2,
		}
	},
	{
		name: 'strange',
		weights: {
			up: 100 / 64,
			down: 100 / 2,
			charm: 100 / 16,
			strange: 100 / 8,
			top: 100 / 4,
			bottom: 100 / 32,
		}
	},
	{
		name: 'top',
		weights: {
			up: 100 / 4,
			down: 100 / 2,
			charm: 100 / 16,
			strange: 100 / 8,
			top: 100 / 64,
			bottom: 100 / 32,
		}
	},
	{
		name: 'bottom',
		weights: {
			up: 100 / 2,
			down: 100 / 4,
			charm: 100 / 8,
			strange: 100 / 16,
			top: 100 / 32,
			bottom: 100 / 64
		}
	},
];

let devised = [];

function GetNextWithWeights(prevType) {
	// 1. Get the weights
	console.log(`prevType is ${prevType}`);
	const weights = types.find(t => t.name == prevType).weights;

	// 2. pick a value between 0 and 100
	const selector = Math.floor(Math.random() * 100);

	const keys = Object.keys(weights);
	const keyValuePairs = keys.map(key => { return { key: key, value: weights[key] } });
	const sorted = [...keyValuePairs].sort((a, b) => a.value - b.value)

	for (let i = 0; i < sorted.length; i++) {
		if (selector < sorted[i].value)
			return sorted[i].key;
	}
	return sorted[sorted.length - 1].key;
}

function calculateSpecialness(selection) {
	return undefined;
}

for (let i = 0; i < 6; i++) {
	if (i == 0) {
		// choose with even distribution
		devised = [...devised, types[Math.floor(Math.random() * 6)].name];
		continue;
	}
	devised = [...devised, GetNextWithWeights(devised[i - 1])];
}

console.log(`Your set -> ${devised}`);

console.log(`\nspecialness: ${calculateSpecialness(devised)}`);

console.log(`\n\t~~Weighted sums~~`);
types.forEach(t => console.log(`\t${t.name.padEnd(14, '.')} ${Object.values(t.weights).reduce((acc, curval) => acc + curval)}`));