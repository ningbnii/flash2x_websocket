var game = game || {};
game.Game = function () {
    var s = this;
    F2xContainer.call(s);
    s.initUI();
    s.init();
};
F2xExtend(game.Game, F2xContainer);
game.Game.prototype.initUI = function () {
    var s = this;
    //f2x_auto_created_init_start
    var _d1 = new game.msg_txt_bg();
    _d1.name = "msg_txt_bg";
    s.msg_txt_bg = _d1;
    Flash2x.d(_d1, {x: 526.25, y: 493.1});
    var _d0 = Flash2x.t(2, decodeURI(""), 80, "#000000", "Arial", 0, 0, 858.3, 89.35, 91.35, "center", true, false, "multiline no wrap", false);
    _d0.name = "msg";
    s.msg = _d0;
    Flash2x.d(_d0, {x: 528.3, y: 495.1});
    var _d4 = new game.login_txt_bg();
    _d4.name = "login_txt_bg";
    s.login_txt_bg = _d4;
    Flash2x.d(_d4, {x: 533.2, y: 493.35});
    var _d3 = new game.login();
    _d3.name = "login";
    s.login = _d3;
    Flash2x.d(_d3, {x: 859, y: 635});
    var _d2 = Flash2x.t(2, decodeURI("%E8%AF%B7%E8%BE%93%E5%85%A5%E4%BD%A0%E7%9A%84%E5%90%8D%E5%AD%97"), 80, "#999999", "Arial", 0, 0, 849.6, 89.35, 82, "center", true, false, "multiline no wrap", false);
    _d2.name = "username";
    s.username = _d2;
    Flash2x.d(_d2, {x: 535.2, y: 495.35});
    var _d5 = new game.bg();
    _d5.name = "bg";
    s.bg = _d5;
    s.addChild(_d5);
    s.addChild(_d2);
    s.addChild(_d3);
    s.addChild(_d4);
    s.addChild(_d0);
    s.addChild(_d1);
    //f2x_auto_created_init_end

};

game.Game.prototype.init = function () {
    var s = this;
    s.username.visible = false;
    s.msg_txt_bg.visible = false;
    s.login.visible = false;
    s.login_txt_bg.visible = false;

    s.ballsLayer = new annie.Sprite();
    s.addChild(s.ballsLayer);

    s.balls = [];
    s.ballsUsername = [];

    var username = localStorage.getItem('username') || '';
    if (username) {
        s.username.text = username;
        s.open(s.username.text);
        s.handleMessage();
    } else {
        s.username.visible = true;
        s.msg_txt_bg.visible = true;
        s.login.visible = true;
        s.login_txt_bg.visible = true;
        s.login.addEventListener(annie.MouseEvent.CLICK, s.loginClick.bind(s));
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
    s.socket = new WebSocket('ws://ning.tp8.com:2346');
    s.socket.addEventListener('open', function (e) {
        var data = {
            'type': 'login',
            'username': username,
            'x': randomNum(50, 1870),
            'y': randomNum(50, 1030),
            'direction': randomNum(1, 4)
        }
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
        console.log(value);

        switch (value.status) {
            case 401:
                alert(value.msg);
                s.username.visible = true;
                s.msg_txt_bg.visible = true;
                s.login.visible = true;
                s.login_txt_bg.visible = true;
                s.login.addEventListener(annie.MouseEvent.CLICK, s.loginClick.bind(s));
                return false;
                break;
            case 200:

                if (s.username.text == value.msg.username) {
                    // 自己
                    s.username.visible = false;
                    s.msg_txt_bg.visible = false;
                    s.login.visible = false;
                    s.login_txt_bg.visible = false;

                    s.ball = new game.ball();
                    s.ball.x = value.msg.x;
                    s.ball.y = value.msg.y;
                    s.ball.direction = value.msg.direction;
                    s.ball.gotoAndStop(s.ball.direction);
                    s.ball.username.text = s.username.text;
                    s.ballsLayer.addChild(s.ball);
                    s.balls.push(s.ball);
                    s.ballsUsername.push(s.username.text);
                } else {
                    console.log(s.ballsUsername.contains(value.msg.username));
                    if (!s.ballsUsername.contains(value.msg.username)) {
                        var ball = new game.ball();
                        ball.x = value.msg.x;
                        ball.y = value.msg.y;
                        ball.direction = value.msg.direction;
                        ball.gotoAndStop(ball.direction);
                        ball.username.text = value.msg.username;
                        s.ballsLayer.addChild(ball);
                        s.balls.push(ball);
                        s.ballsUsername.push(value.msg.username);
                    }
                }
                break;
            case 500:
                s.username.visible = false;
                s.username.htmlElement.hidden = true;
                s.msg_txt_bg.visible = false;
                s.login.visible = false;
                s.login_txt_bg.visible = false;
                value.msg.forEach(function (e) {
                    if(!s.ballsUsername.contains(e.username)){
                        var ball = new game.ball();
                        ball.x = e.x;
                        ball.y = e.y;
                        ball.direction = e.direction;
                        ball.gotoAndStop(ball.direction);
                        ball.username.text = e.username;
                        s.ballsLayer.addChild(ball);
                        s.balls.push(ball);
                    }else{

                    }
                })

                break;

        }
    })
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