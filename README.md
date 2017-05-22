Mi-Light
========

Ce plugin est un add-on pour le framework [Avatar](https://github.com/Spikharpax/Avatar-Serveur)

Il permet le contrôle des ampoules RGBW Wifi Mi-Light.


![GitHub Logo](/logo/milight.jpg)


## Installation

- Dézippez le fichier `Avatar-Plugin-milight-Master.zip` dans un répertoire temporaire
- Copiez le répertoire `milight` dans le répertoire `Avatar-Serveur/plugins`
- Copiez le fichier `intents/intent.rgb.js` dans le répertoire `Avatar-Serveur/ia/intents/`
- Copiez le fichier `actions/action.milight.js` dans le répertoire `Avatar-Serveur/ia/actions/`
- Editez le fichier `Avatar-Serveur/ia/actions/index.js`, allez à la fin du fichier et juste avant `function _interopRequireDefault(obj)` ajoutez les lignes suivantes:

```javascript
var _actionMilight = require('./action.milight');

Object.defineProperty(exports, 'milight', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_actionMilight).default;
  }
});

// Fin du fichier...
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
```

- Editez le fichier `Avatar-Serveur/ia/intents/index.js`, allez à la fin du fichier et juste avant `function _interopRequireDefault(obj)` ajoutez les lignes suivantes:

```javascript
var _intentMilight = require('./intent.rgb');

Object.defineProperty(exports, 'rgb', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_intentMilight).default;
  }
});

// Fin du fichier...
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
```

- Editez le fichier `Avatar-Serveur/ia/index.js`
	- Ajoutez dans l'import des intents, l'intent `rgb`
	- Ajoutez dans l'import des actions, l'action `milight`
	- Ajoutez dans la fonction export.intent(), l'association intention-action

```javascript
import { rgb, weather, hour,  blague, manageAvatar, translate, lastAction, intentEnd} from './intents';
import { milight, forecastMsn, forecastYahoo, worldHour, jokeOfDay, avatarRules, translator, backupAction, actionEnd} from './actions';


exports.intent = function () {

	// Configure the intents
	ava
	 .intent(translate, translator)
	 .intent(hour, worldHour)
	 .intent(weather, [forecastYahoo, forecastMsn])
	 // Déclaration Mi-Light ICI !!!
	 .intent(rgb, milight)
	 .intent(blague, jokeOfDay)
	 .intent(manageAvatar, avatarRules)
	 .intent(lastAction, backupAction)
	 .intent(intentEnd, actionEnd)  // Toujours à la fin, controle si une règle est passée
}
```


## Configuration

La configuration du plugin se fait dans le fichier `Avatar-Serveur/plugins/milight/milight.prop`

### Adresse IP du contrôleur
Ajoutez dans la propriété "ip", l'adresse IP de votre contrôleur Mi-Light.

Exemple
```xml
"ip": "192.168.0.10",
```	

Si vous ne connaissez pas l'adresse IP du contrôleur, vous pouvez utilisez la règle "donnes-moi les informations du rgb". Avatar vous retournera sur la console l'adresse IP du contrôleur Mi-Light qui se trouve sur votre réseau Wifi.

Si vous désirez garder les autres infos affichées pour informations (elles ne sont pas utilisées), vous pouvez les ajoutez dans les autres propriétés "mac" et "name".

**Important**
Ce plugin est défini pour fonctionner avec le contrôleur Mi-Light version **v6** (La version est affichée dans la console avec les autres informations).

Pour piloter un contrôleur plus ancien, voir la documentation de [node-milight-promise](https://github.com/mwittig/node-milight-promise).


### zone

Une seule zone est définie dans ce plugin (la zone 1).

Ajoutez dans la propriété "zone", la zone Mi-Light associée aux actions des règles.

Exemple
```xml
"zone": 1,
```	
	

## Les règles	

Les règles sont définies dans le fichier `Avatar-Serveur/plugins/milight/milight.prop` dans les tableaux suivants:
- "rules" : Les commandes simples ("On","Off", "mets le rgb en blanc")
- "lightColor" : Toutes les règles de couleurs. A gauche, la couleur rgb, à droite, le tableau de syntaxe des règles associées.

### Règles simples
- "Donnes-moi les informations du rgb"	
- "Eteins le rgb"
- "Allume le rgb"
- "Mets le rgb en blanc"

### Règles de couleurs
- "Mets le rgb en bleu"
- "Mets le rgb en jaune"
- "Mets le rgb en magenta"	
- "Mets le rgb en vert"	

Vous pouvez ajouter des couleurs, les modifier...

	

## Versions

Version 1.0 - 14/05/2017
- Initial version