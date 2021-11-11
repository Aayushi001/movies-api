
const defaultMovies = [
	{name: 'Bala', startDate: '8 Jan 2021', endDate: '28 Jan 2021'},
	{name: 'Rock', startDate: '20 Jan 2021', endDate: '30 Jan 2021'},
	{name: 'Policy Maker', startDate: '29 Jan 2021', endDate: '16 Feb 2021'},
	{name: 'Brave', startDate: '02 Feb 2021', endDate: '14 Feb 2021'},
	{name: 'Drive', startDate: '10 Feb 2021', endDate: '18 Feb 2021'},
	{name: 'Race', startDate: '15 Feb 2021', endDate: '28 Feb 2021'},
]

let ctrl = {
  getMaxMovies: (req, res, next) => {
		const allMovies = defaultMovies;
		let s = 1;
		let e = 0;
		const conflicts = {};
		while (s <= allMovies.length - 1 && e < allMovies.length - 1 && s>e) {
			// conflict if current Start < previous End
			console.log('---------s', s, e)
			if (new Date(allMovies[s].startDate) <= new Date(allMovies[e].endDate) && s !== e) {
				if (!conflicts[allMovies[s].name])
					conflicts[allMovies[s].name] = [];
				if (!conflicts[allMovies[e].name])
					conflicts[allMovies[e].name] = [];
				conflicts[allMovies[s].name].push(allMovies[e].name);
				conflicts[allMovies[e].name].push(allMovies[s].name);
				if (s == allMovies.length - 1) {
					e++;
					s = e + 1;
				}
				else {
					s++;
				}
			}
			else {
				e++;
				s = e + 1;
			}
		}
		console.log('-----conflicts', conflicts);
		res.send(conflicts);

	}
}


module.exports = ctrl;