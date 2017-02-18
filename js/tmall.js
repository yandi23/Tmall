//banner123hover效果
bannerMonseover();
function bannerMonseover() {
    var banOne = document.getElementById("banner01");
    var myTao = utils.getByClass("mytao", banOne)[0];
    var shoucang = utils.getByClass("shoucang", banOne)[0];
    var phone = utils.getByClass("phone", banOne)[0];
    changeHover(myTao);
    changeHover(shoucang);
    changeHover(phone);
    function changeHover(ele) {
        var ul = ele.getElementsByTagName("ul")[0];
        var span = ele.getElementsByTagName("span")[0];
        var oLis = ele.getElementsByTagName("li");
        var oDiv = ele.getElementsByTagName("div")[0];
        for (var i = 0; i < oLis.length; i++) {
            oLis[i].onmouseover = function () {
                this.style.color = "#c40000";
                this.style.textDecoration = "underline";
                this.style.cursor = "pointer";
            };
            oLis[i].onmouseout = function () {
                this.style.color = "";
                this.style.textDecoration = "";
                this.style.cursor = "";
            }
        }
        ele.onmouseover = function () {
            if (oDiv) {
                oDiv.style.display = "block";
                return
            }
            ele.style.backgroundColor = "#ffffff";
            ul.style.display = "block";
            span.className = "jiao2";
        };
        ele.onmouseout = function () {
            if (oDiv) {
                oDiv.style.display = "none";
                return
            }
            ele.style.backgroundColor = "";
            ul.style.display = "none";
            span.className = "jiao1";
        }
    }

    var shangjia = utils.getByClass("shangjia", banOne)[0];
    var daohang = utils.getByClass("daohang", banOne)[0];
    changeHover2(shangjia);
    changeHover2(daohang);
    function changeHover2(ele) {
        var span = ele.getElementsByTagName("span")[0];
        var oDiv = ele.getElementsByTagName("div")[0];
        ele.onmouseover = function () {
            ele.style.backgroundColor = "#ffffff";
            oDiv.style.display = "block";
            span.className = "jiao2";
        };
        ele.onmouseout = function () {
            ele.style.backgroundColor = "";
            oDiv.style.display = "none";
            span.className = "jiao1";
        }
    }
}

//轮播图
autoBanner();
function autoBanner() {
    var oUl = document.getElementById("autobanner");
    var oLis = oUl.getElementsByTagName("li");
    var oSpans = oUl.getElementsByTagName("span");
    var oImges = utils.getByClass("oulimg", oUl);
    var bigHead = document.getElementById("header03bg");
    var oas = oUl.getElementsByTagName("a");
    oUl.timer2 = setTimeout(longTimeImg, 600);
    function longTimeImg() {
        for (var i = 0; i < oImges.length; i++) {
            var trueImg = oImges[i].getAttribute("truesrc");
            var oImg = new Image;
            oImg.src = trueImg;
            oImg.i = i;
            oImg.onload = function () {
                oImges[this.i].src = this.src;
            }
        }
        oUl.style.background = "#e5e5e5";
        bigHead.style.backgroundColor = "#F1373A";
        for (var o = 0; o < oas.length; o++) {
            oas[o].style.display = "block"
        }
    }

    var interval = 4000;
    var step = 0;
    oUl.timer = setInterval(autoOpacity, interval);
    utils.css(oLis[0], "opacity", 1);
    utils.css(oLis[0], "zIndex", 1);

    function autoOpacity() {
        if (step >= oLis.length - 1) {
            step = -1;
        }
        step++;
        setBanner()
    }

    function setBanner() {
        for (var i = 0; i < oLis.length; i++) {
            if (i == step) {
                myAnimate(oLis[i], {opacity: 1, zIndex: 1}, 300);
                switch (step) {
                    case 0:
                        bigHead.style.backgroundColor = "#F1373A";
                        break;
                    case 1:
                        bigHead.style.backgroundColor = "#7902CD";
                        break;
                    case 2:
                        bigHead.style.backgroundColor = "#E8E8E8";
                        break;
                    case 3:
                        bigHead.style.backgroundColor = "#E8E8E8";
                        break;
                    case 4:
                        bigHead.style.backgroundColor = "#6762FD";
                        break;
                    case 5:
                        bigHead.style.backgroundColor = "#7F15B5";
                }
            } else {
                myAnimate(oLis[i], {opacity: 0, zIndex: 0}, 300);
            }
            // utils.css(oLis[i], "zIndex", 0);
        }
        //utils.css(oLis[step], "zIndex", 1);
        //myAnimate(oLis[step],{opacity:1},200,function(){
        //    for(var i=0;i<oLis.length;i++){
        //        if(i!==step){
        //            utils.css(oLis[i], "opacity", 0);
        //        }
        //    }
        //});
        pointer();
    }

    function pointer() {
        for (var i = 0; i < oSpans.length; i++) {
            oSpans[i].className = ""
        }
        oSpans[step].className = "select"
    }

    mouse();
    function mouse() {
        oUl.onmouseover = function () {
            clearInterval(oUl.timer)
        };
        oUl.onmouseout = function () {
            oUl.timer = setInterval(autoOpacity, interval);
        }
    }

    pointerMouse();
    function pointerMouse() {
        for (var i = 0; i < oSpans.length; i++) {
            oSpans[i].index = i;
            oSpans[i].onmouseover = function () {
                step = this.index;
                setBanner()
            }

        }
    }
}

//详细分类数据
cook();
function cook() {
    var ary = ["春装", "夏装", "秋装", "冬装", "男装", "女装", "童装", "上衣"];
    var ary2 = ["圆领T恤", "方领T恤", "短裤", "裙子", "长裤", "手机", "电脑", "帽子", "板鞋", "运动鞋", "塑料袋", "腰带", "饭盒", "被褥", "床单", "键盘", "鼠标", "内裤", "袜子", "飞机票", "火车票", "旅行箱", "书籍", "凉鞋"];
    var ary3 = ["当季流行", "夏季流行", "春季流行", "冬季流行", "流行一天", "去年流行", "昨天流行", "流行一年", "可能流行", "暂不流行"];
    var oBox = document.getElementById("header031");
    var str = "";
    for (var i = 0; i < 16; i++) {
        if (i == 0) {
            str += "<ul id='lefthead' class='lefthead'>";
            for (var j = 0; j < 16; j++) {
                str += "<li><img src='' alt=''/><a href='javascript:;'>" + ary[Math.round(Math.random() * (ary.length - 1))] + "</a><span>/</span><a href='javascript:;'>" + ary[Math.round(Math.random() * 7)] + "</a></li>"
            }
            str += "</ul>"
        }
        str += ' <div class="righthead">';
        str += '<div class="rightl">';
        str += '<div class="right_o">';
        for (var k = 0; k < 10; k++) {
            str += '<div class="right_ol"><p>' + ary3[Math.round(Math.random() * (ary3.length - 1))] + '</p><span></span></div>';
            str += '<div class="right_or">';
            for (var y = 0; y < 15; y++) {
                str += '<a href="javascript:;">' + ary2[Math.round(Math.random() * (ary2.length - 1))] + '</a>'
            }
            str += '</div>';
        }
        str += '</div>';
        str += '</div>';
        str += '<div class="inrightbox"></div>';
        str += '<div class="right2">';
        for (var e = 0; e < 17; e++) {
            if (e < 16) {
                str += '<a href="javascript:;"><img src="image/m' + Math.round(Math.random() * (16 - 1) + 1) + '.jpg" alt=""/></a>'
            } else if (e == 16) {
                str += '<a href="javascript:;" class="bigm17"><img src="image/m' + (e + 1) + '.jpg" alt=""/></a>'
            }
        }
        str += '</div>';
        str += '</div>'

    }
    oBox.innerHTML = str;
}

//热门品牌数据
hotcook();
function hotcook() {
    var oBox = document.getElementById("hotBrand");
    var str = '';
    for (var i = 0; i < 24; i++) {
        if (i < 23) {
            str += '<li>';
            str += '<div class="head05db"><img src="image/head05m' + Math.round(Math.random() * (5 - 1) + 1) + '.jpg" alt=""/></div>';
            str += '<div class="head05dn"><i></i><p>优惠券 ￥500</p><a href="javascript:;">点击进入</a></div>';
            str += '</li>'
        } else {
            str += '<li class="changeli">';
            str += '<img class="changeimg" src="image/xuanzhuan.png" alt=""/>';
            str += '<p class="changeword">换一批</p>';
            str += '</li>'
        }
    }
    oBox.innerHTML = str;
}

//详细分类
changeTab();
function changeTab() {
    var bigDiv = document.getElementById("header031");
    var oUl = document.getElementById("lefthead");
    var oLis = oUl.getElementsByTagName("li");
    var oDivs = utils.getByClass("righthead", bigDiv);
    for (var i = 0; i < oLis.length; i++) {
        (function (i) {
            oLis[i].onmouseover = function () {
                for (var j = 0; j < oDivs.length; j++) {
                    oLis[j].className = "";
                    oDivs[j].style.display = "none";
                }
                var oat = utils.children(this, "a");
                for (var k = 0; k < oat.length; k++) {
                    oat[k].className = "selecta" + i % 6
                }
                oLis[i].className = "selectli";
                oDivs[i].style.display = "block"
            };
            oLis[i].onmouseout = function () {
                var oat = utils.children(this, "a");
                for (var k = 0; k < oat.length; k++) {
                    oat[k].className = ""
                }
                for (var j = 0; j < oDivs.length; j++) {
                    oLis[j].className = "";
                    oDivs[j].style.display = "none";
                }
            };
            oDivs[i].onmouseenter = function () {
                var oat = utils.children(oLis[i], "a");
                for (var k = 0; k < oat.length; k++) {
                    oat[k].className = "selecta" + i % 6
                }
                this.style.display = "block";
                oLis[i].className = "selectli";
            };
            oDivs[i].onmouseleave = function () {
                for (var j = 0; j < oDivs.length; j++) {
                    oLis[j].className = "";
                    oDivs[j].style.display = "none"
                }
                var oat = utils.children(oLis[i], "a");
                for (var k = 0; k < oat.length; k++) {
                    oat[k].className = ""
                }
            }
        })(i)
    }

    var bigDiv2 = document.getElementById("header031");
    bigDiv2.onmouseover = function (e) {
        e = e || window.event;
        var tar = e.target || e.srcElement;
        var tarpar = tar.parentNode;
        if (tar.tagName.toUpperCase() == "A" && tarpar.className == "right_or") {
            for (var q = 0; q < oDivs.length; q++) {
                if (tar.parentNode.parentNode.parentNode.parentNode == oDivs[q]) {
                    tar.wang = q;
                    tar.onmouseenter = function () {
                        this.className = "selecta" + (this.wang) % 6;
                    };
                    tar.onmouseleave = function () {
                        if (/飞机票|长裤|帽子|运动鞋|书籍/.test(this.innerHTML)) {
                            return
                        }
                        this.className = ""
                    }
                }
            }
        }
    };

    for (var s = 0; s < oDivs.length; s++) {
        var oas = oDivs[s].getElementsByTagName("a");
        for (var u = 0; u < oas.length; u++) {
            if (/飞机票|长裤|帽子|运动鞋|书籍/.test(oas[u].innerHTML)) {
                oas[u].className = "selecta" + s % 6
            }
        }
    }
}

//登录区
getIn();
function getIn() {
    var getInfo = document.getElementById("getin");
    getInfo.onmouseover = function () {
        if (/MSIE (6|7|8)/i.test(navigator.userAgent)) {
            this.style.backgroundColor = "#000000"
        } else {
            this.style.backgroundColor = "rgba(0,0,0,0.7)"
        }
    };
    getInfo.onmouseout = function () {
        if (/MSIE (6|7|8)/i.test(navigator.userAgent)) {
            this.style.backgroundColor = "#000000"
        } else {
            this.style.backgroundColor = "rgba(0,0,0,0.5)"
        }
    }
}

//热门品牌
hotBrand();
function hotBrand() {
    var hotUl = document.getElementById("hotBrand");
    var oLis = hotUl.getElementsByTagName("li");
    var ary = utils.listToAry(oLis);
    var aLi = ary.pop();
    var Img = aLi.getElementsByTagName("img")[0];
    aLi.onmouseenter = function () {
        this.style.backgroundColor = "#C40000";
        this.style.color = "#ffffff";
        Img.className = "changeimgt"
    };
    aLi.onmouseleave = function () {
        this.style.backgroundColor = "";
        this.style.color = "";
        Img.className = "changeimg"
    };
    for (var i = 0; i < ary.length; i++) {
        (function (i) {
            ary[i].onmouseenter = function () {
                var oDiv = utils.lastChild(this);
                oDiv.style.display = "block";
                myAnimate(oDiv, {"opacity": 1}, 200)
            };
            ary[i].onmouseleave = function () {
                var oDiv = utils.lastChild(this);
                myAnimate(oDiv, {"opacity": 0}, 200, function () {
                    oDiv.style.display = "none";
                })
            }
        })(i)
    }

}

//onscroll事件
topSearch();
function topSearch() {
    var floor = document.getElementById("floor");
    var as = floor.getElementsByTagName("a");
    var lists = utils.getByClass("list");
    var ary = utils.listToAry(as);
    var offAry = [];
    for (var i = 0; i < ary.length; i++) {
        offAry.push(utils.offset(lists[i]).t - 200)
    }
    var box = document.getElementById("topfindbg");
    var curH = utils.getWin("clientHeight");
    var Ban = document.getElementById("rightban");
    var topLast = utils.lastChild(Ban);
    var floor = document.getElementById("floor");
    var oBox = document.getElementById("pullber");
    window.onscroll = function () {
        /*----------*/
        var curT = utils.getWin("scrollTop");
        for (var i = 0; i < offAry.length; i++) {
            ary[i].className = "";
            if ((offAry[i] < curT) && (curT < offAry[i + 1])) {
                ary[i].className = "color" + i
            }
            if (curT > offAry[offAry.length - 1]) {
                ary[ary.length - 1].className = "color" + (ary.length - 1)
            }
        }
        /*-----pullber-----*/
        var winH = utils.getWin("clientHeight");
        var oBoxH = utils.offset(oBox).t + oBox.offsetHeight;
        if ((curT + winH) > oBoxH + 150) {
            if (oBox.offsetHeight < 1000) {
                pullber();
            }
        }
        /*----------*/
        if (curT > curH) {
            box.style.top = "0";
            topLast.style.display = "block";
            if (floor.offsetWidth <= 0) {
                myAnimate(floor, {"width": 35, "height": 361, "bottom": 40, "left": 2}, 200)
            }
        } else {
            box.style.top = "-50px";
            topLast.style.display = "none";
            if (floor.offsetWidth >= 35) {
                myAnimate(floor, {"width": 0, "height": 0, "bottom": 0, "left": 0}, 200)
            }
        }
    }
}

//右边导航栏
rightBan();
function rightBan() {
    var Ban = document.getElementById("rightban");
    var as = Ban.getElementsByTagName("a");
    var ary = utils.listToAry(as);
    ary.splice(ary.length - 2, 1);
    ary.splice(1, 1);
    for (var i = 0; i < ary.length; i++) {
        (function (i) {
            ary[i].onmouseover = function () {
                var aDiv = utils.firstChild(this);
                aDiv.style.display = "block";
                myAnimate(aDiv, {"opacity": 1, "right": "35"}, 200)
            }
            ary[i].onmouseout = function () {
                var aDiv = utils.firstChild(this);
                myAnimate(aDiv, {"opacity": 0, "right": "70"}, 200, function () {
                    aDiv.style.display = "none";
                })
            }
        })(i)
    }
}

//回到顶部
goTop("miaotop", 0);
function goTop(id, pointer, tar) {
    var Ban = tar || document.getElementById(id);
    Ban.onclick = function () {
        var begin = utils.getWin("scrollTop");
        var change = pointer - begin;
        var interval = 15;
        var duration = 600;
        var times = 0;
        var that = this;
        clearInterval(that.timer);
        this.timer = setInterval(function () {
            if (times >= duration) {
                utils.getWin("scrollTop", pointer);
                clearInterval(that.timer);
                return
            }
            times += interval;
            var curPos = times / duration * change + begin
            utils.getWin("scrollTop", curPos);
        }, interval)
    }

}

//楼层导航
goFloor();
function goFloor() {
    var floor = document.getElementById("floor");
    var floorP = document.getElementById("floorp");
    goTop("floorp", 0);
    var as = floor.getElementsByTagName("a");
    var ary = utils.listToAry(as);
    for (var i = 0; i < ary.length; i++) {
        (function (i) {
            ary[i].onmouseover = function () {
                this.className = "color" + i
            }
            ary[i].onmouseout = function () {
                this.className = ""
            }
        })(i)
    }
    floor.onmouseover = function (e) {
        e = e || window.event;
        var tar = e.target || e.srcElement;


        var nameAry = ["热门品牌", "潮电酷玩", "亲子时光", "户外出行", "品牌旗舰", "猜你喜欢"];
        var offAry = [];
        var lists = utils.getByClass("list");
        for (var i = 0; i < lists.length; i++) {
            offAry.push(utils.offset(lists[i]).t - 50);
        }
        for (var j = 0; j < lists.length; j++) {
            if (tar.tagName == "A" && tar.innerHTML == nameAry[j]) {
                if (!tar.onclick) {
                    goTop("floorp", offAry[j], tar);
                }
                break;
            }
        }
    }
}

//瀑布流
function pullber() {
    var oBox = document.getElementById("pullber");
    var str = '';
    for (var i = 0; i < 5; i++) {
        str += '<li>';
        str += '<a href="javascript:;">';
        str += '<img src="image/pullber0' + Math.round(Math.random() * (5 - 1) + 1) + '.jpg" alt="" />';
        str += '<p>[热销]蔓斯菲尔电脑桌台式 简易笔记本电脑桌简约书桌环保家用写字台</p>';
        str += '<span>￥ ' + Math.round(Math.random() * (60 - 30) + 30) + '.0</span>';
        str += ' </a>';
        str += '</li>';
    }
    oBox.innerHTML += str;
}