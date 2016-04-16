var express = require('express');
var url = require('url');
var app = express();

function beNatural(date){
	var a = new Date(date*1000);
	var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	var year = a.getFullYear();
	var month = months[a.getMonth()];
	var date = a.getDate();
	return month + ' ' + date + ', ' +year;
}

function beUnix(date){
	var d = new Date(date).getTime()/1000;
	return d;
}

app.get('/:date', function(req, res){
	var date = {};
  var tgl = req.params.date;

	if(/\s/g.test(tgl) == true){
		d = new Date(tgl);
		if(d != "Invalid Date"){
			date.unix = beUnix(tgl);
			date.natural = tgl;
		}else{
			date = null;
		}
	}else{
		d = new Date(tgl*1000);
		if(d != "Invalid Date"){
			date.unix = parseInt(tgl);
			date.natural = beNatural(tgl);
		}else{
			date = null;
		}
	}

	res.send(date);
});

app.listen(3000);
console.log('Application start at localhost:3000');
