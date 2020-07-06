const G = {}

window.G = G;
// 事件派发
G.event = new ht.Notifier();

G.getDate = function () {
    var date = new Date();
    return date.getFullYear() + '-' + this.prefixInteger((date.getMonth() + 1), 2) + '-' + this.prefixInteger(date.getDate(), 2);
};

G.getDateTime = function () {
    var date = new Date();
    return this.prefixInteger(date.getHours(), 2) + ':' + this.prefixInteger(date.getMinutes(), 2) + ':' + this.prefixInteger(date.getSeconds(), 2);
};

// 数值补零
G.prefixInteger = function (num, n) {
    return (Array(n).join(0) + num).slice(-n);
};

G.getWeekDay = function () {
    var day = new Date().getDay();
    var x = "";
    switch (day) {
        case 0:
            x = "星期日";
            break;
        case 1:
            x = "星期一";
            break;
        case 2:
            x = "星期二";
            break;
        case 3:
            x = "星期三";
            break;
        case 4:
            x = "星期四";
            break;
        case 5:
            x = "星期五";
            break;
        case 6:
            x = "星期六";
            break;
    }
    return x;
}

G.emptyFunc = function () { }

G.windowInnerHeight = function () {
    return window.innerHeight;
}

G.windowInnerWidth = function () {
    return window.innerWidth;
}

G.toThousands = function (num) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}

export default G;

export var defaultFar = 500000;
export var defaultNear = 10;

export var menuColor = 'rgba(18,101,184,0.60)';
export var menuUnColor = 'rgba(117,117,117,0.40)';