define(["indicator_base","highstock"],function(a){var b={},c={};return{init:function(){!function(a,d,e){function f(a,d){var f=this,g=f.chart,h=f.options.data;for(var i in c)if(c[i]&&c[i].options&&c[i].options.data&&c[i].options.data.length>0&&b[i].parentSeriesID==f.options.id&&c[i].chart===g){var j=(c[i].options.data,b[i]),k=e.findIndexInDataForTime(h,a);if(k>=1){var l={data:h,index:k,period:j.period,type:this.options.type,appliedTo:j.appliedTo,isIndicatorData:!1},m=e.calculateWMAValue(l);d?c[i].data[k].update({y:e.toFixed(m,4)}):c[i].addPoint([h[k].x||h[k][0],e.toFixed(m,4)],!0,!0,!1)}}}a&&!a.Series.prototype.addWMA&&(a.Series.prototype.addWMA=function(a){var f=this.options.id;a=d.extend({period:21,stroke:"red",strokeWidth:2,dashStyle:"line",levels:[],appliedTo:e.CLOSE,parentSeriesID:f},a);var g="_"+(new Date).getTime(),h=this.options.data||[];if(!(a.period>=h.length)){if(h&&h.length>0){for(var i=[],j=0;j<h.length;j++){var k={data:h,index:j,period:a.period,type:this.options.type,appliedTo:a.appliedTo,isIndicatorData:!1},l=e.calculateWMAValue(k);i.push([h[j].x||h[j][0],e.toFixed(l,4)])}var m=this.chart;b[g]=a;var n=this;c[g]=m.addSeries({id:g,name:"WMA ("+a.period+", "+e.appliedPriceString(a.appliedTo)+")",data:i,type:"line",dataGrouping:n.options.dataGrouping,opposite:n.options.opposite,color:a.stroke,lineWidth:a.strokeWidth,dashStyle:a.dashStyle,compare:n.options.compare},!1,!1),d(c[g]).data({onChartIndicator:!0,indicatorID:"wma",isIndicator:!0,parentSeriesID:a.parentSeriesID,period:a.period}),m.redraw()}return g}},a.Series.prototype.removeWMA=function(a){var d=this.chart;b[a]=null,d.get(a).remove(),c[a]=null},a.Series.prototype.preRemovalCheckWMA=function(a){return{isMainIndicator:!0,period:b[a]?b[a].period:void 0,appliedTo:b[a]?b[a].appliedTo:void 0,isValidUniqueID:null!=b[a]}},a.wrap(a.Series.prototype,"addPoint",function(a,c,d,g,h){a.call(this,c,d,g,h),e.checkCurrentSeriesHasIndicator(b,this.options.id)&&f.call(this,c[0])}),a.wrap(a.Point.prototype,"update",function(a,c,d,g){a.call(this,c,d,g),e.checkCurrentSeriesHasIndicator(b,this.series.options.id)&&f.call(this.series,this.x,!0)}))}(Highcharts,jQuery,a)}}});