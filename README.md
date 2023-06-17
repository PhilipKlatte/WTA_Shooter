# Undead Revenge
a fun zombie shooter reminiscent of early internet flash games <br /><br />

kill as many zombies in one go as you can <br /><br />

the latest stable release can be found [here](http://undeadrevenge.dasallergroesstehaus.com/)

## Version
1.0

## Date 
15.05.2023-

## Authors
Moritz Hegmann, Philip Klatte

## How to play
Controls: <br />
Key  | Function
-----|---------
`W`  | move player up
`A`  | move player left
`S`  | move player down
`D`  | move player right
`I`  | shoot up
`J`  | shoot left
`K`  | shoot down
`L`  | shoot right
`1`  | mute/unmute music
`2`  | mute/unmute sounds
`R`  | restart game
`Esc`| pause/unpause game

- zombies will wander around until they see you, then they will chase you until they loose track
- For every zombie you kill, a new one will spawn and by a chance of 10% the number of zombies will increase
- barrels will explode if you shoot them
- You can strategically place barrels by running into them
- Every 30 seconds 2 new barrels will appear

## Bugs
1. Barrels can get stuck in the player if pushed diagonally against walls
2. Zombies can spawn underneath the map

## Browsercompatibility
Chrome, Edge, Firefox <br />
Safari can struggle with performance

## Credits
Moritz Hegmann: <br />
- smart zombie movement
- zones property as array
- wallbug fix
- zombie following player
- health points

Philip Klatte: <br />
- player movement
- spawn barrels
- grid implementation
- exploding barrels
- music
- sounds
- sprites implementation
- zombie view
- shoot mechanics

Moritz Hegmann & Philip Klatte: <br />
- titlescreen
- move barrels
- universal collision

Felix Winkelbach: <br />
- zombie sprites
- player sprites
- explosion sprites

## License
MIT License, Copyright © 2023 PhilipKlatte
