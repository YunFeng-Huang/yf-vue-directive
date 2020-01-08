function getTop(obj) {
  var h = 0;
  while (obj) {
    h += obj.offsetTop;
    obj = obj.offsetParent;
  }
  return h;
}
function addListener(el, { value }) {
  el.$value = value;
  function lazyload() {
    let seeHeight = document.documentElement.clientHeight; //可见区域高度
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动条距离顶部高度
    if (getTop(el) < seeHeight + scrollTop) {
      el.$value != undefined && (el.src = el.$value)
    }
  }
  function throttle(fun, delay, time) {
    var timeout,
      startTime = new Date();
    return function () {
      var context = this,
        args = arguments,
        curTime = new Date();
      clearTimeout(timeout);
      // 如果达到了规定的触发时间间隔，触发 handler
      if (curTime - startTime >= time) {
        fun.apply(context, args);
        startTime = curTime;
        // 没达到触发间隔，重新设定定时器
      } else {
        timeout = setTimeout(function () {
          fun.apply(context, args);
        }, delay);
      }
    };
  };
  lazyload()
  window.removeEventListener('scroll', throttle(lazyload, 500, 1000));
  window.addEventListener('scroll', throttle(lazyload, 500, 1000));
}
const vlazyload = {
  /*
    bind 钩子函数，第一次绑定时调用，可以在这里做初始化设置
    el: 作用的 dom 对象
    value: 传给指令的值
  */
  bind(el) {
    el.src = "https://kouhigh.kouhigh.top/upload/app/2019_11_29/ab353201911291219348282.gif";
  },
  inserted(el, binding) {
    addListener(el, binding)
  },
  componentUpdated(el, { value }) {
    el.$value = value;
  },
};

export default vlazyload;