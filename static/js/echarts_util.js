
//v1:div 
//v2:图表宽度,不确定请传0 
//v3:图表高度,不确定请传0 
//v4:系数默认1 
//v5:图表标题 
//v6:数量轴(单位,间隔) 
//v7:类目轴 
//v8:数据
function createBarGraph(docu,width,height,ratio,title,numAxis,category,data){
    let option = {
             // 标题组件 v1:标题 v2:内边距
            title:{text:title,padding: [10,0,0,10]},
            //提示框组件
            tooltip: {trigger: 'axis'},
            // 图例组件
            legend: {},
            color: ['#FFCC33'],
            // 绘图网格 v1:是否显示 v2:网格颜色 v3:边框宽度
            grid: {show: true,borderColor:'#9A78BB',borderWidth: 1,left: 50,right: 50},
            // 数值轴。
            xAxis: numAxis,
            // 类目轴(category)
            yAxis: {type: 'category', data: category},
            // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
            series: [{type: 'bar',barWidth:10,data:data}]
        }
    createChart(docu,width,height,ratio,option)
}



//v1:div 
//v2:图表宽度,不确定请传0 
//v3:图表高度,不确定请传0 
//v4:系数默认1 
//v5:图表标题 
//v6:数量轴(单位,间隔)
//v7:类目轴  
//v8:数据
function createBarLineBlend(docu,width,height,ratio,title,numAxis,category,data1,data2,data3,data4){
    let option = {
            // 标题组件 v1:标题 v2:内边距
            title:{text:title,padding: [10,0,0,10]},
            //提示框组件
            tooltip: {trigger: 'axis' },
            //绘图网格
            grid: {show: true,borderColor:'#9A78BB',borderWidth: 1,left: 50,right: 50},
            //图例组件
            legend: {data:['数据','数据1','数据2','数据3']},
            //类目轴 //v1:标明类目轴 v2:全部显示 v3:旋转30度 v4:类目
            xAxis: [{type: 'category',axisLabel:{interval:0,rotate:45},data: category}],
            yAxis: numAxis,
            series: [
                //柱状图 v1:数据名(与legend中相对应) v2:类型(柱状图) v3:柱宽 v4:数据 v5:样式 
                {name:'数据',type:'bar',barWidth:15,data:data1,			
                    /*设置柱状图颜色*/
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                // build a color map as your need.
                                var colorList = [
                                    '#fe4f4f','#fead33','#feca2b','#fef728','#c5ee4a',
                                    '#87ee4a','#46eda9','#47e4ed','#4bbbee','#7646d8',
                                    '#924ae2','#C6E579','#F4E001','#F0805A','#26C0C0'
                                ];
                                return colorList[params.dataIndex]
                            },
                            /*信息显示方式*/
                            label: {
                                show: true,
                                position: 'top',
                            }
                        }
                    }
                },
                //设置折线1
                {name:'数据1',type:'line',symbol:'roundRect',symbolSize: 5,data:data2,
                    itemStyle : {  /*设置折线颜色*/
                        normal : {
                            color:'#908B95'
                        }
                    }
                },
                //设置折线2
                {name:'数据2',type:'line',symbol:'circle',symbolSize: 5,data:data3,
                    itemStyle : {  /*设置折线颜色*/
                        normal : {
                            color:'#9235ED'
                        }
                    }
                },
                //设置折线3
                {name:'数据3',type:'line', symbol:'rect',symbolSize: 5,data:data4,
                    itemStyle : {  /*设置折线颜色*/
                        normal : {
                            color:'#c4cddc'
                        }
                    }
                }
		    ]
        };
    createChart(docu,width,height,ratio,option)
}

//创建并绘制Chart
function createChart(docu,width,height,ratio,option){
    let resizeMainContainer = ""
    let tempWidth = ""
    let tempHeight = ""
    if(width == 0){
        tempWidth = window.innerWidth/ratio-20;
    }else{
        tempWidth = width;
    }
    if(height == 0){
        tempHeight = window.innerHeight*0.8;
    }else{
        tempHeight = height
    }
    //用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
    resizeMainContainer = function () {
        docu.style.width = tempWidth + 'px';
        docu.style.height = tempHeight + 'px';
    };
    //设置div容器高宽
    resizeMainContainer();
    // 初始化图表
    let myChart = echarts.init(docu);
    $(window).on('resize',function(){//
            //屏幕大小自适应，重置容器高宽
            resizeMainContainer();
            myChart.resize();
    });
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}