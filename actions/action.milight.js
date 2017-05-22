'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('../../node_modules/ava-ia/lib/helpers');

exports.default = function (state) {
	
	return new Promise(function (resolve, reject) {
			
		var match, command;
		var periphs = Config.modules.milight.intentRules;
		
		if (state.debug) info('sentence:', state.sentence);
		if (state.debug) info('state.tokens:', state.tokens);
		if (state.debug) info('state.tags:', state.tags);
		
		for (var i=0; i<periphs.length && !match; i++) {
			 for (var rule in Config.modules.milight[periphs[i]]) {
				 if (rule != 'command') {
					match = (0, _helpers.syntax)(state.sentence, Config.modules.milight[periphs[i]][rule]); 
					if (match) {
						command = (Config.modules.milight[periphs[i]].command) ? Config.modules.milight[periphs[i]].command : rule;
						break;
					}
				 }
			 }
		}
		
		 setTimeout(function(){ 			
			if (match) {
				
				if (state.debug) info('ActionMilight'.bold.yellow, 'action:', command.yellow);
				
					state.action = {
						module: 'milight',
						command: command,
						rgb: rule						
					};	
			}		
				
			resolve(state);	
		}, 500);
	});
};
