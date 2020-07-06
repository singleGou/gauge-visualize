import util from '../util/util';
import G from '../G'

// 累计金额数据
export function getTotalMoneyData() {
    var result = "";
    var date = new Date();

    $.ajax({
        type: "POST",
        url: "funcname=GetRegionRevenueData",
        contentType: "text/json",
        // async: true, // 异步
        async: false, // 此方式获取 ajax 返回值必须设置成同步的，否则获取不到返回值
        data: JSON.stringify({
            "TID": "475|501|504|505|506|507|508|509|510|511|512|515",  //终端id 用|分隔
            "STIME": "2016-01", //开始时间
            "ETIME": G.getDate(), //结束时间
            "TYPE": "M",//时间类型，月：M,日：D
            "MENUS_TYPE": ""//0：电 1：水       
        }),
        success: json => {
            JSON.stringify(json);
            result = json[0].SUM_AMOUNT;
        }, error: () => {
            console.log("ERROR!");
        }

    });
    return result;
}

// 累计交易次数
export function getTotalExchangeTimesData() {
    var result = "";
    $.ajax({
        type: "POST",
        url: "funcname=GetSellDataByNum",
        contentType: "text/json",
        // async: true, // 异步
        async: false, // 此方式获取 ajax 返回值必须设置成同步的，否则获取不到返回值
        data: JSON.stringify({
            "GROUP_SLT_ID": "17|2379|2349|2382|2380|14|2377|2375|2378|2368|2373|2371|2109|2381|15|2376|2374",
            "NUM": "",//条数  为空则查全部
            "PAGE_NUM": "",//当前页码 为空 则查全部
            "MENUS_TYPE": ""//为空，则水电都查
        }),
        success: json => {
            JSON.stringify(json);
            result = json.length;
            console.log(result);
        }, error: () => {
            console.log("ERROR!");
        }

    });
    return result;
}

// 用能走势图 --- error
export function getPowerTrendData() {
    var result = "";
    var date = new Date();
    $.ajax({
        type: "POST",
        url: "funcname=GetDayEPower",
        contentType: "text/json",
        // async: true, // 异步
        async: false, // 此方式获取 ajax 返回值必须设置成同步的，否则获取不到返回值
        data: JSON.stringify({
            "TID": "475|501|504|505|506|507|508|509|510|511|512|515", //
            "TIME": G.getDate(),//2019，2019-07，2019-07-30
            "TYPE": "D",//Y:年，M:月，D:日
            "MENUS_TYPE": "" //0：电 1：水
        }),
        success: json => {
            console.log("用能走势图数据");

        }, error: () => {
            console.log("ERROR!");
        }

    });
    return result;
}

// 能耗类型分布
export function getPowerTypeData() {
    var result = "";
    $.ajax({
        type: "POST",
        url: "funcname=GetHomeERegionPowerForFunArea",
        contentType: "text/json",
        // async: true, // 异步
        async: false, // 此方式获取 ajax 返回值必须设置成同步的，否则获取不到返回值
        data: JSON.stringify({
            "TID": "475|501|504|505|506|507|508|509|510|511|512|515", //
            "TIME": G.getDate(),//2019，2019-07，2019-07-30
            "TYPE": "D",//Y:年，M:月，D:日
            "MENUS_TYPE": "" //0：电 1：水        
        }),
        success: json => {
            console.log("能耗类型分布数据");

        }, error: () => {
            console.log("ERROR!");
        }

    });
    return result;
}

// 用能排名
export function getPowerRankingData() {
    var result = "";
    $.ajax({
        type: "POST",
        url: "funcname=GetUseEnergyDataByRegion",
        contentType: "text/json",
        // async: true, // 异步
        async: false, // 此方式获取 ajax 返回值必须设置成同步的，否则获取不到返回值
        data: JSON.stringify({
            "GROUP_SLT_ID": "17|2379|2349|2382|2380|14|2377|2375|2378|2368|2373|2371|2109|2381|15|2376|2374", //从档案信息中获取
            "TIME": "2019-07",//2019，2019-07，2019-07-30
            "TYPE": "M",//Y:年，M:月，D:日
            "MENUS_TYPE": "0" //0：电 1：水
        }),
        success: json => {
            console.log("用能排名数据");

        }, error: () => {
            console.log("ERROR!");
        }

    });
    return result;
}

// 实时告警
export function getRealtimeAlarmData() {
    var result = "";
    $.ajax({
        type: "POST",
        url: "funcname=GetReportInfoByPermission",
        contentType: "text/json",
        // async: true, // 异步
        async: false, // 此方式获取 ajax 返回值必须设置成同步的，否则获取不到返回值
        data: JSON.stringify({
            "GROUP_SLT_ID": "17|2379|2349|2382|2380|14|2377|2375|2378|2368|2373|2371|2109|2381|15|2376|2374"
        }),
        success: json => {
            console.log("实时告警数据");

        }, error: () => {
            console.log("ERROR!");
        }

    });
    return result;
}

// 抄表成功率数据
export function getSuccessRateData() {
    var result = "";
    $.ajax({
        type: "POST",
        url: "funcname=GetEReadSuccessRate",
        contentType: "text/json",
        // async: true, // 异步
        async: false, // 此方式获取 ajax 返回值必须设置成同步的，否则获取不到返回值
        data: JSON.stringify({
            "TID": "475|501|504|505|506|507|508|509|510|511|512|515",//终端编号用|分隔档案中获取
            "TIME": G.getDate(),//时间 如：2019-08-01
            // "TIME": "2019-08-01",//时间 如：2019-08-01
            "TYPE": "D",//
            "MENUS_TYPE": ""////0：电 1：水
        }),
        success: json => {
            JSON.stringify(json);
            result = json[6].METER_RATE;
            console.log(result);
        }, error: () => {
            console.log("ERROR!");
        }

    });
    return result;
}


// export default class DataSource {
//     constructor(main) {

//         this.main = main;
//         this.g2d = main.g2d;
//         this.siteCode = main.siteCode;
//         let dm = this.dm = this.g2d.dm();

//         this.successRate = dm.getDataByTag('successRate');

//         this.loadData();
//         // 30s 刷新一次数据
//         setInterval(() => {
//             this.loadData();
//         }, 30000);

//     }

//     loadData() {
//         // this.getTotalMoney();
//         // this.getTotalExchangeTimes();
//         this.getSltId();

//         console.log(this.getSuccessRateData());

//     }

//     // 累计金额 --- 未获取到
//     getTotalMoney() {
//         $.ajax({
//             type: "POST",
//             url: "funcname=GetRegionRevenueData",
//             contentType: "text/json",
//             async: true,
//             data: JSON.stringify({
//                 "TID": "17|2379|2349|2382|2380|14|2377|2375|2378|2368|2373|2371|2109|2381|15|2376|2374",  //终端id 用|分隔
//                 "TIME": "2019",
//                 "TYPE": "Y",
//                 "MENUS_TYPE": "0"//0：电 1：水
//             }),
//             success: result => {
//                 console.log(JSON.stringify(result));
//             }
//         });
//     }

//     // 累计交易次数 --- 未获取到
//     getTotalExchangeTimes() {
//         $.ajax({
//             type: "POST",
//             url: "funcname=GetSellDataByNum",
//             contentType: "text/json",
//             async: true,
//             data: JSON.stringify({
//                 "GROUP_SLT_ID": "17|2379|2349|2382|2380|14|2377|2375|2378|2368|2373|2371|2109|2381|15|2376|2374",  //终端id 用|分隔
//                 "NUM": "",
//                 "PAGE_NUM": "",
//                 "MENUS_TYPE": ""
//             }),
//             success: result => {
//                 console.log(JSON.stringify(result));
//             }
//         });
//     }

//     getSltId() {
//         $.ajax({
//             type: "POST",
//             url: "funcname=GetSltInfoBySub",
//             contentType: "text/json",
//             // dataType: "text/json",
//             async: true,
//             data: JSON.stringify({
//                 "SUB_ID": "5"
//             }),
//             success: result => {
//                 console.log(JSON.stringify(result));
//             }
//         });

//         // return JSON.stringify(result);

//     }

//     // 抄表成功率
//     getSuccessRateData() {
//         // this.successRate.s({
//         //     'text': util.toFixed(Math.random() * 100) + '%'
//         // });

//         var result = "";
//         $.ajax({
//             type: "POST",
//             url: "funcname=GetEReadSuccessRate",
//             contentType: "text/json",
//             // async: true, // 异步
//             async: false, // 此方式获取 ajax 返回值必须设置成同步的，否则获取不到返回值
//             data: JSON.stringify({
//                 "TID": "475|501|504|505|506|507|508|509|510|511|512|515",//终端编号用|分隔档案中获取
//                 "TIME": G.getDate(),//时间 如：2019-08-01
//                 "TYPE": "D",//
//                 "MENUS_TYPE": ""////0：电 1：水
//             }),
//             success: json => {
//                 JSON.stringify(json);
//                 // console.log(result[6]);
//                 // data = result[6].METER_RATE;
//                 result = json[6].METER_RATE;
//                 console.log(result);
//             }, error: () => {
//                 console.log("ERROR!");
//             }

//         });
//         return result;

//     }

//     // 能耗类型分布

//     // 用电量走势线路图

//     // 累计用电

//     // 累计用水

//     // 交易趋势分析图

//     // 项目统计

//     // 实时告警
// }