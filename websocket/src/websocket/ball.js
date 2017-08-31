var websocket=websocket||{};
websocket.ball=function(){
	var s = this;
	F2xMovieClip.call(s);
	s.initUI();
};
F2xExtend(websocket.ball,F2xMovieClip);
websocket.ball.prototype.initUI=function(){
	var s = this;
	//f2x_auto_created_init_start
	var _d0=Flash2x.t(0,decodeURI(""),12,"#FFFFFF","Arial",0,0,56.05,13.25,15.25,"center",true,false,"multiline no wrap",false);
	_d0.name="username";
	s.username=_d0;
	var _d1=Flash2x.b("websocket","ic_launcher");
	s.a().b(4).c(_d0,{x:-28.05,y:32.45});
	s.a().b(1).c(_d1,{x:-30,y:-30}).b(1).c(_d1,{x:30,y:-30,r:90}).b(1).c(_d1,{x:30,y:30,r:180}).b(1).c(_d1,{x:-30,y:30,r:-90});
	s.as(function(){this.stop();}.bind(this),0);
	//f2x_auto_created_init_end
	
};
