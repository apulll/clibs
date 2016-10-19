(function(name,root,factory) {
  if(typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([],factory)
  }else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
   // only CommonJS-like environments that support module.exports,
   // like Node.
    module.exports = factory();
  } else {
    //Browser globals (root is window)
    root[name] = factory()
  }
}('clibs',this,function() {
    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return {
      /*
      *函数节流的出发点，就是让一个函数不要执行得太频繁，减少一些过快的调用来节流
      */
      throttle: function(method,context,delay) {
          clearTimeout(method.tId);
          method.tId = setTimeout(function() {
            method.call(context);
          }, delay)
      },
      throttle2:function(fn,delay) {
        var timer = null;
        return function() {
          var context = this,args = arguments;
          clearTimeout(timer);
          timer = setTimeout(function() {
            fn.apply(context,args);
          },delay);
        };
      },
      throttle3:function(fn, delay, mustRunDelay) {
        var timer = null;
        var t_start;
        return function () {
          var context = this, args = arguments, t_curr = +new Date();
          clearTimeout(timer);
          if(!t_start) {
            t_start = t_curr;
          }
          if(t_curr - t_start >= mustRunDelay) {
            fn.apply(context, args);
            t_start = t_curr;
          }
          else {
            timer = setTimeout(function() {
              fn.apply(context, args);
            },delay);
          }
        }
      }
    }
}))
