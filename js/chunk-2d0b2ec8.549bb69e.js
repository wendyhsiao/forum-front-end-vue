(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b2ec8"],{"25d3":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container py-5"},[t.isLoading?n("Spinner"):[n("div",[n("h1",[t._v(t._s(t.restaurant.name))]),n("span",{staticClass:"badge badge-secondary mt-1 mb-3"},[t._v(" "+t._s(t.restaurant.categoryName)+" ")])]),n("hr"),n("ul",[n("li",[t._v("評論數： "+t._s(t.restaurant.commentsLength))]),n("li",[t._v("瀏覽次數： "+t._s(t.restaurant.viewCounts))])]),n("button",{staticClass:"btn btn-link",attrs:{type:"button"},on:{click:function(e){return t.$router.back()}}},[t._v(" 回上一頁 ")])]],2)},r=[],s=(n("b0c0"),n("5530")),c=(n("96cf"),n("1da1")),i=n("c4c3"),o=n("2fa3"),u=n("2375"),d={components:{Spinner:u["a"]},data:function(){return{restaurant:{id:-1,name:"",categoryName:"",commentsLength:0,viewCounts:0},isLoading:!0}},created:function(){var t=this.$route.params.id;this.fetchRestaurant(t)},beforeRouteUpdate:function(t,e,n){this.fetchRestaurant(t.params.id),n()},methods:{fetchRestaurant:function(t){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function n(){var a,r,c,u,d,m,l,h;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,i["a"].getRestaurant({restaurantId:t});case 3:a=n.sent,r=a.data,c=r.restaurant,u=c.id,d=c.name,m=c.Category,l=c.Comments,h=c.viewCounts,e.restaurant=Object(s["a"])(Object(s["a"])({},e.restaurant),{},{id:u,name:d,categoryName:m?m.name:"未分類",commentsLength:l.length,viewCounts:h}),e.isLoading=!1,n.next=15;break;case 10:n.prev=10,n.t0=n["catch"](0),e.isLoading=!1,o["a"].fire({icon:"error",title:"無法取得餐廳資料，請稍後再試"}),console.log("error",n.t0);case 15:case"end":return n.stop()}}),n,null,[[0,10]])})))()}}},m=d,l=n("2877"),h=Object(l["a"])(m,a,r,!1,null,null,null);e["default"]=h.exports}}]);
//# sourceMappingURL=chunk-2d0b2ec8.549bb69e.js.map