const express = require('express');
const axios = require('axios');

const app = express();
const port = 8081;

// app.get('/', function (req, res) {
//     res.send('hello world');
// });

// export function getData() {
//     app.get('/', function (req, res) {
    
//         axios.all([getTotalMoneyData(), getTotalExchangeTimesData()])
//             .then(axios.spread(function (totalMoney, totalExchange) {
//                 // Both requests are now completed
//                 console.log(totalMoney.data);
//                 console.log(totalExchange.data);
//             }));
//     });
// }

app.get('/', function (req, res) {
    // axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=GetRegionRevenueData', {

    //     "TID": "530|475|510|507|505|508|501|506|504|509|512|515|511",  //终端id 用|分隔
    //     "STIME": "2016-01", //开始时间
    //     "ETIME": "2019-09", //结束时间
    //     "TYPE": "M",//时间类型，月：M,日：D
    //     "MENUS_TYPE": ""//0：电 1：水


    // })
    //     .then(response => {
    //         // console.log(response);
    //         res.send(response.data);
    //     });

    axios.all([getTotalMoneyData(), getTotalExchangeTimesData()])
        .then(axios.spread(function (totalMoney, totalExchange) {
            // Both requests are now completed
            console.log(totalMoney.data);
            console.log(totalExchange.data);
        }));
});

app.post('/Trailingend/Core.ashx', (req, resp) => {
    axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=GetReportInfoByPermission')
        .then((req1, resp1) => {
            resp.send(resp1.data);
        })
})

// 同时发送多个请求
function getTotalMoneyData() {
    return axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=GetRegionRevenueData', {

        "TID": "530|475|510|507|505|508|501|506|504|509|512|515|511",  //终端id 用|分隔
        "STIME": "2016-01", //开始时间
        "ETIME": "2019-09", //结束时间
        "TYPE": "M",//时间类型，月：M,日：D
        "MENUS_TYPE": ""//0：电 1：水


    })
}

function getTotalExchangeTimesData() {
    return axios.post('http://ems.chint.com/Trailingend/Core.ashx?funcname=GetSellDataByNum', {

            "TID":"475|501|504|505|506|507|508|509|510|511|512|515",
            "NUM":"",//条数  为空则查全部
            "PAGE_NUM":"",//当前页码 为空 则查全部
            "MENUS_TYPE":""//为空，则水电都查

    })
}


// export function getTotalMoney() {
//     return app.get('/', function(req, res){
//         axios.post('http://newplatform.chintim.com/Trailingend/Core.ashx?funcname=GetSltInfoBySub', {
//             "SUB_ID": "5"
//         })
//             .then(response => {
//                 // console.log(response);
//                 res.send(response.data);
//             });
//     })

//     return axios.post('http://newplatform.chintim.com/Trailingend/Core.ashx?funcname=GetSltInfoBySub', {
//         "SUB_ID": "5"
//     })
//     .then(response=>{
//         console.log(response);
//         res.send(response.data);
//     });
// }


var server = app.listen(port, function () {

    var host = server.address().address;
    // var port = server.address().port;

    // console.log("访问地址为： http://%s:%s", host, port);
});