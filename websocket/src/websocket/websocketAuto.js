var websocket=websocket||{};
websocket.bg=function(){
	var s = this;
	F2xContainer.call(s);
	s.initUI();
};
F2xExtend(websocket.bg,F2xContainer);
websocket.bg.prototype.initUI=function(){
	var s = this;
	var _d0=Flash2x.s({type:0,data:"EiVhBU8MAAAip3MErDAAAMAAACp3g"},{type:0,color:"#666666"},null);
	Flash2x.d(_d0,{x:960,y:540,a:1.003,b:0.9934});
	s.addChild(_d0);
};
websocket.login=function(){
	var s = this;
	F2xContainer.call(s);
	s.initUI();
};
F2xExtend(websocket.login,F2xContainer);
websocket.login.prototype.initUI=function(){
	var s = this;
	var _d0=Flash2x.b("websocket","F2xAuto_0");
	s.addChild(_d0);
};
websocket.login_txt_bg=function(){
	var s = this;
	F2xContainer.call(s);
	s.initUI();
};
F2xExtend(websocket.login_txt_bg,F2xContainer);
websocket.login_txt_bg.prototype.initUI=function(){
	var s = this;
	var _d0=Flash2x.s({type:0,data:"EhCrAHTIAAulMCFXAAAIAAOlg"},{type:0,color:"#FFFFFF"},null);
	Flash2x.d(_d0,{x:426.8,y:46.68});
	s.addChild(_d0);
};
websocket.msg_txt_bg=function(){
	var s = this;
	F2xContainer.call(s);
	s.initUI();
};
F2xExtend(websocket.msg_txt_bg,F2xContainer);
websocket.msg_txt_bg.prototype.initUI=function(){
	var s = this;
	var _d0=Flash2x.s({type:0,data:"EhDOAHUIAAunMCGdAAAIAAOng"},{type:0,color:"#FFFFFF"},null);
	Flash2x.d(_d0,{x:430.3,y:46.8});
	s.addChild(_d0);
};
