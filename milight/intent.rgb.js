'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('../../node_modules/ava-ia/lib/helpers');

exports.default = function (state, actions) {
	  
	if (state.isIntent) return (0, _helpers.resolve)(state);
	 
	var match,
	periphs = Config.modules.milight.intentRules;

	for (var i=0; i<periphs.length && !match; i++) {
		 for (var rule in Config.modules.milight[periphs[i]]) {
			 if (rule != 'command') {
				match = (0, _helpers.syntax)(state.sentence, Config.modules.milight[periphs[i]][rule]); 
				if (match) break;
			 }
		 }
	}

	if (match) {
		if (state.debug) info('IntentMilightRules'.bold.green, 'syntax:', 'true'.green);
		state.isIntent = true;
		return (0, _helpers.factoryActions)(state, actions);
	} else 
		return (0, _helpers.resolve)(state);
	
  
};