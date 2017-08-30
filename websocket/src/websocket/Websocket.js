var websocket = websocket || {};
websocket.Websocket = function () {
    var s = this;
    F2xContainer.call(s);
    s.initUI();

    s.init();
};
F2xExtend(websocket.Websocket, F2xContainer);
websocket.Websocket.prototype.initUI = function () {
    var s = this;
    //f2x_auto_created_init_start
	var _d1=new websocket.msg_txt_bg();
	_d1.name="msg_txt_bg";
	s.msg_txt_bg=_d1;
	Flash2x.d(_d1,{x:526.25,y:493.1});
	var _d0=Flash2x.t(2,decodeURI(""),80,"#000000","Arial",0,0,858.3,89.35,91.35,"center",true,false,"multiline no wrap",false);
	_d0.name="msg";
	s.msg=_d0;
	Flash2x.d(_d0,{x:528.3,y:495.1});
	var _d4=new websocket.login_txt_bg();
	_d4.name="login_txt_bg";
	s.login_txt_bg=_d4;
	Flash2x.d(_d4,{x:533.2,y:493.35});
	var _d3=new websocket.login();
	_d3.name="login";
	s.login=_d3;
	Flash2x.d(_d3,{x:859,y:635});
	var _d2=Flash2x.t(2,decodeURI("%E8%AF%B7%E8%BE%93%E5%85%A5%E4%BD%A0%E7%9A%84%E5%90%8D%E5%AD%97"),80,"#999999","Arial",0,0,849.6,89.35,82,"center",true,false,"multiline no wrap",false);
	_d2.name="username";
	s.username=_d2;
	Flash2x.d(_d2,{x:535.2,y:495.35});
	var _d5=new websocket.bg();
	_d5.name="bg";
	s.bg=_d5;
	s.addChild(_d5);
	s.addChild(_d2);
	s.addChild(_d3);
	s.addChild(_d4);
	s.addChild(_d0);
	s.addChild(_d1);
	//f2x_auto_created_init_end

};

websocket.Websocket.prototype.init = function () {
    var s = this;
    // 移动速度
    s.speed = 10;
    s.balls = [];
    s.ballsLayer = new annie.Sprite();
    s.addChild(s.ballsLayer);

    // 聊天框
    s.msg.visible = false;
    s.msg_txt_bg.visible = false;
    s.msgStatus = false;

    // 登录
    s.login.addEventListener(annie.MouseEvent.CLICK, s.loginClick.bind(s));

};

websocket.Websocket.prototype.loginClick = function (e) {
    var s = this;
    if (!s.username.text) {
        alert('快点输入你的名字体验一下吧！');
    } else {
        s.socket = new WebSocket('ws://ball.wxbuluo.com:2347');
        s.socket.addEventListener('open', function (e) {
            var data = {
                'type': 'login',
                'username': s.username.text,
                'x': randomNum(50, 1870),
                'y': randomNum(50, 1030)
            };
            s.socket.send(JSON.stringify(data).toString());
        })

        s.socket.addEventListener('message', function (e) {
            var value = JSON.parse(e.data);

            switch (value.status) {
                case 400:
                    alert(value.msg);
                    break;
                case 200:
                    if (s.username.text == value.msg.username) {
                        // 自己
                        s.username.visible = false;
                        s.login.visible = false;
                        s.login_txt_bg.visible = false;

                        s.ball = new websocket.ball();
                        s.ball.x = value.msg.x;
                        s.ball.y = value.msg.y;
                        s.ball.username.text = s.username.text;
                        s.ballsLayer.addChild(s.ball);
                        s.balls.push(s.ball);
                    } else {
                        // 别人
                        var ball = new websocket.ball();
                        ball.x = value.msg.x;
                        ball.y = value.msg.y;
                        ball.username.text = value.msg.username;
                        s.ballsLayer.addChild(ball);
                        s.balls.push(ball);
                    }

                    document.onkeydown = function (event) {
                        switch (event.keyCode) {
                            case 38:
                                // up
                                if (s.ball.y - 50 > 0) {
                                    s.ball.y -= s.speed;
                                }
                                break;
                            case 40:
                                // down
                                if (s.ball.y + 50 < 1080) {
                                    s.ball.y += s.speed;
                                }
                                break;
                            case 37:
                                // left
                                if (s.ball.x - 50 > 0) {
                                    s.ball.x -= s.speed;
                                }
                                break;
                            case 39:
                                // right
                                if (s.ball.x + 50 < 1920) {
                                    s.ball.x += s.speed;
                                }
                                break;
                            case 13:
                                // 聊天
                                if(!s.msgStatus){
                                    s.msg.visible = true;
                                    s.msg_txt_bg.visible = true;
                                    s.msgStatus = true;
                                    if(s.msg.text){
                                        var data = {
                                            'type':'message',
                                            'username':s.username.text,
                                            'info':s.msg.text
                                        };
                                        s.socket.send(JSON.stringify(data).toString());
                                        return false;
                                    }
                                }else{
                                    s.msg.visible = false;
                                    s.msg_txt_bg.visible = false;
                                    s.msgStatus = false;
                                }
                                break;
                        }
                        var data = {
                            'type': 'move',
                            'username': s.username.text,
                            'x': s.ball.x,
                            'y': s.ball.y
                        };
                        s.socket.send(JSON.stringify(data).toString());
                    };
                    break;
                case 500:
                    value.msg.forEach(function (e) {
                        if (e.username != s.username.text) {
                            var ball = new websocket.ball();
                            ball.x = e.x;
                            ball.y = e.y;
                            ball.username.text = e.username;
                            s.ballsLayer.addChild(ball);
                            s.balls.push(ball);
                        }
                    })
                    break;
                case 300:
                    s.balls.forEach(function (e) {
                        if (e.username.text == value.msg.username) {
                            e.x = value.msg.x;
                            e.y = value.msg.y;
                        }
                    })
                    break;
                case 600:
                    s.balls.forEach(function (t) {
                        if(t.username.text == value.msg.username){
                            t.msg.text = value.msg.info;
                        }
                    })
            }
        })
    }
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