var utils = (function () {
    var flag = 'getComputedStyle' in window;

    //类数组转数组
    function listToAry(likeAry) {
        try {
            return Array.prototype.slice.call(likeAry, 0)
        } catch (e) {
            var ary = [];
            for (var i = 0; i < likeAry.length; i++) {
                ary[i] = likeAry[i];
            }
            return ary
        }
    }

    //JSON格式的字符串转JSON格式数据
    function toJson(str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")")
    }

    //获取和设置浏览器盒子模型；
    function getWin(attr, value) {
        if (typeof value == "undefined") {
            return document.documentElement[attr] || document.body[attr]
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    }

    //当前元素距离body的偏移量
    function offset(ele) {
        var l = ele.offsetLeft;
        var t = ele.offsetTop;
        var par = ele.offsetParent;
        while (par) {
            if (navigator.userAgent.indexOf("MSIE 8.0") == -1) {
                l += par.clientLeft;
                t += par.clientTop
            }
            l += par.offsetLeft;
            t += par.offsetTop;
            par = par.offsetParent;
        }
        return {l: l, t: t};
    }

    //getByClass:在一定范围内通过className获取元素
    function getByClass(strClass, curEle) {
        curEle = curEle || document;
        if (flag) {//高级
            return this.listToAry(curEle.getElementsByClassName(strClass));
        }
        var ary = [];
        var aryClass = strClass.replace(/(^\s+)|(\s+$)/g, '').split(/\s+/g);
        var nodeList = curEle.getElementsByTagName('*');//拿到当前元素下所有元素
        for (var i = 0; i < nodeList.length; i++) {//循环：目的是为了匹配每个元素的className是否符合要求，匹配要求：是这个元素上的className符合aryclass中的每一个className字符串
            var curNode = nodeList[i];
            var bOk = true;//假设法：假设都符合
            for (var k = 0; k < aryClass.length; k++) {
                var curClass = aryClass[k];
                //var reg=new RegExp('(\\b)'+curClass+'(\\b)');
                var reg = new RegExp('(^| +)' + curClass + '( +|$)');
                if (!reg.test(curNode.className)) {
                    bOk = false;
                }
            }
            if (bOk) {
                ary.push(curNode)
            }
        }
        return ary;
    }

    //hasClass:判断当前元素上是否有这个strClass（class名）
    function hasClass(curEle, strClass) {
        var reg = new RegExp('(\\b)' + strClass + '(\\b)');
        return reg.test(curEle.className)
    }

    //addClass:添加一堆class名
    function addClass(curEle, strClass) {
        var aryClass = strClass.replace(/(^\s+)|(\s+$)/g, '').split(/\s+/g);
        for (var i = 0; i < aryClass.length; i++) {
            var curClass = aryClass[i];
            if (!this.hasClass(curEle, curClass)) {
                curEle.className += ' ' + curClass;
            }
        }
    }

    //removeClass:移除掉当前元素上的class名
    function removeClass(curEle, strClass) {
        var aryClass = strClass.replace(/(^\s+)|(\s+$)/g, '').split(/\s+/g);
        for (var i = 0; i < aryClass.length; i++) {
            var curClass = aryClass[i];
            if (this.hasClass(curEle, curClass)) {
                var reg = new RegExp('(^| +)' + curClass + '( +|$)');
                curEle.className = curEle.className.replace(reg, ' ')
            }
        }
    }

    //获取非行间样式
    function getCss(ele, attr) {
        var res = null, reg = null;
        if ("getComputedStyle" in window) {
            res = window.getComputedStyle(ele, null)[attr];
        } else {
            if (attr == "opacity") {
                var str = ele.currentStyle["filter"];
                var reg = /alpha\(opacity\s*=\s*(\d+(?:\.\d+)?)\)/;
                res = reg.test(str) ? RegExp.$1 / 100 : 1;
            } else {
                res = ele.currentStyle[attr];
            }
        }
        reg = /^[+-]?(\d|[1-9]\d+)(\.\d+)?(px|pt|em|rem)?$/;
        return reg.test(res) ? parseFloat(res) : res;
    }

    //setCss:设置行间样式
    function setCss(curEle, attr, value) {
        //float
        if (attr == 'float') {
            curEle.style["float"] = value;
            curEle.style["cssFloat"] = value;//火狐
            curEle.style["styleFloat"] = value;//ie
            return;
        }
        //透明度的处理
        if (attr === 'opacity') {
            curEle.style.opacity = value;
            curEle.style.filter = 'alpha(opacity=' + value * 100 + ')';
            return;
        }
        //加单位的处理；
        var reg = /(width|height|top|right|bottom|left|fontSize((margin|padding)(top|right|bottom|left)?))/i;
        var reg2 = /[+-]?(\d|[1-9]\d+)(\.\d+)?$/;
        if (reg.test(attr) && reg2.test(value)) {  //是这些属性，并且没写单位
            value += 'px';
        }
        curEle.style[attr] = value;
    }

    //setGroupCss:设置一组样式
    function setGroupCss(curEle, options) {
        if (options.toString() !== '[object Object]') {
            return;
        }
        for (var attr in options) {
            this.setCss(curEle, attr, options[attr])
        }
    }

    //css:获取和设置样式
    function css(curEle) {
        var argTwo = arguments[1];
        if (typeof argTwo === 'string') {
            if (typeof arguments[2] !== 'undefined') {// 单个设置
                this.setCss(curEle, argTwo, arguments[2]);
                return;
            } else {//获取
                return this.getCss(curEle, argTwo)
            }
        }
        argTwo = argTwo || 0;
        if (argTwo.toString() === '[object Object]') {//设置一组样式
            this.setGroupCss(curEle, argTwo)
        }
    }

    //获取上一个哥哥元素
    function prev(ele) {
        if (ele.previousElementSibling) {
            return ele.previousElementSibling
        }
        var prev = ele.previousSibling;
        while (prev && prev.nodeType !== 1) {
            prev = prev.previousSibling
        }
        return prev
    }

    //prevAll:获取所有的哥哥元素节点
    function prevAll(curEle) {
        var pre = this.prev(curEle);
        var ary = [];
        while (pre) {
            ary.unshift(pre);
            pre = this.prev(pre);
        }
        return ary;
    }

    //next:下一个弟弟元素节点
    function next(curEle) {
        if (flag) {
            return curEle.nextElementSibling;
        }
        var nex = curEle.nextSibling;
        while (nex && nex.nodeType !== 1) {
            nex = nex.nextSibling;
        }
        return nex;
    }

    //nextAll:所有的弟弟元素节点
    function nextAll(curEle) {
        var nex = this.next(curEle);
        var ary = [];
        while (nex) {
            ary.push(nex);
            nex = this.next(nex);
        }
        return ary;
    }

    //sibling:相邻元素节点
    function sibling(curEle) {
        var pre = this.prev(curEle);
        var nex = this.next(curEle);
        var ary = [];
        if (pre) ary.push(pre);
        if (nex) ary.push(nex);
        return ary;
    }

    //siblings:兄弟元素节点
    function siblings(curEle) {
        return this.prevAll(curEle).concat(this.nextAll(curEle))
    }

    //children:获取当前元素的所有子节点
    function children(curEle, tagName) {
        var ary = [];
        if (flag) {
            ary = this.listToAry(curEle.children);
        } else {
            var chs = curEle.childNodes;
            for (var i = 0; i < chs.length; i++) {
                var curNode = chs[i];
                if (curNode.nodeType == 1) {
                    ary.push(curNode)
                }
            }
        }
        if (typeof tagName == 'string') {
            for (var i = 0; i < ary.length; i++) {
                if (ary[i].nodeName.toLowerCase() !== tagName.toLowerCase()) {
                    ary.splice(i, 1);
                    i--;
                }
            }
        }
        return ary;
    }

    //firstChild:第一个子元素
    function firstChild(curEle) {
        var chs = this.children(curEle);
        return chs.length ? chs[0] : null;
    }

    //lastChild:最后一个子元素
    function lastChild(curEle) {
        var chs = this.children(curEle);
        return chs.length ? chs[chs.length - 1] : null;
    }

    //index:求当前元素的索引；
    function index(curEle) {
        return this.prevAll(curEle).length;
    }

    //appendChild:把元素插入到容器的末尾
    function appendChild(context, curEle) {
        context.appendChild(curEle);
    }

    //prepend:把元素插入到容器的最开头
    function prepend(context, curEle) {
        var fir = this.firstChild(context);
        if (fir) {
            context.insertBefore(curEle, fir);
        } else {
            context.appendChild(curEle);
        }
    }

    //insertBefore:把某个元素插入到指定元素的前面
    function insertBefore(curEle, oldEle) {
        oldEle.parentNode.insertBefore(curEle, oldEle);
    }

    //insertAfter:把某个元素插入到指定元素的后面
    function insertAfter(curEle, oldEle) {
        var nex = this.next(oldEle);
        if (nex) {
            oldEle.parentNode.insertBefore(curEle, nex);
        } else {
            oldEle.parentNode.appendChild(curEle);
        }

    }

    return {
        //转换
        listToAry: listToAry,
        toJson: toJson,
        //盒子模型属性
        getWin: getWin,
        offset: offset,
        //Class名
        getByClass: getByClass,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        //CSS样式
        getCss: getCss,
        setCss: setCss,
        setGroupCss: setGroupCss,
        css: css,
        //获取元素节点
        prev: prev,
        prevAll: prevAll,
        next: next,
        nextAll: nextAll,
        sibling: sibling,
        siblings: siblings,
        children: children,
        firstChild: firstChild,
        lastChild: lastChild,
        index: index,
        //DOM插入
        appendChild: appendChild,
        prepend: prepend,
        insertBefore: insertBefore,
        insertAfter: insertAfter
    }
})();

~function(pro){
    //数组/类数组循环（无返回值）
    function myForEach() {
        var callBack = arguments[0], context = arguments[1] || window;
        if (typeof callBack !== "function") {
            return
        }
        if ("forEach" in Array.prototype) {
            Array.prototype.forEach.call(this, callBack, context);
            return
        }
        for (var i = 0; i < this.length; i++) {
            callBack.call(context, this[i], i, this)
        }
    }
//数组/类数组循环（有返回值）
    function myMap() {
        var callBack = arguments[0], context = arguments[1] || window;
        if (typeof callBack !== "function") {
            return
        }
        if ("map" in Array.prototype) {
            return Array.prototype.map.call(this, callBack, context);
        }
        var that = utils.listToAry(this);
        for (var i = 0; i < that.length; i++) {
            that[i] = callBack.call(context, that[i], i, that)
        }
        return that
    }
    pro.myForEach=myForEach;
    pro.myMap=myMap;
}(Array.prototype);


