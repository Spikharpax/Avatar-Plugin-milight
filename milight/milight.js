var Milight = require('./node_modules/node-milight-promise/src/index').MilightController;
var commands = require('./node_modules/node-milight-promise/src/index').commandsV6;

require('colors');

exports.init = function(){
	
	// listen pour trigger
	Avatar.listen('Milight', function(data){
		switch (data.cmd) {
			case 'rgbOn' :
				switchLight(null, "On");
				break;
			case 'rgbOff' :
				switchLight(null, "Off");
				break;
			case 'hue' : 
				hue(null, data.rgb);
		}
	});
	
}

  
exports.action = function(data, callback){
	
	/*if (!Config.modules.milight.ip) {
		error("Milight", "L'adresse IP Milight est manquante".red);
		return callback();
	}*/
	
	var tblCommand = {
		rgbOn : function() { 
			switchLight(data.client, "On");
		},
		rgbOff : function() { 
			switchLight(data.client, "Off");
		},
		hue : function() { 
			hue(data.client, data.action.rgb);
		},
		whiteMode : function() { 
			whiteMode(data.client);
		},
		discover : function() { 
			discover(data.client);
		}
	};
	
	
	info("Milight command:", data.action.command.yellow, "From:", data.client.yellow);
	
	tblCommand[data.action.command]();
	callback();
}


function discover (client) {
	
	var discoverBridges = require('./node_modules/node-milight-promise/src/index').discoverBridges;

	discoverBridges({
		type: 'all'
	}).then(function (results) {
		info('Milight info:'.bold, results);
	});
	
	Avatar.speak("c'est fait, les infos sont sur la console", client, function() {  
		Avatar.Speech.end(client);
	});
	
}


function switchLight (client, value) {
	
	var light = new Milight({
		ip: Config.modules.milight.ip,
		type: 'v6'
	  }),
	  zone = Config.modules.milight.zone;
	  
	switch (value) {
		case "On" : 
		light.sendCommands(commands.rgbw.on(zone));
		break;
		default:
		case "Off":
		light.sendCommands(commands.rgbw.off(zone));
	}
	light.pause(1000);
	light.close().then(function () {
		 if (client)
			Avatar.speak("c'est fait", client, function() {  
				Avatar.Speech.end(client);
			});
	});
	
}


function hue (client, rgb) {
	
	var light = new Milight({
		ip: Config.modules.milight.ip,
		type: 'v6'
	  }),
	  zone = Config.modules.milight.zone;
		
	light.sendCommands(commands.rgbw.on(zone), commands.rgbw.hue(zone, rgb));
	light.pause(1000);
	light.close().then(function () {
		if (client)
			 Avatar.speak("c'est fait", client, function() {  
				Avatar.Speech.end(client);
			});
	});
	
}


function whiteMode (client) {
	
	var light = new Milight({
		ip: Config.modules.milight.ip,
		type: 'v6'
	  }),
	  zone = Config.modules.milight.zone;
	  
	light.sendCommands(commands.rgbw.on(zone), commands.rgbw.whiteMode(zone));
	light.pause(1000);
	light.close().then(function () {
		  Avatar.speak("c'est fait", client, function() {  
			Avatar.Speech.end(client);
		});
	});
}



