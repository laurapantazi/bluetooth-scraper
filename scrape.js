var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var services = [];
var characteristics = [];
var URL = 'https://www.bluetooth.com/specifications/gatt/';

request({
	url:'https://www.bluetooth.com/specifications/gatt/services',
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

		services.push({name: name, uuid: uuid, link: link, identifier: identifier});
	})

	var strservices = JSON.stringify(services);
	fs.writeFile('services.json',strservices, (error)=>{
		if (error) throw error;
	});
})
var URL = 'https://www.bluetooth.com/specifications/gatt/';
request({
	url:'https://www.bluetooth.com/specifications/gatt/characteristics',
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

		characteristics.push({name: name, uuid: uuid, link: link, identifier: identifier});
	})

	var strcharacteristics = JSON.stringify(characteristics);
	fs.writeFile('characteristics.json',strcharacteristics, (error)=>{
		if (error) throw error;
	});
})