var game=game||{};
game.Game=function(){
	var s = this;
	F2xContainer.call(s);
	s.initUI();
	s.init();
};
F2xExtend(game.Game,F2xContainer);
game.Game.prototype.initUI=function(){
	var s = this;
	//f2x_auto_created_init_start
	var _d0=new game.move();
	_d0.name="move";
	s.move=_d0;
	Flash2x.d(_d0,{x:146,y:992});
	var _d3=new game.login();
	_d3.name="login";
	s.login=_d3;
	Flash2x.d(_d3,{x:226,y:509.2});
	var _d2=Flash2x.t(2,decodeURI("%E8%AF%B7%E8%BE%93%E5%85%A5%E4%BD%A0%E7%9A%84%E5%90%8D%E5%AD%97"),30,"#999999","Arial",0,0,396,33.5,32,"center",true,false,"multiline no wrap",false);
	_d2.name="username";
	s.username=_d2;
	Flash2x.d(_d2,{x:129.5,y:453.8});
	var _d1=new game.login_txt_bg();
	_d1.name="login_txt_bg";
	s.login_txt_bg=_d1;
	Flash2x.d(_d1,{x:127.5,y:451.8,a:0.4686,b:0.4017});
	var _d4=new game.bg();
	_d4.name="bg";
	s.bg=_d4;
	Flash2x.d(_d4,{x:0.1,a:0.5916,b:0.5925,c:-89.9882,d:90.003});
	s.addChild(_d4);
	s.addChild(_d1);
	s.addChild(_d2);
	s.addChild(_d3);
	s.addChild(_d0);
	//f2x_auto_created_init_end
	
};

function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

Array.prototype.contains = function (needle) {
    for (var i in this) {
        if (this[i] == needle) return true;
    }
    return false;
};

game.Game.prototype.init = function () {
    var s = this;
    s.username.visible = false;
    s.login.visible = false;
    s.login_txt_bg.visible = false;

    s.ballsLayer = new annie.Sprite();
    s.addChild(s.ballsLayer);

    s.balls = [];
    s.ballsUsername = [];
    // 控制相关
    s.myKey = {
        keyControl:null,
        step:2,
        isTouchDown:false
    };

    var username = localStorage.getItem('username') || '';
    if (username) {
        s.username.text = username;
        s.open(s.username.text);
        s.handleMessage();
    } else {
        s.username.visible = true;
        s.login.visible = true;
        s.login_txt_bg.visible = true;
        s.login.addEventListener(annie.MouseEvent.CLICK, s.loginClick.bind(s));
    }

    // 控制移动
    s.move.up.addEventListener(annie.MouseEvent.MOUSE_DOWN, function () {
        touchDown('up');
    });
    s.move.up.addEventListener(annie.MouseEvent.MOUSE_UP, function () {
        touchUp();
    });
    
    
    s.move.down.addEventListener(annie.MouseEvent.MOUSE_DOWN, function () {
        touchDown('down');
    });
    s.move.down.addEventListener(annie.MouseEvent.MOUSE_UP, function () {
        touchUp();
    });


    s.move.left.addEventListener(annie.MouseEvent.MOUSE_DOWN, function () {
        touchDown('left');
    });
    s.move.left.addEventListener(annie.MouseEvent.MOUSE_UP, function () {
        touchUp();
    });

    s.move.right.addEventListener(annie.MouseEvent.MOUSE_DOWN, function () {
        touchDown('right');
    });
    s.move.right.addEventListener(annie.MouseEvent.MOUSE_UP, function () {
        touchUp();
    });

    // 手指抬起
    function touchUp() {
        if(s.myKey.isTouchDown){
            s.myKey.keyControl = null;
            s.myKey.isTouchDown = false;
        }
    }

    // 控制移动，手指按下
    function touchDown(direction) {
        if(!s.myKey.isTouchDown){
            s.myKey.keyControl = direction;
            s.myKey.isTouchDown = true;
        }
    }


    s.addEventListener(annie.Event.ENTER_FRAME, onframe);

    // 循环播放
    function onframe() {
        if(s.ball){
            if(s.ball.username.text == '6'){
                s.myKey.step = 10;
            }
            switch (s.myKey.keyControl){
                case 'up':
                    if(s.ball.y - 50 > 0){
                        s.ball.y -= s.myKey.step;
                    }
                    s.ball.direction = 1;
                    move();
                    break;
                case 'down':
                    if(s.ball.y + 50 < 1136){
                        s.ball.y += s.myKey.step;
                    }
                    s.ball.direction = 3;
                    move();
                    break;
                case 'left':
                    if(s.ball.x - 50 > 0){
                        s.ball.x -= s.myKey.step;
                    }
                    s.ball.direction = 4;
                    move();
                    break;
                case 'right':
                    if(s.ball.x +50 < 640){
                        s.ball.x += s.myKey.step;
                    }
                    s.ball.direction = 2;
                    move();
                    break;
            }

        }

    }

    // 移动发送数据
    function move() {
        s.ball.gotoAndStop(s.ball.direction);
        var data = {
            'type':'move',
            'username':s.username.text,
            'x':s.ball.x,
            'y':s.ball.y,
            'direction':s.ball.direction
        };
        s.socket.send(JSON.stringify(data).toString());
    }

};

game.Game.prototype.loginClick = function () {
    var s = this;
    if (!s.username.text) {
        alert('快点输入你的名字体验一下吧！');
        return false;
    } else {
        s.open(s.username.text);
        s.handleMessage();
    }

};

game.Game.prototype.open = function (username) {
    var s = this;
    s.socket = new WebSocket('ws://ball.sdningrun.com:2346');
    s.socket.addEventListener('open', function (e) {
        var data = {
            'type': 'login',
            'username': username,
            'x': localStorage.getItem('x') || randomNum(50, 590),
            'y': localStorage.getItem('y') || randomNum(50, 1086),
            'direction': parseInt(localStorage.getItem('direction')) || randomNum(1, 4)
        };
        s.ball = new game.ball();
        s.ball.username.text = data.username;
        s.ball.x = parseInt(data.x);
        s.ball.y = parseInt(data.y);
        s.ball.direction = parseInt(data.direction);
        s.ball.gotoAndStop(s.ball.direction);
        

        localStorage.setItem('username', data.username);
        localStorage.setItem('x', data.x);
        localStorage.setItem('y', data.y);
        localStorage.setItem('direction', data.direction);
        s.socket.send(JSON.stringify(data).toString());
    })
};

game.Game.prototype.handleMessage = function () {
    var s = this;
    s.socket.addEventListener('message', function (e) {
        var value = JSON.parse(e.data);
        switch (value.status){
            case 'error':
                alert(value.msg);
                break;
            case 'loginok':
                s.username.visible = false;
                s.login.visible = false;
                s.login_txt_bg.visible = false;

                value.msg.forEach(function (t) {
                   if(t.username == s.ball.username.text){
                       s.ballsLayer.addChild(s.ball);
                       s.balls.push(s.ball);
                   }else{
                       addTank(t.username,parseInt(t.x),parseInt(t.y),parseInt(t.direction));
                   }
                });
                break;
            case 'leave':
                var tank;
                for(var key in s.balls){
                    tank = s.balls[key];
                    if(tank.username.text == value.msg.username){
                        s.ballsLayer.removeChild(tank);
                        s.balls.splice(key,1);
                        break;
                    }
                }
                break;
            case 'addTank':
                addTank(value.msg.username,parseInt(value.msg.x),parseInt(value.msg.y),parseInt(value.msg.direction));
                break;
            case 'move':
                move(value.msg.username,parseInt(value.msg.x),parseInt(value.msg.y),parseInt(value.msg.direction));
                break;
        }
    });

    // 添加坦克
    function addTank(username,x,y,direction) {
        var tank = new game.ball();
        tank.username.text = username;
        tank.x = x;
        tank.y = y;
        tank.direction = direction;
        tank.gotoAndStop(tank.direction);
        s.ballsLayer.addChild(tank);
        s.balls.push(tank);
    }
    
    // 移动坦克
    function move(username,x,y,direction) {
        var tank;
        for(var key in s.balls){
            tank = s.balls[key];
            if(tank.username.text == username) break;
        }
        if(tank == null) return;
        tank.x = x;
        tank.y = y;
        tank.direction = direction;
        tank.gotoAndStop(tank.direction);
    }
};