// 声明提前
var timer = null;
var i = 0;
const Angle = 0.5 * Math.PI;    // 90°（π/2）角
function addNum(percent, width) {  
    if(i < percent){  
        i++;  
        $('canvas.process').text(i+"%");  
        drawProcess(width);  
    } else {  
        clearInterval(timer);  
    }  
}  
//设置外环的宽度(其实<canvas>设置的高宽是不起作用的，而是这里设置才会有用)
function drawProcess(width) {    
    $('canvas.process').each(function() {  // 遍历指定的对象和数组
        var text = $(this).text();  
        var process = text.substring(0, text.length-1);     
        var canvas = this;    
        var context = canvas.getContext('2d');    
        context.clearRect(0, 0, width, width);    // 清除一个区域
  
        //环背景色
        context.beginPath();    
        context.moveTo(width/2, width/2);    // 路径起点（圆心）
        context.arc(width/2, width/2, width/2, 0, Math.PI * 2, false);    // 3点方向顺时针画圆（2π 即 360°）
        context.closePath();    
        context.fillStyle = '#ddd';    
        context.fill();    
        
        //环前景色渐变色
        context.beginPath();    
        context.moveTo(width/2, width/2);      
        // 减 90°（π/2）的原因：canvas画圆是从3点钟方向开始的，减90°就可以设置从12点钟方向开始（顺时针情况下）
        context.arc(
            width/2,    // 原点 x轴位置
            width/2,    // 原点 y轴位置
            width/2,    // 半径
            0 - Angle,  // 起点（12点钟方向）
            (Math.PI * 2 * process / 100) - Angle,  // 终点（12点钟方向）
            false   // 顺时针
        );    
        context.closePath();   
        var lGrd = context.createLinearGradient(0, 0, 300, 300);  // 线性的渐变对象。区分 createRadialGradient：圆形渐变对象
        lGrd.addColorStop(0, '#ff0000');  
        lGrd.addColorStop(0.5,"blue");
        lGrd.addColorStop(1, '#0000ff');  
        context.fillStyle = lGrd;  
        context.fill();     
  
        //设置内圆透明
        context.beginPath();    
        context.moveTo(width/2, width/2);    
        context.arc(width/2, width/2, width/2 - 10, 0, Math.PI * 2, true);    // 3点方向逆时针画圆（2π 即 360°），半径：100
        context.closePath();    
        context.fillStyle = 'rgba(255,255,255,1)';    
        context.fill();    
  
        //设置内环边框跟百分度
        context.beginPath();    
        context.arc(width/2, width/2, width/2 - 20, 0, Math.PI * 2, true);    
        context.closePath();    
        context.strokeStyle = '#ddd';    
        context.stroke();    
        context.font = "bold 9pt Arial";    
        context.fillStyle = '#2a2';    
        context.textAlign = 'center';    
        context.textBaseline = 'middle';    
        context.moveTo(width/2, width/2);    
        context.fillText(text, width/2, width/2);    
    });  
}  

function init() {
    i = 0;
        clearInterval(timer);
        timer = setInterval("addNum(100, 100)", 50);
}
