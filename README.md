Mi-Light
========

Ce plugin est un add-on pour le pour le framework [Avatar](https://github.com/Spikharpax/Avatar-Serveur)

Il permet le contrôle des ampoules Mi-Light.


## Installation

- Dézippez le fichier `Avatar-Plugin-SonosPlayer-Master.zip` dans un répertoire temporaire
- Copiez le répertoire `SonosPlayer` dans le répertoire `Avatar-Serveur/plugins`
- Copiez le fichier `intents/intent.music.js` dans le répertoire `Avatar-Serveur/ia/intents/`
- Copiez le fichier `actions/action.sonos.js` dans le répertoire `Avatar-Serveur/ia/actions/`
- Editez le fichier `Avatar-Serveur/ia/actions/index.js`, allez à la fin du fichier et juste avant `function _interopRequireDefault(obj)` ajoutez les lignes suivantes

```javascript
var _actionSonos = require('./action.sonos');

Object.defineProperty(exports, 'Sonos', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_actionSonos).default;
  }
});

// Fin du fichier...
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
```

- Editez le fichier `Avatar-Serveur/ia/intents/index.js`, allez à la fin du fichier et juste avant `function _interopRequireDefault(obj)` ajoutez les lignes suivantes

```javascript
var _intentSonos = require('./intent.music');

Object.defineProperty(exports, 'music', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_intentSonos).default;
  }
});

// Fin du fichier...
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
```

- Editez le fichier `Avatar-Serveur/ia/index.js`
	- Ajoutez dans l'import des intents, l'intent `music`
	- Ajoutez dans l'import des actions, l'action `Sonos`
	- Ajoutez dans la fonction export.intent(), l'association intention-action

```javascript
import { music, weather, hour,  blague, manageAvatar, shoppingList, translate, lastAction, intentEnd} from './intents';
import { Sonos, forecastMsn, forecastYahoo, worldHour, jokeOfDay, avatarRules, shopping, translator, backupAction, actionEnd} from './actions';


exports.intent = function () {

	// Configure the intents
	ava
	 .intent(translate, translator)
	 .intent(hour, worldHour)
	 .intent(weather, [forecastYahoo, forecastMsn])
	 // Déclaration Sonos
	 .intent(music, Sonos)
	 .intent(blague, jokeOfDay)
	 .intent(manageAvatar, avatarRules)
	 .intent(shoppingList, shopping)
	 .intent(lastAction, backupAction)
	 .intent(intentEnd, actionEnd)  // Toujours à la fin, controle si une règle est passée
}
```


## Configuration
La configuration du plugin se fait dans le fichier `Avatar-Serveur/plugins/SonosPlayer/SonosPlayer.prop`

### Serveur/Port
Ce plugin utilise un listener configuré sur le port 8085, vous pouvez laisser celui par défaut où en choisir un autre.

```xml
"host": "localhost",
"port": "8085",
```	
	

## Versions

Version 1.0 - 14/05/2017
- Version Released