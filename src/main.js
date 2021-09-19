// webpack 入口文件，所有需要参与打包的文件，都必须在入口文件引入（文件后缀名一定要写全）
// import "./js/jquery-1.12.4";
// import "./js/canvas-script-ES6";
import "./js/test-b.js";

import "./css/reset.css";
import "./css/my.css";

// 引入图片资源
import i1 from "./img/apo-01.jpg";
import i2 from "./img/apo-02.jpg";
import i3 from "./img/apo-03.jpg";
import i4 from "./img/apo-04.jpg";
import i5 from "./img/apo-05.jpg";

// 引用图片对象
let img1 = document.createElement("img");
img1.src = i1;
let img2 = document.createElement("img");
img2.src = i2;
let img3 = document.createElement("img");
img3.src = i3;
let img4 = document.createElement("img");
img4.src = i4;
let img5 = document.createElement("img");
img5.src = i5;

// 获取挂载点
let app = document.getElementById("app");
app.appendChild(img1);
app.appendChild(img2);
app.appendChild(img3);
app.appendChild(img4);
app.appendChild(img5);

// // 热更新测试
console.log("热更新测试");
