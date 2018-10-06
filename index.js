var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var scrape = require('./scrape');
const port = process.env.PORT || 4000;

app.listen(port, function(){ 
	console.log("App running on port"+port)
});
var URL = 'https://www.bluetooth.com/specifications/gatt/';


app.get('/', function(req, res){
	res.send('Bluetooth Scraper');
})

app.get('/services/:uuid', function(req, res){
	getName(req, res, 'https://www.bluetooth.com/specifications/gatt/services');
})
app.get('/characteristics/:uuid', function(req, res){
	getName(req, res, 'https://www.bluetooth.com/specifications/gatt/characteristics');
})

app.get('/services', function(req, res){
	getFile(req,res,'https://www.bluetooth.com/specifications/gatt/services','services.json');
})
app.get('/characteristics', function(req,res){
	getFile(req,res,'https://www.bluetooth.com/specifications/gatt/characteristics','characteristics.json');
})

var getName = function(req, res, url){
	var found = 'Not found';
	request({
		url,
		jar:true
	},
	function(error, response, html){
		var $ = cheerio.load(html);
		var $items = $('tbody tr');

		$items.each(function(i, tr){
			var $this = $(this);
			var a = $(this).find('a');
			var name = a.text();
			var link = URL+a.attr('href');
			var identifier = $(tr).children('td').eq(1).text();
			var uuid = $(tr).children('td').eq(2).text();
			var specification = $(tr).children('td').eq(3).text();
			
			if (uuid == req.params.uuid){
				found = name;			
			}
		})
		res.send(found);

	})
}

var getFile = function(req, res, url, fileName){
	var data = [];

	request({
			url,
			jar:true
		},
		function(error, response, html){
			var $ = cheerio.load(html);
			var $items = $('tbody tr');

			$items.each(function(i, tr){
				var $this = $(this);
				var a = $(this).find('a');
				var name = a.text();
				var link = URL+a.attr('href');
				var identifier = $(tr).children('td').eq(1).text();
				var uuid = $(tr).children('td').eq(2).text();
				var specification = $(tr).children('td').eq(3).text();

				data.push({name: name, uuid: uuid, link: link, identifier: identifier});
			})

			var str = JSON.stringify(data) + '\n';
			fs.writeFile(fileName, str, (error)=>{
				if (error) throw error;
			});
			res.json(data);
		})
}
