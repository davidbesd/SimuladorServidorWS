(function(e){function t(t){for(var o,i,r=t[0],c=t[1],l=t[2],d=0,m=[];d<r.length;d++)i=r[d],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&m.push(n[i][0]),n[i]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);u&&u(t);while(m.length)m.shift()();return s.push.apply(s,l||[]),a()}function a(){for(var e,t=0;t<s.length;t++){for(var a=s[t],o=!0,r=1;r<a.length;r++){var c=a[r];0!==n[c]&&(o=!1)}o&&(s.splice(t--,1),e=i(i.s=a[0]))}return e}var o={},n={app:0},s=[];function i(t){if(o[t])return o[t].exports;var a=o[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=o,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(a,o,function(t){return e[t]}.bind(null,o));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/SimuladorServidorWS/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=t,r=r.slice();for(var l=0;l<r.length;l++)t(r[l]);var u=c;s.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"034f":function(e,t,a){"use strict";a("85ec")},"100f":function(e,t,a){"use strict";a("c35a")},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var o=a("2b0e"),n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"align-center justify-center fill-height VentanaApp",attrs:{id:"app"}},[a("meta",{attrs:{charset:"utf-8"}}),a("router-view")],1)},s=[],i=(a("034f"),a("2877")),r={},c=Object(i["a"])(r,n,s,!1,null,null,null),l=c.exports,u=a("9483");Object(u["a"])("".concat("/SimuladorServidorWS/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var d=a("8c4f"),m=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Simulador")],1)},b=[],v=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container-fluid"},[e._m(0),a("div",{staticClass:"row align-items-start"},[a("div",{staticClass:"Elemento"},[a("b-form",{attrs:{inline:""}},[a("p",{staticClass:"mr-sm-2 mb-sm-0 font-weight-bold"},[e._v("Servidor arrancado en:")]),a("label",{staticClass:"mr-sm-2 mb-sm-0"},[e._v("IP")]),a("b-form-input",{staticClass:"mr-sm-2 mb-sm-0 font-weight-bold",model:{value:e.IPServidor,callback:function(t){e.IPServidor=t},expression:"IPServidor"}}),a("label",{staticClass:"mr-sm-2 mb-sm-0"},[e._v("Puerto")]),a("b-form-input",{staticClass:"mr-sm-2 mb-sm-0 font-weight-bold",model:{value:e.Puerto,callback:function(t){e.Puerto=t},expression:"Puerto"}}),a("div",{staticClass:"row align-items-center"},[e.WebSocketConectado?a("button",{staticClass:"btn-lg  badge-pill TestigoWebSocket Conectado"},[e._v("CONECTADO")]):e._e(),e.WebSocketConectado?e._e():a("button",{staticClass:"btn-lg  badge-pill TestigoWebSocket Conectar",on:{click:e.ReconectarWS}},[e._v("CONECTAR")])])],1)],1)]),e._m(1),a("div",{staticClass:"row"},[a("b-form-group",{staticClass:"Opciones"},[a("b-form-radio-group",{attrs:{options:e.ArrayTiposMensaje,"button-variant":"outline-primary",size:"md",buttons:""},on:{change:e.ValidarTipoMensaje},model:{value:e.SeleccionTipoMensaje,callback:function(t){e.SeleccionTipoMensaje=t},expression:"SeleccionTipoMensaje"}})],1)],1),a("div",{staticClass:"row"},[a("div",{staticClass:"ListadoZonas d-flex justify-content-start"},[a("b-form-group",{staticClass:"justify-content-end"},[e.MostrarZonasNavegador?a("b-form-checkbox-group",{attrs:{options:e.ArrayZonasNavegador,switches:"",size:"md",stacked:"",buttons:"","button-variant":"outline-primary"},on:{change:e.ValidarListaZonas},model:{value:e.SeleccionZona,callback:function(t){e.SeleccionZona=t},expression:"SeleccionZona"}}):e._e()],1)],1),a("div",{staticClass:"ListadoEstados d-flex justify-content-start"},[a("b-form-group",[e.MostrarZonasNavegador?a("b-form-radio-group",{attrs:{options:e.ArrayEstadosZonas,size:"md",stacked:"",buttons:"","button-variant":"outline-primary"},on:{change:e.ValidarListaEstados},model:{value:e.SeleccionEstado,callback:function(t){e.SeleccionEstado=t},expression:"SeleccionEstado"}}):e._e()],1)],1),a("div",[e.MostrarZonasNavegador?a("b-button",{staticClass:"BotonAceptarZonas font-weight-bold",attrs:{size:"sm",pill:"",variant:"primary",disabled:!e.ValidarMensajeNavegador()},on:{click:e.AceptarEstadosNavegador}},[e._v("ACEPTAR")]):e._e()],1)]),a("div",{staticClass:"row align-items-start mr-sm-2 mb-sm-0"},[a("div",{staticClass:"col-lg-8 d-flex justify-content-start"},[a("b-form-input",{staticClass:"Enviar mr-sm-2 mb-sm-0",attrs:{state:e.ValidarMensaje,placeholder:"Mensaje a enviar..."},model:{value:e.MensajeAEnviar,callback:function(t){e.MensajeAEnviar=t},expression:"MensajeAEnviar"}}),a("b-button",{staticClass:"font-weight-bold",attrs:{size:"sm",pill:"",variant:"primary",disabled:!e.ValidacionEnvio()},on:{click:e.EnviarMensaje}},[e._v("ENVIAR")])],1)]),e._m(2),a("div",{staticClass:"row align-items-start mr-sm-2 mb-sm-0"},[a("b-table",{staticClass:"text-left EstiloTabla TablaRx",attrs:{small:"",hover:"","sticky-header":"",items:e.ArrayMensajes}})],1),a("div",{staticClass:"row align-items-start mr-sm-2 mb-sm-0"},[a("b-button",{staticClass:"Elemento font-weight-bold",attrs:{size:"sm",pill:"",variant:"primary"},on:{click:e.BorrarMensajes}},[e._v("BORRAR MENSAJES")])],1)])},S=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"row align-items-start"},[a("h1",{staticClass:"Titulo font-weight-bold"},[e._v("Simulador Servidor WebSocket")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"row align-items-start"},[a("label",{staticClass:"Elemento font-weight-bold"},[e._v("Tipos de mensaje:")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"row align-items-start mr-sm-2 mb-sm-0"},[a("label",{staticClass:"Elemento mr-sm-2 mb-sm-0 font-weight-bold"},[e._v("Mensajes:")])])}],f=a("5530"),A=(a("d3b7"),a("159b"),a("2f62")),p={name:"Simulador",data:function(){return{IPServidor:"192.168.0.214",Puerto:"4444",TipoMensajeSeleccioa:"",SeleccionTipoMensaje:null,MostrarZonasNavegador:!1,EnvioPermitido:!1,MensajeAEnviar:"",SeleccionZona:[],SeleccionEstado:"",ArrayTiposMensaje:[{name:"LOG",text:"Registro Eventos",value:'{"Tipo":"LOG","Mensaje":"Mensaje de prueba para el componente que muestra el registro de eventos."}'},{name:"REARMABLES",text:"Fibras a Rearmar",value:'{"Tipo":"REARMABLES","Mensaje":{"NombreFibra":"nueva_FIBRA_4","Valor":"1"}}'},{name:"ESTADOS_PASO",text:"Estado Pasos",value:'{"Tipo":"PASO","Mensaje":{"ENCE":"1","GW":"1","ET":"101","IP_PASO":"10103","NOMBRE":"PS 80,7","OFF":"0","PREV":"1","MANT":"2", "ESTADO":"8"}}'},{name:"CABECERA_ENC",text:"Cabecera ENC",value:'{"Tipo":"GW","Mensaje":{"GW":"8","ET":"0","COM":"0","ALARMA":"15","PPAL":"0","ALT":"0","EST_PPAL":"0","EST_ALT":"0"}}'},{name:"NAV",text:"Zonas Navegador",value:"NAVEGADOR"}],ArrayZonasNavegador:[{name:"PLASENCIA",text:"Plasencia",value:"BTZ1"},{name:"CÁCERES",text:"Cáceres",value:"BTZ2"},{name:"MÉRIDA",text:"Mérida",value:"BTZ3"},{name:"GUADIANA",text:"Guadiana",value:"BTZ4"},{name:"BADAJOZ",text:"Badajoz",value:"BTZ5"}],ArrayEstadosZonas:[{text:"Sin conexión",value:"0",color:"#666666"},{text:"Normal",value:"1",color:"#lightgray"},{text:"Objeto",value:"2",color:"#FF0000"},{text:"Anomalia",value:"3",color:"#FFFF00"},{text:"Mantenimiento",value:"4",color:"#00CCFF"}]}},props:{},computed:Object(f["a"])(Object(f["a"])({},Object(A["d"])(["WebSocketConectado","ArrayMensajes"])),{},{ValidarMensaje:function(){this.MensajeAEnviar.length>0?this.EnvioPermitido=!0:this.EnvioPermitido=!1}}),methods:Object(f["a"])(Object(f["a"])(Object(f["a"])({},Object(A["b"])(["ConectarWebSocket","EnviarWebSocket"])),Object(A["c"])(["ACTUALIZA_ESTADO_WS","ACTUALIZAR_TIEMPO","ACTUALIZAR_TABLA_MENSAJES"])),{},{GetVariant:function(e){console.log("Color: "+e)},ValidarTipoMensaje:function(e){"NAVEGADOR"==e?(this.MensajeAEnviar="",this.MostrarZonasNavegador=!0):(this.MostrarZonasNavegador=!1,this.MensajeAEnviar=e,this.SeleccionZona=[],this.SeleccionEstado="")},ValidarListaZonas:function(){this.MensajeAEnviar=""},ValidarMensajeNavegador:function(){return""!=this.SeleccionZona&&""!=this.SeleccionEstado},ValidarListaEstados:function(){this.MensajeAEnviar=""},AceptarEstadosNavegador:function(){var e=this;console.log("AceptarEstadosNavegador()"),console.log("this.SeleccionZona: "+this.SeleccionZona),console.log("this.SeleccionEstado: "+this.SeleccionEstado),this.MensajeAEnviar='{"Tipo":"NAV","Mensaje":[',this.SeleccionZona.forEach((function(t,a){e.MensajeAEnviar+='{"NombreZona":"'+t+'","Estado":"'+e.SeleccionEstado+'"}',a<e.SeleccionZona.length-1&&(e.MensajeAEnviar+=",")})),this.MensajeAEnviar+="]}",console.log("this.MensajeAEnviar: "+this.MensajeAEnviar)},ValidacionEnvio:function(){return 1==this.EnvioPermitido&&1==this.WebSocketConectado},EnviarMensaje:function(){this.ACTUALIZAR_TABLA_MENSAJES(this.MensajeAEnviar),this.EnviarWebSocket(this.MensajeAEnviar)},ReconectarWS:function(){this.ConectarWebSocket()},BorrarMensajes:function(){this.ACTUALIZAR_TABLA_MENSAJES("LimpiarTabla")}}),created:function(){var e=this;e.ACTUALIZAR_TIEMPO(),setInterval((function(){e.ACTUALIZAR_TIEMPO()}),500)},mounted:function(){var e=this;e.ConectarWebSocket()}},E=p,h=(a("100f"),Object(i["a"])(E,v,S,!1,null,"3668dee4",null)),g=h.exports,j={name:"v_Simulador",components:{Simulador:g}},M=j,C=Object(i["a"])(M,m,b,!1,null,null,null),O=C.exports;o["default"].use(d["a"]);var _=[{path:"/",name:"v_Simulador",component:O}],T=new d["a"]({mode:"history",base:"/SimuladorServidorWS/",routes:_}),k=T,N=(a("25f0"),a("a434"),a("e9c4"),0),R=1,y=2,P=3,w=4,W=5,Z=4444,I={SIN_OPERADOR:N,PUESTO_CERRADO:R,OPERADOR:y,ADMINISTRADOR:P,SUPERVISOR:w,EMERGENCIA:W,PUERTO_WS:Z};o["default"].use(A["a"]);var L=new A["a"].Store({state:{FeHo:{HoraActual:"",FechaActual:""},Puesto:{ID:"-1",Nombre:"-1",Estado:"-1",IP:"192.168.0.214"},MensajeSimulador:{Fecha_Hora:"",Mensaje:"",_rowVariant:""},WebSocketConectado:!1,ArrayMensajes:[],ObjWebSocket:null,MensajeWebSocket:{Tipo:"",Mensaje:""},NombreClienteWS:"[SIMULADOR]"},mutations:{ACTUALIZAR_TIEMPO:function(){var e=new Date,t=e.getDate(),a=e.getMonth()+1,o=e.getFullYear(),n=e.getHours(),s=e.getMinutes(),i=e.getSeconds();n=n>9?n:"0"+n.toString(),s=s>9?s:"0"+s.toString(),i=i>9?i:"0"+i.toString(),this.state.FeHo.HoraActual=n+":"+s+":"+i,t=t>9?t:"0"+t.toString(),a=a>9?a:"0"+a.toString(),this.state.FeHo.FechaActual=t+"/"+a+"/"+o},ACTUALIZAR_ESTADO_SOCKET:function(e,t){var a=t.EstadoWS;this.state.WebSocketConectado=a,0==a&&(this.state.ObjWebSocket=null)},ACTUALIZAR_TABLA_MENSAJES:function(e,t){if("LimpiarTabla"==t)console.log("Limpia la tabla de mensajes"),this.state.ArrayMensajes.splice(0);else{console.log("[SIMULADOR] Recibido en ACTUALIZAR_TABLA_MENSAJES: "+JSON.stringify(t)),this.state.MensajeSimulador.Fecha_Hora=this.state.FeHo.FechaActual+" - "+this.state.FeHo.HoraActual+"    --------\x3e>",this.state.MensajeSimulador.Mensaje=t,this.state.MensajeSimulador._rowVariant="success";var a=JSON.parse(JSON.stringify(this.state.MensajeSimulador));this.state.ArrayMensajes.unshift(a)}}},actions:{ConectarWebSocket:function(){var e=this;if(null==this.state.ObjWebSocket){var t="ws://"+this.state.Puesto.IP+":"+I.PUERTO_WS+"/ws";console.log("URI_WEBSOCKET: "+t),this.state.ObjWebSocket=new WebSocket(t)}this.state.ObjWebSocket.onopen=function(t){e.state.WebSocketConectado=!0},this.state.ObjWebSocket.onmessage=function(t){e.state.MensajeWebSocket=JSON.parse(t.data),console.log("%c [SIMULADOR] <<<< Recibido por Socket: "+JSON.stringify(e.state.MensajeWebSocket),"color:red"),e.state.MensajeSimulador.Fecha_Hora=e.state.FeHo.FechaActual+" - "+e.state.FeHo.HoraActual+"    <<--------",e.state.MensajeSimulador.Mensaje=JSON.stringify(e.state.MensajeWebSocket),e.state.MensajeSimulador._rowVariant="primary";var a=JSON.parse(JSON.stringify(e.state.MensajeSimulador));e.state.ArrayMensajes.unshift(a)},this.state.ObjWebSocket.onclose=function(t){console.log("[X] Cliente WebSocket ["+e.state.NombreClienteWS+"] - DESCONECTADO."),e.state.ObjWebSocket=null,e.state.WebSocketConectado=!1}},EnviarWebSocket:function(e,t){console.log("%c [SIMULADOR] >>>> Envía por Socket: "+t,"color:green"),this.state.ObjWebSocket.send(t)}},modules:{}}),x=a("5f5b");a("2dd8"),a("f9e3");o["default"].use(x["a"]),o["default"].config.productionTip=!1,new o["default"]({router:k,store:L,render:function(e){return e(l)}}).$mount("#app")},"85ec":function(e,t,a){},c35a:function(e,t,a){}});
//# sourceMappingURL=app.75a5cc07.js.map