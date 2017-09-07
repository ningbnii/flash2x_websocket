var game=game||{};
game.up=function(){
	var s = this;
	F2xContainer.call(s);
	s.initUI();
};
F2xExtend(game.up,F2xContainer);
game.up.prototype.initUI=function(){
	var s = this;
	var _d0=Flash2x.b("game","F2xAuto_1");
	s.addChild(_d0);
};
game.down=function(){
	var s = this;
	F2xContainer.call(s);
	s.initUI();
};
F2xExtend(game.down,F2xContainer);
game.down.prototype.initUI=function(){
	var s = this;
	var _d0=Flash2x.b("game","F2xAuto_3");
	s.addChild(_d0);
};
game.left=function(){
	var s = this;
	F2xContainer.call(s);
	s.initUI();
};
F2xExtend(game.left,F2xContainer);
game.left.prototype.initUI=function(){
	var s = this;
	var _d0=Flash2x.b("game","F2xAuto_4");
	s.addChild(_d0);
};
game.right=function(){
	var s = this;
	F2xContainer.call(s);
	s.initUI();
};
F2xExtend(game.right,F2xContainer);
game.right.prototype.initUI=function(){
	var s = this;
	var _d0=Flash2x.b("game","F2xAuto_2");
	s.addChild(_d0);
};
game.bg=function(){
	var s = this;
	F2xContainer.call(s);
	s.initUI();
};
F2xExtend(game.bg,F2xContainer);
game.bg.prototype.initUI=function(){
	var s = this;
	var _d0=Flash2x.s({type:0,data:"EiVhBU8MAAAip3MErDAAAMAAACp3g"},{type:0,color:"#666666"},null);
	Flash2x.d(_d0,{x:960,y:540,a:1.003,b:0.9934});
	s.addChild(_d0);
};
game.login_txt_bg=function(){
	var s = this;
	F2xContainer.call(s);
	s.initUI();
};
F2xExtend(game.login_txt_bg,F2xContainer);
game.login_txt_bg.prototype.initUI=function(){
	var s = this;
	var _d0=Flash2x.s({type:0,data:"EhCrAHTIAAulMCFXAAAIAAOlg"},{type:0,color:"#FFFFFF"},null);
	Flash2x.d(_d0,{x:426.8,y:46.68});
	s.addChild(_d0);
};
game.login=function(){
	var s = this;
	F2xContainer.call(s);
	s.initUI();
};
F2xExtend(game.login,F2xContainer);
game.login.prototype.initUI=function(){
	var s = this;
	var _d0=Flash2x.b("game","F2xAuto_0");
	s.addChild(_d0);
};
