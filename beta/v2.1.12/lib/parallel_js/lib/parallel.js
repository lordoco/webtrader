!function(){function a(a,b){b||(b={});for(var c in a)void 0===b[c]&&(b[c]=a[c]);return b}function b(){this._callbacks=[],this._errCallbacks=[],this._resolved=0,this._result=null}function c(c,d){this.data=c,this.options=a(j,d),this.operation=new b,this.operation.resolve(null,this.data),this.requiredScripts=[],this.requiredFunctions=[]}var d="undefined"!=typeof module&&module.exports,e=!("undefined"!=typeof window&&this===window),f=f||function(a){setTimeout(a,0)},g=e?require(__dirname+"/Worker.js"):self.Worker,h="undefined"!=typeof self?self.URL?self.URL:self.webkitURL:null,i=e||self.Worker?!0:!1;b.prototype.resolve=function(a,b){if(a){this._resolved=2,this._result=a;for(var c=0;c<this._errCallbacks.length;++c)this._errCallbacks[c](a)}else{this._resolved=1,this._result=b;for(var d=0;d<this._callbacks.length;++d)this._callbacks[d](b)}this._callbacks=[],this._errCallbacks=[]},b.prototype.then=function(a,b){return 1===this._resolved?void(a&&a(this._result)):2===this._resolved?void(b&&b(this._result)):(a&&(this._callbacks[this._callbacks.length]=a),b&&(this._errCallbacks[this._errCallbacks.length]=b),this)};var j={evalPath:e?__dirname+"/eval.js":null,maxWorkers:e?require("os").cpus().length:navigator.hardwareConcurrency||4,synchronous:!0,env:{},envNamespace:"env"};c.isSupported=function(){return i},c.prototype.getWorkerSource=function(a,b){var c="",d=0;for(e||0===this.requiredScripts.length||(c+='importScripts("'+this.requiredScripts.join('","')+'");\r\n'),d=0;d<this.requiredFunctions.length;++d)c+=this.requiredFunctions[d].name?"var "+this.requiredFunctions[d].name+" = "+this.requiredFunctions[d].fn.toString()+";":this.requiredFunctions[d].fn.toString();b=JSON.stringify(b||{});var f=this.options.envNamespace;return e?c+'process.on("message", function(e) {global.'+f+" = "+b+";process.send(JSON.stringify(("+a.toString()+")(JSON.parse(e).data)))})":c+"self.onmessage = function(e) {var global = {}; global."+f+" = "+b+";self.postMessage(("+a.toString()+")(e.data))}"},c.prototype.require=function(){for(var a,b=Array.prototype.slice.call(arguments,0),c=0;c<b.length;c++)a=b[c],"string"==typeof a?this.requiredScripts.push(a):"function"==typeof a?this.requiredFunctions.push({fn:a}):"object"==typeof a&&this.requiredFunctions.push(a);return this},c.prototype._spawnWorker=function(a,b){var c,d=this.getWorkerSource(a,b);if(e)c=new g(this.options.evalPath),c.postMessage(d);else{if(void 0===g)return void 0;try{if(0!==this.requiredScripts.length){if(null===this.options.evalPath)throw new Error("Can't use required scripts without eval.js!");c=new g(this.options.evalPath),c.postMessage(d)}else{if(!h)throw new Error("Can't create a blob URL in this browser!");var f=new Blob([d],{type:"text/javascript"}),i=h.createObjectURL(f);c=new g(i)}}catch(j){if(null===this.options.evalPath)throw j;c=new g(this.options.evalPath),c.postMessage(d)}}return c},c.prototype.spawn=function(c,d){var e=this,g=new b;return d=a(this.options.env,d||{}),this.operation.then(function(){var a=e._spawnWorker(c,d);if(void 0!==a)a.onmessage=function(b){a.terminate(),e.data=b.data,g.resolve(null,e.data)},a.onerror=function(b){a.terminate(),g.resolve(b,null)},a.postMessage(e.data);else{if(!e.options.synchronous)throw new Error("Workers do not exist and synchronous operation not allowed!");f(function(){try{e.data=c(e.data),g.resolve(null,e.data)}catch(a){g.resolve(a,null)}})}}),this.operation=g,this},c.prototype._spawnMapWorker=function(a,b,c,d,e){var g=this;if(e||(e=g._spawnWorker(b,d)),void 0!==e)e.onmessage=function(b){g.data[a]=b.data,c(null,e)},e.onerror=function(a){e.terminate(),c(a)},e.postMessage(g.data[a]);else{if(!g.options.synchronous)throw new Error("Workers do not exist and synchronous operation not allowed!");f(function(){g.data[a]=b(g.data[a]),c()})}},c.prototype.map=function(c,d){function e(a,b){a?i.resolve(a,null):++h===f.data.length?(i.resolve(null,f.data),b&&b.terminate()):g<f.data.length?f._spawnMapWorker(g++,c,e,d,b):b&&b.terminate()}if(d=a(this.options.env,d||{}),!this.data.length)return this.spawn(c,d);var f=this,g=0,h=0,i=new b;return this.operation.then(function(){for(;g-h<f.options.maxWorkers&&g<f.data.length;++g)f._spawnMapWorker(g,c,e,d)},function(a){i.resolve(a,null)}),this.operation=i,this},c.prototype._spawnReduceWorker=function(a,b,c,d,e){var g=this;if(e||(e=g._spawnWorker(b,d)),void 0!==e)e.onmessage=function(a){g.data[g.data.length]=a.data,c(null,e)},e.onerror=function(a){e.terminate(),c(a,null)},e.postMessage(a);else{if(!g.options.synchronous)throw new Error("Workers do not exist and synchronous operation not allowed!");f(function(){g.data[g.data.length]=b(a),c()})}},c.prototype.reduce=function(c,d){function e(a,b){--f,a?h.resolve(a,null):1===g.data.length&&0===f?(g.data=g.data[0],h.resolve(null,g.data),b&&b.terminate()):g.data.length>1?(++f,g._spawnReduceWorker([g.data[0],g.data[1]],c,e,d,b),g.data.splice(0,2)):b&&b.terminate()}if(d=a(this.options.env,d||{}),!this.data.length)throw new Error("Can't reduce non-array data");var f=0,g=this,h=new b;return this.operation.then(function(){if(1===g.data.length)h.resolve(null,g.data[0]);else{for(var a=0;a<g.options.maxWorkers&&a<Math.floor(g.data.length/2);++a)++f,g._spawnReduceWorker([g.data[2*a],g.data[2*a+1]],c,e,d);g.data.splice(0,2*a)}}),this.operation=h,this},c.prototype.then=function(a,c){var d=this,e=new b;return c="function"==typeof c?c:function(){},this.operation.then(function(){var b;try{a&&(b=a(d.data),void 0!==b&&(d.data=b)),e.resolve(null,d.data)}catch(f){c?(b=c(f),void 0!==b&&(d.data=b),e.resolve(null,d.data)):e.resolve(null,f)}},function(a){if(c){var b=c(a);void 0!==b&&(d.data=b),e.resolve(null,d.data)}else e.resolve(null,a)}),this.operation=e,this},d?module.exports=c:self.Parallel=c}();