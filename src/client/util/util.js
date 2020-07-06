export default {
    getParam: function (name) {
        const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        const r = window.location.search.substr(1).match(reg);
        if (r != null)
            return decodeURIComponent(r[2]);
        return null;
    },
    formatDate(date, formatStr) {
        var str = formatStr;
        var Week = ['日', '一', '二', '三', '四', '五', '六'];

        str = str.replace(/yyyy|YYYY/, date.getFullYear());
        str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));

        var month = date.getMonth() + 1;
        str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month);
        str = str.replace(/M/g, month);

        str = str.replace(/w|W/g, Week[date.getDay()]);

        str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
        str = str.replace(/d|D/g, date.getDate());

        str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
        str = str.replace(/h|H/g, date.getHours());
        str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
        str = str.replace(/m/g, date.getMinutes());
        str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
        str = str.replace(/s|S/g, date.getSeconds());

        return str;
    },
    setBindingData(dm, dataObj) {
        dm.each(function (data) {
            var dataBindings = data.getDataBindings();
            if (dataBindings) {
                // update attrs
                for (var name in dataBindings.a) {
                    var db = dataBindings.a[name];
                    var value = dataObj[db.id];
                    if (value !== undefined) {
                        if (db.func) {
                            value = db.func(value);
                        }
                        data.a(name, value);
                    }
                }
                // update styles
                for (var name in dataBindings.s) {
                    var db = dataBindings.s[name];
                    var value = dataObj[db.id];
                    if (value !== undefined) {
                        if (db.func) {
                            value = db.func(value);
                        }
                        data.s(name, value);
                    }
                }
                // update properties
                for (var name in dataBindings.p) {
                    var db = dataBindings.p[name];
                    var value = dataObj[db.id];
                    if (value !== undefined) {
                        if (db.func) {
                            value = db.func(value);
                        }
                        data[ht.Default.setter(name)](value);
                    }
                }
            }
        });
    },
    setBindingDataWithAnimation(dm, dataObj) {
        dm.each(data => {
            var dataBindings = data.getDataBindings();
            if (dataBindings) {
                // update attrs
                for (var name in dataBindings.a) {
                    var db = dataBindings.a[name];
                    var value = dataObj[db.id];
                    if (value !== undefined) {
                        if (db.func) {
                            value = db.func(value);
                        }
                        this.setValueWithAnimation(data, name, value, null, 'a');
                    }
                }
                // update styles
                for (var name in dataBindings.s) {
                    var db = dataBindings.s[name];
                    var value = dataObj[db.id];
                    if (value !== undefined) {
                        if (db.func) {
                            value = db.func(value);
                        }
                        this.setValueWithAnimation(data, name, value, null, 's');
                    }
                }
                // update properties
                for (var name in dataBindings.p) {
                    var db = dataBindings.p[name];
                    var value = dataObj[db.id];
                    if (value !== undefined) {
                        if (db.func) {
                            value = db.func(value);
                        }
                        this.setValueWithAnimation(data, name, value, null, 'p');
                    }
                }
            }
        });
    },
    setValueWithAnimation(node, name, value, format, accesstype = 'a') {
        let oldValue;
        if (accesstype === 'a') {
            oldValue = node.a(name);
        }
        else if (accesstype === 's') {
            oldValue = node.s(name);
        }
        else {
            oldValue = node[ht.Default.getter(name)]();
        }
        let range = value - oldValue;

        ht.Default.startAnim({
            frames: 12,
            interval: 10,
            easing: function (t) { return 1 - (--t) * t * t * t; },
            action: (v, t) => {
                let newValue = oldValue + range * v;
                if (format) {
                    newValue = format(newValue);
                }
                if (accesstype === 'a') {
                    node.a(name, newValue);
                }
                else if (accesstype === 's') {
                    node.s(name, newValue);
                }
                else {
                    node[ht.Default.setter(name)]()(node, newValue);
                }
            }
        });
    },
    toFixed(num, fixed) {
        if (typeof num === 'string') {
            num = parseFloat(num);
        }
        return num.toFixed(fixed);
    }
};