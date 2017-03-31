var res = {
    BackgroundTileMap : "res/backgroundTileMap.tmx",
    Background_png    : "res/Background.png",
    Coin_png          : "res/Coin.png",
    Wheat_01_png      : "res/Seed01_01.png",
    Wheat_02_png      : "res/Seed01_02.png",
    Strawberry_01_png : "res/Seed02_01.png",
    Strawberry_02_png : "res/Seed02_02.png",
    Carrot_01_png     : "res/Seed03_01.png",
    Carrot_02_png     : "res/Seed03_02.png",
    Cabbage_01_png    : "res/Seed04_01.png",
    Cabbage_02_png    : "res/Seed04_02.png"
};

// it stores the assets to preload
var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
