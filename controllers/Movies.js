const _ = require('lodash');

const defaultMovies = [
	{name: 'Bala', startDate: '8 Jan 2021', endDate: '28 Jan 2021'},
	{name: 'Rock', startDate: '20 Jan 2021', endDate: '30 Jan 2021'},
	{name: 'Policy Maker', startDate: '29 Jan 2021', endDate: '16 Feb 2021'},
	{name: 'Brave', startDate: '02 Feb 2021', endDate: '14 Feb 2021'},
	{name: 'Drive', startDate: '10 Feb 2021', endDate: '18 Feb 2021'},
	{name: 'Race', startDate: '15 Feb 2021', endDate: '28 Feb 2021'},
];

const sortByDates = (movies) => {
	movies.sort((pre, curr) => {
		let previousStart = new Date(pre.startDate).getTime();
		let currentStart = new Date(curr.startDate).getTime();
		if (previousStart <= currentStart) {
			return -1;
		}
		else {
			return 1;
		}
	})
}

let ctrl = {
  getMaxMovies: (req, res, next) => {
		const allMovies = _.get(req.body, 'movies', defaultMovies);
		sortByDates(allMovies);
		let start = 1;
		let end = 0;
		let conflicts = {};
		while (start <= allMovies.length - 1 && end < allMovies.length - 1 && start>end) {
			// conflict if current Start < previous End
			if (new Date(allMovies[start].startDate) <= new Date(allMovies[end].endDate) && start !== end) {
				if (!conflicts[allMovies[start].name])
					conflicts[allMovies[start].name] = [];
				if (!conflicts[allMovies[end].name])
					conflicts[allMovies[end].name] = [];
				conflicts[allMovies[start].name].push(allMovies[end].name);
				conflicts[allMovies[end].name].push(allMovies[start].name);
				if (start == allMovies.length - 1) {
					end++;
					start = end + 1;
				}
				else {
					start++;
				}
			}
			else {
				end++;
				start = end + 1;
			}
		}
		let max = -1;
		let maxConflictingMovie = '';
		while(max != 0) {
			const names = Object.keys(conflicts);
			max = 0;
			_.forEach(names, (name) => {
				if(conflicts[name].length > max) {
					max = conflicts[name].length;
					maxConflictingMovie = name;
				}
			});
			delete conflicts[maxConflictingMovie];
			_.forEach(names, (name) => {
				if (name in conflicts)
					conflicts[name] = conflicts[name].filter(f => f !== maxConflictingMovie);
			});
		}
		const selectedMovies = Object.keys(conflicts);
		res.send({selectedMovies, count: selectedMovies.length});
	}
}


module.exports = ctrl; 