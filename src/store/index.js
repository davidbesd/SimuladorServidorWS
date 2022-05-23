import Vue from "vue";
import Vuex from "vuex";
import constantes from "@/constantes/const";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        FeHo: {
            HoraActual: "",
            FechaActual: ""
        },
        Puesto: {
            ID: "-1",
            Nombre: "-1",
            Estado: "-1",
            IP: "192.168.0.214",
        },
        MensajeSimulador: {
            Fecha_Hora: "",
            Mensaje: "",
            _rowVariant: ""
        },
        WebSocketConectado: false,
        ArrayMensajes: [],
        ObjWebSocket: null,
        MensajeWebSocket: {
            Tipo: "",
            Mensaje: ""
        },
        NombreClienteWS: "[SIMULADOR]",
    },
    mutations: {
        /***************************************************************************
         * MUTACIÓN: ACTUALIZAR_TIEMPO()
         * AUTOR: David Blázquez.
         * DESCRIPCIÓN: Mutación que lee la fecha y la hora actuales para mantener
         *              actualizadas las variables HoraActual y FechaActual.
         * PARÁMETROS DE ENTRADA: Ninguno.
         * PARÁMETROS DE SALIDA: Ninguno.
         * FECHA: 17.05.2022
         ****************************************************************************/
        ACTUALIZAR_TIEMPO() {
            var date = new Date();
            let Dia = date.getDate();
            let Mes = date.getMonth() + 1;
            let Anio = date.getFullYear();
            let Hora = date.getHours();
            let Minutos = date.getMinutes();
            let Segundos = date.getSeconds();

            Hora = Hora > 9 ? Hora : "0" + Hora.toString();
            Minutos = Minutos > 9 ? Minutos : "0" + Minutos.toString();
            Segundos = Segundos > 9 ? Segundos : "0" + Segundos.toString();

            this.state.FeHo.HoraActual = Hora + ":" + Minutos + ":" + Segundos;

            Dia = Dia > 9 ? Dia : "0" + Dia.toString();
            Mes = Mes > 9 ? Mes : "0" + Mes.toString();

            this.state.FeHo.FechaActual = Dia + "/" + Mes + "/" + Anio;
        },
        /***************************************************************************
         * MUTACIÓN: ACTUALIZAR_ESTADO_SOCKET(...)
         * AUTOR: David Blázquez.
         * DESCRIPCIÓN: Mutación que actualiza el estado del WebSocket (Conectado/Desconectado).
         * PARÁMETROS DE ENTRADA: Estado del WS.
         * PARÁMETROS DE SALIDA: Ninguno.
         * FECHA: 17.05.2022
         ****************************************************************************/
        ACTUALIZAR_ESTADO_SOCKET(state, { EstadoWS }) {
            this.state.WebSocketConectado = EstadoWS;
            if (EstadoWS == false) { 
                this.state.ObjWebSocket = null;
            }
        },
        /***************************************************************************
         * MUTACIÓN: ACTUALIZAR_TABLA_MENSAJES(...)
         * AUTOR: David Blázquez.
         * DESCRIPCIÓN: Mutación que guarda en el array de mensajes websocket los 
         *              datos del mensaje que se quiere mostrar en la tabla de mensajes.
         * PARÁMETROS DE ENTRADA: Objeto con el mensaje a mostrar y su estilo.
         * PARÁMETROS DE SALIDA: Ninguno.
         * FECHA: 17.05.2022
         ****************************************************************************/
        ACTUALIZAR_TABLA_MENSAJES(state, Mensaje) {
            // console.log("[SIMULADOR] Recibido en ACTUALIZAR_TABLA_MENSAJES: " + JSON.stringify(Mensaje));
            this.state.MensajeSimulador.Fecha_Hora = this.state.FeHo.FechaActual + " - " + this.state.FeHo.HoraActual  + "    >>>>>>>>>>";
            this.state.MensajeSimulador.Mensaje    = Mensaje;
            this.state.MensajeSimulador._rowVariant= "success";
            // Para evitar que se guarde en el array la referencia al objeto (lo que hace que se vayan machacando los datos con los últimos introducidos)
            // se pasa a objeto de JS y se vuelve a pasar a cadena, así se guarda un objeto distinto cada vez.
            let ObjetoRegistro = JSON.parse(JSON.stringify(this.state.MensajeSimulador));
            // Se añade el objeto recibido al principio del array para mostrar siempre el más reciente.
            this.state.ArrayMensajes.unshift(ObjetoRegistro);
        },
    },
    actions: {
        /***************************************************************************
        * FUNCIÓN: ConectarWebSocket(...)
        * AUTOR: David Blázquez.
        * DESCRIPCIÓN: Función que conecta con el Servidor WebSocket.
        * PARÁMETROS DE ENTRADA: commit.
        * PARÁMETROS DE SALIDA: Ninguno.
        * FECHA: 05.05.2022
        ****************************************************************************/
        ConectarWebSocket() {
            // console.log("En ConectarWebSocket()");
            // console.log("this.state.ObjWebSocket = " + this.state.ObjWebSocket);
            if (this.state.ObjWebSocket == null) {
                // URL dónde se encuentra ejecutando nuestro servidor de WS
                const URI_WEBSOCKET = "ws://" + this.state.Puesto.IP + ":" + constantes.PUERTO_WS + "/ws";
                console.log("URI_WEBSOCKET: " + URI_WEBSOCKET);
                // Creamos un nuevo "cliente" de WS
                this.state.ObjWebSocket = new WebSocket(URI_WEBSOCKET);
            }
    
            // Controla la conexión al WS
            this.state.ObjWebSocket.onopen = event => {
                // Actualiza la variable de control del estado del WebSocket.
                // Debería hacerse con una mutación, pero no funciona, así que se cambia el estado directamente.
                // commit('ACTUALIZAR_ESTADO_SOCKET', {TipoSCK:'DTR', EstadoSCK:true});
                this.state.WebSocketConectado = true;
                // DE MOMENTO NO SE HACE NADA MÁS DESPUÉS DE LA CONEXIÓN CON EL SERVIDOR
            };
            // Nos suscribimos a los eventos de transferencia de mensajes por parte del servidor, si tuvieramos mensajes de diferentes tipos
            // podríamos llevar a cabo una validación
            this.state.ObjWebSocket.onmessage = event => {
                // *****************************************************************************************
                // ** DE MOMENTO EN EL SIMULADOR NO SE HACE NADA CON LOS MENSAJES RECIBIDOS DEL SERVIDOR. **
                // ** SE DEJA EL CÓDIGO COMENTADO POR SI SE QUISIESE TRATAR EL MENSAJE RECIBIDO           **
                // *****************************************************************************************

                // Pasamos el JSON recibido a un objeto JS
                this.state.MensajeWebSocket = JSON.parse(event.data);
                // console.log("this.state.MensajeWebSocket.Tipo: " + this.state.MensajeWebSocket.Tipo);
                // console.log("this.state.MensajeWebSocket.Mensaje: " + this.state.MensajeWebSocket.Mensaje);

                console.log("%c [SIMULADOR] <<<< Recibido por Socket: " + JSON.stringify(this.state.MensajeWebSocket), "color:red");
                // Actualiza la tabla de mensajes de Socket con el recibido del Servidor.
                this.state.MensajeSimulador.Fecha_Hora = this.state.FeHo.FechaActual + " - " + this.state.FeHo.HoraActual + "    <<<<<<<<<<";
                this.state.MensajeSimulador.Mensaje    = JSON.stringify(this.state.MensajeWebSocket);
                this.state.MensajeSimulador._rowVariant= "danger";
                // Para evitar que se guarde en el array la referencia al objeto (lo que hace que se vayan machacando los datos con los últimos introducidos)
                // se pasa a objeto de JS y se vuelve a pasar a cadena, así se guarda un objeto distinto cada vez.
                let ObjetoRegistro = JSON.parse(JSON.stringify(this.state.MensajeSimulador));
                // Se añade el objeto recibido al principio del array para mostrar siempre el más reciente.
                this.state.ArrayMensajes.unshift(ObjetoRegistro);
            };
            this.state.ObjWebSocket.onclose = event => {
                console.log("[X] Cliente WebSocket [" + this.state.NombreClienteWS + "] - DESCONECTADO.");
                // Actualiza las variables de control del estado del Socket DTR.
                // Debería hacerse con una mutación, pero no funciona, así que se cambia el estado directamente.
                // commit('ACTUALIZAR_ESTADO_SOCKET', {TipoSCK:'DTR', Estado:false});
                this.state.ObjWebSocket         = null;
                this.state.WebSocketConectado   = false;
                
            };
        },
        EnviarWebSocket(state, Mensaje) {
                const MensajeTx = JSON.stringify(Mensaje);
                console.log("%c [SIMULADOR] >>>> Envía por Socket: " + MensajeTx, "color:green");
                this.state.ObjWebSocket.send(MensajeTx);
        },
        // Acciones sobre las que se hace dispatch para ejecutar funciones de otros componentes.
        MensajeWebSocket(Mensaje) {},
        // SocketPresentaciones(Mensaje) {}
        NuevoMensajeSimulador(Mensaje) {}
    },
    modules: {}    
});
