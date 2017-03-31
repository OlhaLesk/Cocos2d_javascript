var strawberrySprite;
var wheatSprite;
var carrotSprite;
var cabbageSprite;
var profit;
var profitLabel;
var flyingCoin;

var ripeWheat;
var BackgroundLayer = cc.Layer.extend({
                                      ctor:function () {
                                      this._super();
                                      var size = cc.winSize;
                                      
                                      //  var backgroundLayer = cc.LayerColor.create(new cc.Color(40, 40, 40, 255), size.width, size.height);
                                      //                                      this.addChild(backgroundLayer);
                                      
                                      var gradient = cc.LayerGradient.create(cc.color(0, 0, 0, 255), cc.color(0x46, 0x82, 0xB4, 255)); //RGBA
                                      this.addChild(gradient);
                                      
                                      // add background
                                      for (i = 0; i < 16; i++)
                                      {
                                      var backgroundSprite = new MemoryTile();
                                      this.addChild(backgroundSprite, 0);
                                      backgroundSprite.setPosition(size.width / 3 + i % 4 * 105, 400 - Math.floor(i / 4) * 74);
                                      }
                                      
                                      // add the Coin icon
                                      var coinSprite = new cc.Sprite(res.Coin_png);
                                      coinSprite.attr({
                                                      x: size.width / 100 * 10,
                                                      y: size.height - size.height / 15
                                                      });
                                      this.addChild(coinSprite, 0);
                                      
                                      // add a label which shows "Money: "
                                      var moneyLabel = new cc.LabelTTF("Money: ", "Arial", 36);
                                      moneyLabel.x = size.width / 100 * 10 + coinSprite.width * 2;
                                      moneyLabel.y = size.height - size.height / 15; // 1/10
                                      // add the label as a child to this layer
                                      this.addChild(moneyLabel, 5);
                                      
                                      // add a label which shows the ammount of players money
                                      profit = 0;
                                      profitLabel = new cc.LabelTTF(profit.toString(), "Arial", 36);
                                      profitLabel.x = size.width / 100 * 10 + coinSprite.width + moneyLabel.width * 1.5;
                                      profitLabel.y = size.height - size.height / 15; // 1/10
                                      // add the label as a child to this layer
                                      this.addChild(profitLabel, 5);
                                      
                                      // add seed tiles
                                      for (i = 0; i < 4; i++)
                                      {
                                      switch (i) {
                                      case 0:
                                      wheatSprite = new cc.Sprite();
                                      wheatSprite.setTexture(res.Wheat_01_png);
                                      
                                      this.addChild(wheatSprite, 0);
                                      wheatSprite.setPosition(size.width / 3 + i % 4 * 105, 400 - Math.floor(i / 4) * 74);
                                      
                                      wheatSprite.tag = 0;
                                      Ripeness(wheatSprite.tag);
                                      break;
                                      case 1:
                                      strawberrySprite = cc.Sprite.create(res.Strawberry_01_png);
                                      this.addChild(strawberrySprite, 0);
                                      strawberrySprite.setPosition(size.width / 3 + i % 4 * 105, 400 - Math.floor(i / 4) * 74);
                                      
                                      strawberrySprite.tag = 2;
                                      Ripeness(strawberrySprite.tag);
                                      break;
                                      case 2:
                                      carrotSprite = cc.Sprite.create(res.Carrot_01_png);
                                      this.addChild(carrotSprite, 0);
                                      carrotSprite.setPosition(size.width / 3 + i % 4 * 105, 400 - Math.floor(i / 4) * 74);
                                      
                                      carrotSprite.tag = 4;
                                      Ripeness(carrotSprite.tag);
                                      break;
                                      case 3:
                                      cabbageSprite = cc.Sprite.create(res.Cabbage_01_png);
                                      this.addChild(cabbageSprite, 0);
                                      cabbageSprite.setPosition(size.width / 3 + i % 4 * 105, 400 - Math.floor(i / 4) * 74);
                                      
                                      cabbageSprite.tag = 6;
                                      Ripeness(cabbageSprite.tag);
                                      break;
                                      }
                                      }
                                      
                                      flyingCoin = new cc.Sprite(res.Coin_png);
                                      flyingCoin.setOpacity(0);
                                      this.addChild(flyingCoin, 0);
                                      
                                      return true;
                                      }
                                      });


// new type that extends the Sprite class
var MemoryTile = cc.Sprite.extend({
                                  ctor:function() {
                                  this._super();
                                  this.initWithFile(res.Background_png);
                                  }
                                  })

function Ripeness(tag) {
    switch(tag) {
        case 0:
            WheatRipeness();
            break;
        case 2:
            StrawberryRipeness();
            break;
        case 4:
            CarrotRipeness();
            break;
        case 6:
            CabbageRipeness();
            break;
    }
}

function WheatRipeness() {
    ripeWheat = false;
    var pause = setTimeout(function() {
                           wheatSprite.setTexture(res.Wheat_02_png);
                           ripeWheat = true;
                           }, 2000);
    cc.eventManager.addListener(listener.clone(), wheatSprite); // using "clone" we dublicate the listener for each tile
}

function StrawberryRipeness() {
    var pause = setTimeout(function() {
                           strawberrySprite.setTexture(res.Strawberry_02_png);
                           }, 8000);
    cc.eventManager.addListener(listener.clone(), strawberrySprite); // using "clone" we dublicate the listener for each tile
}

function CarrotRipeness() {
    var pause = setTimeout(function() {
                           carrotSprite.setTexture(res.Carrot_02_png);
                           }, 16000);
    cc.eventManager.addListener(listener.clone(), carrotSprite); // using "clone" we dublicate the listener for each tile
}

function CabbageRipeness() {
    var pause = setTimeout(function() {
                           cabbageSprite.setTexture(res.Cabbage_02_png);
                           }, 32000);
    cc.eventManager.addListener(listener.clone(), cabbageSprite); // using "clone" we dublicate the listener for each tile
}

// the basic listener
var listener = cc.EventListener.create({
                                       event: cc.EventListener.TOUCH_ONE_BY_ONE, // waits for touches (one at a time)
                                       swallowTouches: true, // for mouse clicking
                                       onTouchBegan: function (touch, event) {
                                       var target = event.getCurrentTarget();
                                       var location = target.convertToNodeSpace(touch.getLocation());
                                       var targetSize = target.getContentSize();
                                       var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
                                       if (cc.rectContainsPoint(targetRectangle, location)) {
                                       if (ripeWheat == true) {
                                       target.initWithFile("res/tile_" + target.tag + ".png");
                                       ProfitCounter(target.tag);
                                       
                                       flyingCoin.setPosition(touch.getLocation());
                                       var spriteAction1 = cc.FadeIn.create(0);
                                       var spriteAction2 = cc.MoveTo.create(0.5, profitLabel.getPosition());
                                       var spriteAction3 = cc.FadeOut.create(0);
                                       var sequenceAction = cc.Sequence.create(spriteAction1, spriteAction2, spriteAction3, cc.callFunc(SetProfitLabel, this));
                                       flyingCoin.runAction(sequenceAction);
                                       
                                       ripeWheat = false;
                                       Ripeness(target.tag);
                                       }
                                       }
                                       }
                                       })

function ProfitCounter(tag) {
    switch(tag) {
        case 0:
            profit += 1;
            break;
        case 2:
            profit += 10;
            break;
        case 4:
            profit += 100;
            break;
        case 6:
            profit += 1000;
            break;
    }
}

function SetProfitLabel() {
    profitLabel.setString(profit.toString());
}

var TestScene = cc.Scene.extend({
                                onEnter:function () {
                                this._super();
                                var gameLayer = new BackgroundLayer();
                                this.addChild(gameLayer);
                                }
                                });
