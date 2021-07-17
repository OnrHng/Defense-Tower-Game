var scenes = {preload: preload, create: create, update: update};
var game = new Phaser.Game(1280,960, Phaser.AUTO, 'cityConstructor',scenes);

const TILESIZE = 64;

let map;
var groundLayer;
var roadLayer;
var envLayer;

var marker;
var currentTile;
var cursors;
 
function preload () {
    game.load.tilemap('map-1', './assets/map-1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', './assets/tilesheet.png');
}

function create () {
    map = game.add.tilemap('map-1');

    map.addTilesetImage('tilesheet', 'tiles');

    // currentTile = map.getTile(2, 3);

    groundLayer = map.createLayer('ground');
    groundLayer.resizeWorld();

    roadLayer = map.createLayer('road');
    roadLayer.resizeWorld();

    envLayer = map.createLayer('env');
    envLayer.resizeWorld();

    marker = game.add.graphics();
    marker.lineStyle(2, 0x000000, 1);
    marker.drawRect(0, 0, TILESIZE, TILESIZE);

    cursors = game.input.keyboard.createCursorKeys();

}

function update () {
    marker.x = groundLayer.getTileX(game.input.activePointer.worldX) * TILESIZE;
    marker.y = groundLayer.getTileY(game.input.activePointer.worldY) * TILESIZE;

    if (game.input.mousePointer.isDown)
    {
        if (game.input.keyboard.isDown(Phaser.Keyboard.SHIFT))
        {
            currentTile = map.getTile(groundLayer.getTileX(marker.x), groundLayer.getTileY(marker.y));
        }
        else
        {
            if (map.getTile(groundLayer.getTileX(marker.x), groundLayer.getTileY(marker.y)).index != currentTile.index)
            {
                map.putTile(currentTile, groundLayer.getTileX(marker.x), groundLayer.getTileY(marker.y));
            }
        }
    }

    if (cursors.left.isDown)
    {
        game.camera.x -= 4;
    }
    else if (cursors.right.isDown)
    {
        game.camera.x += 4;
    }

    if (cursors.up.isDown)
    {
        game.camera.y -= 4;
    }
    else if (cursors.down.isDown)
    {
        game.camera.y += 4;
    }


}