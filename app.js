var strawberrySprite;
var wheatSprite;
var carrotSprite;
var cabbageSprite;
var profit;
var profitLabel;
var flyingCoin;

var ripeWheat;

var gameLayer;
var wheat;
var gameScene = cc.Scene.extend({
                                onEnter:function () {
                                this._super();
                                gameLayer = new game();
                                gameLayer.init();
                                this.addChild(gameLayer);
                                }
                                });

var game = cc.Layer.extend({
                           ctor:function () {
                           this._super();
                           var size = cc.winSize;
               
                          
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
                           
                           wheat = new Wheat();
                           this.addChild(wheat);
                           
                           Ripeness(wheat);
                           
                           flyingCoin = new cc.Sprite(res.Coin_png);
                           flyingCoin.setOpacity(0);
                           this.addChild(flyingCoin, 0);
                           
                           }
                           });


// new type that extends the Sprite class
var MemoryTile = cc.Sprite.extend({
                                  ctor:function() {
                                  this._super();
                                  this.initWithFile(res.Background_png);
                                  }
                                  })

var Wheat = cc.Sprite.extend({
                             ctor:function() {
                             this._super();
                             this.setTexture(res.Wheat_01_png);
                             this.setPosition(335, 400);
                             this.ripe = false;
                             this.tag = 0;
                             this.profitSum = 1;
                             this.ripenessTime = 2000;
                             }
                             })

function Ripeness(sprite) {
    var pause = setTimeout(function() {
                           switch(sprite.tag) {
                           case 0:
                           sprite.setTexture(res.Wheat_02_png);
                           break;
                           case 2:
                           sprite.setTexture(res.Strawberry_02_png);
                           break;
                           case 4:
                           sprite.setTexture(res.Carrot_02_png);
                           break;
                           case 6:
                           sprite.setTexture(res.Cabbage_02_png);
                           break;
                           }
                           sprite.ripe = true;
                           }, sprite.ripenessTime);
    cc.eventManager.addListener(listener.clone(), sprite); // using "clone" we dublicate the listener for each tile
}

var listener = cc.EventListener.create({
                                       event: cc.EventListener.TOUCH_ONE_BY_ONE, // waits for touches (one at a time)
                                       swallowTouches: true, // for mouse clicking
                                       onTouchBegan: function (touch, event) {
                                       var target = event.getCurrentTarget();
                                       var location = target.convertToNodeSpace(touch.getLocation());
                                       var targetSize = target.getContentSize();
                                       var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
                                       if (cc.rectContainsPoint(targetRectangle, location)) {
                                       if (target.ripe) {
                                       target.initWithFile("res/tile_" + target.tag + ".png");
                                       ProfitCounter(target);
                                       
                                       flyingCoin.setPosition(touch.getLocation());
                                       var spriteAction1 = cc.FadeIn.create(0);
                                       var spriteAction2 = cc.MoveTo.create(0.5, profitLabel.getPosition());
                                       var spriteAction3 = cc.FadeOut.create(0);
                                       var sequenceAction = cc.Sequence.create(spriteAction1, spriteAction2, spriteAction3, cc.callFunc(SetProfitLabel, this));
                                       flyingCoin.runAction(sequenceAction);
                                       
                                       target.ripe = false;
                                       Ripeness(target);
                                       }
                                       }
                                       }
                                       })

function ProfitCounter(sprite) {
    profit += sprite.profitSum;
}

function SetProfitLabel() {
    profitLabel.setString(profit.toString());
}
