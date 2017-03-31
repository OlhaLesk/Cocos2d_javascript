var res = {
    Background_png : "res/Background.png",
    Coin_png       : "res/Coin.png",
    tile_0_png     : "res/Seed01_01.png",
    tile_1_png     : "res/Seed01_02.png",
    tile_2_png     : "res/Seed02_01.png",
    tile_3_png     : "res/Seed02_02.png",
    tile_4_png     : "res/Seed03_01.png",
    tile_5_png     : "res/Seed03_02.png",
    tile_6_png     : "res/Seed04_01.png",
    tile_7_png     : "res/Seed04_02.png"
};

// it stores the assets to preload
var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
