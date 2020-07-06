(function () {
    'use strict';

    var util = {
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

    const G = {};

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
    };

    G.emptyFunc = function () { };

    G.windowInnerHeight = function () {
        return window.innerHeight;
    };

    G.windowInnerWidth = function () {
        return window.innerWidth;
    };

    G.toThousands = function (num) {
        return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    };

    const WARN_DESC_LIST = [
        '547207638',
        '547207638',
        '547206113',
        '547206113',
        '547207638',
        '547207638',
        '547206113',
        '547206113',
        '547207638',
        '547207638',
        '547206113',
    ];

    class Main {
        constructor() {
            let g2d = this.g2d = new ht.graph.GraphView();
            this.g2dDm = g2d.getDataModel();

            var handler = function (e) {
                if (g2d.getDataAt(e)) { // 如果点击到的位置有节点信息
                    e.preventDefault();
                    e.stopPropagation();
                }
            };
            g2d.getView().addEventListener('mousedown', handler);
            g2d.getView().addEventListener('click', handler);
            g2d.getView().addEventListener('touchstart', handler);

            // 选中边框为0
            g2d.getSelectWidth = function () { return 0; };
            // 禁止鼠标缩放
            g2d.handleScroll = function () { };
            // 禁止 touch 下双指缩放
            g2d.handlePinch = function () { };
            // 禁止平移
            g2d.setPannable(false);
            // 隐藏滚动条
            g2d.setScrollBarVisible(false);
            // 2D 中所有节点不可拖动
            g2d.setMovableFunc(function () { return false; });

            this.load2dScene();
        }

        load2dScene() {
            let g2d = this.g2d;
            let g2dDm = this.g2dDm;
            g2d.deserialize('displays/HT-Project/23-正泰/正泰仪表-正泰传感器能源管理系统.json', json => {

                // 右上角时间显示
                this.initTime();

                // 初始化标签节点
                this.totalMoney = g2dDm.getDataByTag('totalMoney');
                this.totalExchangeTimes = g2dDm.getDataByTag('totalExchangeTimes');
                this.electricityMoney = g2dDm.getDataByTag('electricityMoney');
                this.waterMoney = g2dDm.getDataByTag('waterMoney');

                // 交易渠道
                this.aliPay = g2dDm.getDataByTag('aliPay');
                this.wechatPay = g2dDm.getDataByTag('wechatPay');
                this.cashPay = g2dDm.getDataByTag('cashPay');
                this.payTypeChart = g2dDm.getDataByTag('payTypeChart');

                // 项目统计
                this.gateway = g2dDm.getDataByTag('gateway');
                this.electricityMeter = this.g2dDm.getDataByTag('electricityMeter');
                this.waterMeter = this.g2dDm.getDataByTag('waterMeter');
                this.user = g2dDm.getDataByTag('user');

                // 用能走势图
                this.useEnergyTrendChart = g2dDm.getDataByTag('useEnergyTrendChart');

                // 能耗类型分布 -- 饼图
                this.energyTypeChart = g2dDm.getDataByTag('energyTypeChart');
                this.percent = g2dDm.getDataByTag('percent');

                // 用能排名 -- 横向柱状图
                this.energyRatingChart = g2dDm.getDataByTag('energyRatingChart');

                // 交易趋势分析 --- 柱状图
                this.exchangeTrendChart = g2dDm.getDataByTag('exchangeTrendChart');

                // 抄表成功率
                this.successRate = this.g2dDm.getDataByTag('successRate');

                // 实时告警
                this.realTimeAlarmTable = this.g2dDm.getDataByTag('realTimeAlarmTable');

                // 今日用水 今日用电
                // 1号楼
                this.todayElec1 = g2dDm.getDataByTag('todayElec1');
                this.todayWater1 = g2dDm.getDataByTag('todayWater1');
                // 2号楼
                this.todayElec2 = g2dDm.getDataByTag('todayElec2');
                this.todayWater2 = g2dDm.getDataByTag('todayWater2');
                // 3号楼
                this.todayElec3 = g2dDm.getDataByTag('todayElec3');
                this.todayWater3 = g2dDm.getDataByTag('todayWater3');

                // this.todayElecPan = g2dDm.getDataByTag('todayElecPan'); // 今日用电
                // this.todayWaterPan = g2dDm.getDataByTag('todayWaterPan'); // 今日用水


                // 接口对接
                this.getData(); // 其他信息
                this.getRollData(); // 累计交易流水/次数
                this.getTodayEnergy(); // 今日用电/用水
                this.getUseEnergyTrend(); // 用能走势图
                this.getEnergyTypeDistribution(); // 能耗类型分布
                this.getUseEnergyRating(); // 用能排名
                this.getExchangeTrend(); // 交易趋势分析

                // 累计金额、累计交易次数 --- 10s 更新一次数据
                setInterval(() => {
                    this.getRollData();

                    // axios.get('/getTotalInfo').then(resp => {

                    //     // let r = Math.random() * 1000 + 50;
                    //     // let totalMoneyData = r.toFixed(2);

                    //     let totalMoneyText = Number(this.totalMoney.s('text'));
                    //     let totalMoneyData = resp.data[0];
                    //     // console.log('totalmonenyData    ' + totalMoneyData);
                    //     // console.log('totalMoneyText: ' + totalMoneyText);
                    //     g2dDm.enableAnimation(1);
                    //     this.totalMoney.setAnimation({
                    //         show: {
                    //             property: "text",
                    //             accessType: "style",
                    //             from: totalMoneyText,
                    //             to: totalMoneyData,
                    //             frames: (totalMoneyData - totalMoneyText),
                    //             repeat: false,
                    //             // easing: 'Expo.easeOut'
                    //             easing: 'Linear',
                    //         },
                    //         start: ["show"]
                    //     });

                    //     let totalExchangeTimesText = Number(this.totalExchangeTimes.s('text'));
                    //     // let totalExchangeTimesData = util.toFixed(Math.random() * 2000 + 40);
                    //     let totalExchangeTimesData = resp.data[1];
                    //     this.totalExchangeTimes.setAnimation({
                    //         show: {
                    //             property: "text",
                    //             accessType: "style",
                    //             from: totalExchangeTimesText,
                    //             to: totalExchangeTimesData,
                    //             frames: totalExchangeTimesData - totalExchangeTimesText,
                    //             repeat: false,
                    //             easing: 'Linear',
                    //         },
                    //         start: ["show"]
                    //     });

                    // }).catch(e => {
                    //     console.log(e);
                    //     return;
                    // });
                }, 10000);

                // 今日数据每 30s 刷新一次
                setInterval(() => {
                    this.getTodayEnergy();
                }, 30000);

                // 交易趋势分析 1h 更新一次
                setInterval(() => {
                    this.getExchangeTrend();
                }, 3600000);
            });
        }

        // 时间显示
        initTime() {
            let g2dDm = this.g2dDm;
            let date = new Date();
            var bg = g2dDm.getDataByTag('background');
            bg.a('date', date.getFullYear() + '年 ' + G.prefixInteger((date.getMonth() + 1), 2) + '月 ' + G.prefixInteger(date.getDate(), 2) + '日');
            bg.a('dateTime', G.getDateTime());

            setInterval(function () {
                bg.a('date', date.getFullYear() + '年 ' + G.prefixInteger((date.getMonth() + 1), 2) + '月 ' + G.prefixInteger(date.getDate(), 2) + '日');
                bg.a('dateTime', G.getDateTime());
            }, 1000);
        }

        // 接收其他数据
        getData() {
            axios.get('/Trailingend/Core.ashx').then(resp => {

                // 累计用电金额
                let electricityData = resp.data[0];
                this.electricityMoney.s({
                    'text': util.toFixed(electricityData, 2)
                });

                // 累计用水金额
                let waterMoneyData = resp.data[1];
                this.waterMoney.s({
                    'text': util.toFixed(waterMoneyData, 2)
                });

                // 项目统计
                // 网关数量
                let gatewayData = resp.data[2];
                let userData = resp.data[3];
                let elecMeterNum = resp.data[4];
                let waterMeterNum = resp.data[5];
                // let elecMeterNum = 255;
                // let waterMeterNum = 29;
                this.gateway.s({
                    'text': gatewayData
                });
                // 电表数量
                this.electricityMeter.s({
                    'text': elecMeterNum
                });
                // 水表数量
                this.waterMeter.s({
                    'text': waterMeterNum
                });
                // 用户数量
                this.user.s({
                    'text': userData
                });

                // 交易渠道分布
                let payType = resp.data[6];
                this.aliPay.s({
                    'text': util.toFixed(payType[0])
                });
                this.wechatPay.s({
                    'text': util.toFixed(payType[1])
                });
                this.cashPay.s({
                    'text': util.toFixed(payType[2])
                });
                // 支付渠道 -- 饼图
                let payTypeObjArr = [
                    { "name": "支付宝", "value": payType[0] },
                    { "name": "微信", "value": payType[1] },
                    { "name": "现金", "value": payType[2] },
                ];
                this.payTypeChart.a('pieData', payTypeObjArr);

                // 抄表成功率
                this.successRate.s({
                    'text': resp.data[7]
                });

                // 实时告警
                let realTimeAlarmData = resp.data[8];
                // console.log(realTimeAlarmData);
                // if (realTimeAlarmData.length > 0) {
                //     console.log('what are you hinting for?')
                //     this.realTimeAlarmTable.a('ht.dataSource', realTimeAlarmData);
                // }
                // else {
                setInterval(() => {
                    let startTime = Date.now() - 60000 * 60;
                    let endTime = Date.now() - 60000 * 10;
                    let data = [];
                    let total = Math.floor(Math.random() * 10) + 5;
                    for (let i = 0; i < total; i++) {
                        data.push({
                            "GATEWAYADDRESS": WARN_DESC_LIST[Math.floor(Math.random() * WARN_DESC_LIST.length)],
                            "DWONELECTIME": util.formatDate(new Date(startTime), 'YYYY-MM-DD hh:mm:ss'),
                            "UPELECTIME": /*G.getDate() + ' ' + G.getDateTime()*/util.formatDate(new Date(endTime), 'YYYY-MM-DD hh:mm:ss'),
                        });
                        startTime += Math.floor(300000 * Math.random()) + 2000;
                        endTime += Math.floor(100000 * Math.random()) + 2000;
                    }
                    this.realTimeAlarmTable.a('ht.dataSource', data);
                }, 6000);

                // }

            }).catch(e => {
                console.log(e);
                return
            });
        }

        // 累计交易流水/次数
        getRollData() {
            axios.get('/getTotalInfo').then(resp => {
                // 累计交易流水
                this.totalMoney.s({
                    // 'text': util.toFixed(Math.random() * 600 + 40)
                    'text': resp.data[0]
                });
                // 累计交易次数
                this.totalExchangeTimes.s({
                    // 'text': util.toFixed(Math.random() * 600 + 40)
                    'text': resp.data[1]
                });
            }).catch(e => {
                console.log(e);
                return
            });
        }

        // 今日用水/用电 
        getTodayEnergy() {
            axios.get('/getTodayEnergy').then(resp => {
                // let todayElecData = resp.data[0];
                // let todayWaterData = resp.data[1];
                let todayElec1Data = resp.data[0] * 70 / 100;
                let todayElec2Data = resp.data[0] * 20 / 100;
                let todayElec3Data = resp.data[0] * 10 / 100;

                // console.log('todayEnergy:  ' + todayElec1Data);

                let todayWater1Data = resp.data[1] * 70 / 100;
                let todayWater2Data = resp.data[1] * 20 / 100;
                let todayWater3Data = resp.data[1] * 10 / 100;
                // this.todayElecPan.a('todayElec', todayElecData);
                // this.todayWaterPan.a('todayWater', todayWaterData);

                if (todayElec1Data) {
                    this.todayElec1.a('ht.value', todayElec1Data.toFixed(2));
                }
                if (todayWater1Data) {
                    this.todayWater1.a('ht.value', todayWater1Data.toFixed(2));
                }

                if (todayElec2Data) {
                    this.todayElec2.a('ht.value', todayElec2Data.toFixed(2));
                }
                if (todayWater2Data) {
                    this.todayWater2.a('ht.value', todayWater2Data.toFixed(2));
                }

                if (todayElec3Data) {
                    this.todayElec3.a('ht.value', todayElec3Data.toFixed(2));
                }
                if (todayWater3Data) {
                    this.todayWater3.a('ht.value', todayWater3Data.toFixed(2));
                }

            }).catch(e => {
                console.log(e);
                return
            });
        }

        // 交易趋势分析
        getExchangeTrend() {
            axios.get('/getExchangeTrend').then(resp => {
                // 交易趋势分析
                let exchangeEleTrendDate = resp.data[0];
                let exchangeEleTrendMoney = resp.data[1];
                let exchangeWaterTrendMoney = resp.data[2];
                this.exchangeTrendChart.a('xAxisData', exchangeEleTrendDate);
                this.exchangeTrendChart.a('barEleData', exchangeEleTrendMoney);
                this.exchangeTrendChart.a('barWaterData', exchangeWaterTrendMoney);
            }).catch(e => {
                console.log(e);
                return
            });
        }

        // 用能走势图
        getUseEnergyTrend() {
            axios.get('/getUseEnergyTrend').then(resp => {
                let useElecThisMonthDateData = resp.data[0];
                let useElecThisMonthAmountData = resp.data[1];
                let useElecLastMonthAmountData = resp.data[2];
                let useWaterThisMonthAmountData = resp.data[3];
                let useWaterLastMonthAmountData = resp.data[4];
                this.useEnergyTrendChart.a('useElecThisMonth', useElecThisMonthAmountData);
                this.useEnergyTrendChart.a('useElecLastMonth', useElecLastMonthAmountData);
                this.useEnergyTrendChart.a('useWaterThisMonth', useWaterThisMonthAmountData);
                this.useEnergyTrendChart.a('useWaterLastMonth', useWaterLastMonthAmountData);
                this.useEnergyTrendChart.a('xAxisData', useElecThisMonthDateData);
            }).catch(e => {
                console.log(e);
                return
            });
        }

        // 能耗类型分布
        getEnergyTypeDistribution() {
            axios.get('/getEnergyTypeDistribution').then(resp => {
                // 能耗类型分布
                let energyTypeData = resp.data;
                let energyUseObjArr = [
                    { "name": "空调", "value": energyTypeData[0] },
                    { "name": "饮用水", "value": energyTypeData[1] },
                    { "name": "动力", "value": energyTypeData[2] },
                    { "name": "特殊用电", "value": energyTypeData[3] },
                    { "name": "污水", "value": energyTypeData[4] },
                    { "name": "照明插座", "value": energyTypeData[5] },
                    { "name": "其他", "value": energyTypeData[6] },
                ];
                this.energyTypeChart.a('pieData', energyUseObjArr);
            }).catch(e => {
                console.log(e);
                return
            });
        }

        // 用能排名
        getUseEnergyRating() {
            axios.get('/getUseEnergyRating').then(resp => {
                // 用能排名
                let useEleRatingData = resp.data[0];
                let useWaterRatingData = resp.data[1];
                let useEleRatingArr = [
                    { "name": "1号楼", "value": useEleRatingData[0] },
                    { "name": "2号楼", "value": useEleRatingData[1] },
                    { "name": "3号楼", "value": useEleRatingData[2] },
                ];
                let useWaterRatingArr = [
                    { "name": "1号楼", "value": -useWaterRatingData[0] },
                    { "name": "2号楼", "value": -useWaterRatingData[1] },
                    { "name": "3号楼", "value": -useWaterRatingData[2] },
                ];
                this.energyRatingChart.a('barDataPlus', useEleRatingArr);
                this.energyRatingChart.a('barDataMinus', useWaterRatingArr);
            }).catch(e => {
                console.log(e);
                return
            });
        }

        addToDOM() {
            this.g2d.addToDOM();
        }


    }

    let app = new Main();
    app.addToDOM();

}());
//# sourceMappingURL=index.js.map
