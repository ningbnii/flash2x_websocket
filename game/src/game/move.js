var game=game||{};
game.move=function(){
	var s = this;
	F2xContainer.call(s);
	s.initUI();
};
F2xExtend(game.move,F2xContainer);
game.move.prototype.initUI=function(){
	var s = this;
	//f2x_auto_created_init_start
	var _d4=new game.right();
	_d4.name="right";
	s.right=_d4;
	Flash2x.d(_d4,{x:31,y:-30});
	var _d3=new game.left();
	_d3.name="left";
	s.left=_d3;
	Flash2x.d(_d3,{x:-80,y:-30});
	var _d2=new game.down();
	_d2.name="down";
	s.down=_d2;
	Flash2x.d(_d2,{x:-30,y:31});
	var _d1=new game.up();
	_d1.name="up";
	s.up=_d1;
	Flash2x.d(_d1,{x:-30,y:-80});
	var _d0=Flash2x.b("game","lineDark04");
	Flash2x.d(_d0,{x:-80,y:-80});
	s.addChild(_d0);
	s.addChild(_d1);
	s.addChild(_d2);
	s.addChild(_d3);
	s.addChild(_d4);
	//f2x_auto_created_init_end
	
};
