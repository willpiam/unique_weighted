/*
	testing grounds for unique generation of something
	William Doyle
	Jun 22nd 2021
*/

/*
	possable selection values and the weights they put on the probability of the next selection values
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

/*
	GetNextWithWeights()
	takes:	1 string representing the value of the previous element
	gives:	string to be used as next element value
	William Doyle
	~June 23rd 2021
*/
function GetNextWithWeights(prevType) {
	// 1. Get the weights
	const weights = types.find(t => t.name == prevType).weights;

	// 2. pick a value between 0 and 100
	const selector = Math.floor(Math.random() * 100);

	const keys = Object.keys(weights);
	const keyValuePairs = keys.map(key => { return { key: key, value: weights[key] } });
	const sorted = [...keyValuePairs].sort((a, b) => a.value - b.value)

	// goal:: remove all non-constant variables (this `let` has to go)
	for (let i = 0; i < sorted.length; i++) {
		if (selector < sorted[i].value)
			return sorted[i].key;
	}
	return sorted[sorted.length - 1].key;
}

/*
	calculateSpecialness()
	William Doyle
	~June 23rd 2021
*/
function calculateSpecialness(selection) {
	const sarr = selection.map((el, i) => {
		if (i == 0)
			return 0; // no points for first element
		return 1 / types.find(t => t.name == selection[i - 1]).weights[el];
	});

	console.log(sarr);
	const specialsum = sarr.reduce((ac, el) => ac + el);
	console.log(specialsum);
	return specialsum;
}

/*
	main()
	William Doyle
	~June 23rd 2021
*/
function main() {

	const devised = [];
	// goal:: get ride of all non-constant variables (this `let` has to go)
	for (let i = 0; i < types.length; i++) {
		if (i == 0) {
			// choose first element with even distribution
			devised.push(types[Math.floor(Math.random() * 6)].name);
			continue;
		}
		devised.push(GetNextWithWeights(devised[i - 1]));
	}

	console.log(devised);
	//console.log(`Your set -> ${devised}`);

	console.log(`\nspecialness: ${calculateSpecialness(devised)}`);

	//console.log(`\n\t~~Weighted sums~~`);
	//types.forEach(t => console.log(`\t${t.name.padEnd(14, '.')} ${Object.values(t.weights).reduce((acc, curval) => acc + curval)}`));
}

//for (let i = 0; i < 144; i++)
main();


console.log(`test with rarest combination`);
const veryRare = ['strange', 'up', 'bottom', 'bottom', 'bottom', 'bottom'];
console.log(`very rare -> ${calculateSpecialness(veryRare)}`);