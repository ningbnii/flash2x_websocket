var websocket=websocket||{};
websocket.ball=function(){
	var s = this;
	F2xContainer.call(s);
	s.initUI();
};
F2xExtend(websocket.ball,F2xContainer);
websocket.ball.prototype.initUI=function(){
	var s = this;
	//f2x_auto_created_init_start
	var _d0=Flash2x.t(0,decodeURI(""),20,"#FF0000","Arial",0,0,100,22.35,24.35,"center",true,false,"multiline no wrap",false);
	_d0.name="msg";
	s.msg=_d0;
	Flash2x.d(_d0,{x:-57,y:53.65});
	var _d3=Flash2x.t(0,decodeURI(""),20,"#FFFFFF","Arial",0,0,100,33.5,24.35,"center",true,false,"multiline no wrap",false);
	_d3.name="username";
	s.username=_d3;
	Flash2x.d(_d3,{x:-50,y:-16.75});
	var _d2=Flash2x.s({type:0,data:"AH0AAQAADPiSCTQiTCSjPAAQjOAAiTiSQiSiTAAjPQAAjOCSiTQCTiSDOAAQDPAACTCSQCSCTAADOg"},null,{type:0,color:"#CC9900",lineWidth:1,caps:"round",joints:"round",miter:"10"});
	var _d1=Flash2x.s({type:0,data:"AlhFiQiSiTAAjPQAAjOCSiTQCTiSDOAAQDPAACTCSQCSCTAADOQAADPiSCTQiTCSjPAAQjOAAiTiSg"},{type:0,color:"#000000"},null);
	s.addChild(_d1);
	s.addChild(_d2);
	s.addChild(_d3);
	s.addChild(_d0);
	//f2x_auto_created_init_end
	
};
