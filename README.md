Mi-Light
========

Ce plugin est un add-on pour le framework [Avatar](https://github.com/Spikharpax/Avatar-Serveur)

Il permet le contrôle des ampoules RGBW Wifi Mi-Light.

![GitHub Logo](/logo/milight.jpg)


## Installation
- Dézippez le fichier `Avatar-Plugin-milight-Master.zip` dans un répertoire temporaire
- Copiez le répertoire `milight` dans le répertoire `Avatar-Serveur/plugins`


## Configuration

La configuration du plugin se fait dans le fichier `Avatar-Serveur/plugins/milight/milight.prop`

### Adresse IP du contrôleur
Ajoutez dans la propriété "ip", l'adresse IP de votre contrôleur Mi-Light.

Exemple
```xml
"ip": "192.168.0.10",
```	

Si vous ne connaissez pas l'adresse IP du contrôleur, vous pouvez utiliser la règle "donnes-moi les informations du rgb". Avatar vous retournera sur la console l'adresse IP du contrôleur Mi-Light qui se trouve sur votre réseau Wifi.

Si vous désirez garder les autres infos affichées pour information (elles ne sont pas utilisées), vous pouvez les ajouter dans les autres propriétés "mac" et "name".

**Important:** Ce plugin fonctionne avec le contrôleur Mi-Light version **v6** (La version est affichée dans la console avec les autres informations). Pour piloter un contrôleur plus ancien, voir la documentation de [node-milight-promise](https://github.com/mwittig/node-milight-promise).


### zone

Une seule zone peut être pilotée dans ce plugin.

Mettez dans la propriété "zone", la zone Mi-Light associée aux actions des règles.

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
Version 1.1 (03-11-2017)
- Les fichiers intent et action déplacés dans le répertoire du plugin. Chargés automatiquement (Avatar serveur 0.1.5)

Version 1.0 - 14/05/2017
- Initial version