# movies-api

To start the server, run cmd: **node app.js**



To get the best possible list of selected movies,
send input movies list as req body in following format:

{

	"movies": [
	
		{"name": "Bala", "startDate": "8 Jan 2021", "endDate": "28 Jan 2021"},
		
		{"name": "Rock", "startDate": "20 Jan 2021", "endDate": "30 Jan 2021"},
		
		{"name": "Policy Maker", "startDate": "29 Jan 2021", "endDate": "16 Feb 2021"},
		
		{"name": "Brave", "startDate": "02 Feb 2021", "endDate": "14 Feb 2021"}
		
	]
	
	
}

API endpoint: '/', Method: POST
