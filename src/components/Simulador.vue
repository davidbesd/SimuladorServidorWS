<template>
    <div class="container-fluid">
        <div class="row align-items-start">
            <h1 class="Titulo font-weight-bold">Simulador Servidor WebSocket</h1>
        </div>
        <!--  **** CAJAS DATOS SERVIDOR ****************************************************************************************************  -->
        <div class="row align-items-start">
            <div class="Elemento">
                <b-form inline>
                    <p class="mr-sm-2 mb-sm-0 font-weight-bold">Servidor arrancado en:</p>
                    <label class="mr-sm-2 mb-sm-0">IP</label>
                    <b-form-input v-model="IPServidor" class="mr-sm-2 mb-sm-0 font-weight-bold"></b-form-input>
                    <label  class="mr-sm-2 mb-sm-0">Puerto</label>
                    <b-form-input v-model="Puerto" class="mr-sm-2 mb-sm-0 font-weight-bold"></b-form-input>
                    <div class="row align-items-center">
                        <button class="btn-lg  badge-pill TestigoWebSocket Conectado" v-if="WebSocketConectado">CONECTADO</button>
                        <button class="btn-lg  badge-pill TestigoWebSocket Conectar" v-if="!WebSocketConectado" @click="ReconectarWS">CONECTAR</button>
                    </div>
                </b-form>
            </div>
        </div>
        <!--  ********************************************************************************************************  -->
        <div class="row align-items-start">
            <label class="Elemento font-weight-bold">Tipos de mensaje:</label>
        </div>
        <!--  **** BOTONES TIPOS DE MENSAJE ****************************************************************************************************  -->
        <div class="row">
            <b-form-group class="Opciones">
                <b-form-radio-group
                    v-model="SeleccionTipoMensaje"
                    :options="ArrayTiposMensaje"                        
                    v-on:change="ValidarTipoMensaje"
                    button-variant="outline-primary"
                    size="md"
                    buttons
                >
                </b-form-radio-group>
            </b-form-group>
        </div>
        <!--  **** SELECTORES DE ZONA Y ESTADO ****************************************************************************************************  -->
        <div class="row">
            <div class="ListadoZonas d-flex justify-content-start">
                <b-form-group class="justify-content-end">
                    <b-form-checkbox-group
                        v-if='MostrarZonasNavegador'
                        v-model="SeleccionZona"
                        :options="ArrayZonasNavegador"    
                        switches
                        size="md"
                        stacked
                        buttons
                        button-variant="outline-primary"
                        v-on:change="ValidarListaZonas"
                    >
                    </b-form-checkbox-group>
                </b-form-group>
            </div>
            <div class="ListadoEstados d-flex justify-content-start">
                <b-form-group>
                    <b-form-radio-group
                        v-if='MostrarZonasNavegador'
                        v-model="SeleccionEstado"
                        :options="ArrayEstadosZonas"    
                        size="md"
                        stacked
                        buttons
                        button-variant="outline-primary"
                        v-on:change="ValidarListaEstados"
                    >                
                    </b-form-radio-group>
                </b-form-group>
            </div> 
            <div>
                <b-button v-if='MostrarZonasNavegador' class="BotonAceptarZonas font-weight-bold" size="sm" pill variant="primary" :disabled="!ValidarMensajeNavegador()" @click="AceptarEstadosNavegador">ACEPTAR</b-button>        
            </div>
        </div>
        <!--  **** CAJA DE MENSAJE A ENVIAR ****************************************************************************************************  -->        
        <div class="row align-items-start mr-sm-2 mb-sm-0">
            <div class="col-lg-8 d-flex justify-content-start">
                <b-form-input  v-model="MensajeAEnviar" :state="ValidarMensaje" class="Enviar mr-sm-2 mb-sm-0" placeholder="Mensaje a enviar..."></b-form-input>
                <b-button class="font-weight-bold" size="sm" pill variant="primary" :disabled="!ValidacionEnvio()" @click="EnviarMensaje">ENVIAR</b-button>        
            </div>
        </div>
        <!--  ********************************************************************************************************  -->
        <div class="row align-items-start mr-sm-2 mb-sm-0">
            <label class="Elemento mr-sm-2 mb-sm-0 font-weight-bold">Mensajes:</label>
        </div>
        <!--  ********************************************************************************************************  -->
        <div class="row align-items-start mr-sm-2 mb-sm-0">
            <b-table   
                small
                hover
                sticky-header
                :items='ArrayMensajes' 
                class="text-left EstiloTabla TablaRx">
            </b-table>
        </div>
        <!--  ********************************************************************************************************  -->        
        <div class="row align-items-start mr-sm-2 mb-sm-0">
            <b-button class="Elemento font-weight-bold" size="sm" pill variant="primary" @click="BorrarMensajes">BORRAR MENSAJES</b-button>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapActions } from "vuex";
    
    export default {
        name: "Simulador",
        data: function() {
            return {
                IPServidor: "192.168.0.214",
                Puerto: "4444",
                TipoMensajeSeleccioa: "",
                SeleccionTipoMensaje: null,
                MostrarZonasNavegador: false,
                EnvioPermitido: false,
                MensajeAEnviar: "",
                SeleccionZona: [],
                SeleccionEstado: "",
                ArrayTiposMensaje: [
                    { name: 'LOG', text: 'Registro Eventos', value: '{"Tipo":"LOG","Mensaje":"Mensaje de prueba para el componente que muestra el registro de eventos."}' },
                    { name: 'REARMABLES', text: 'Fibras a Rearmar', value: '{"Tipo":"REARMABLES","Mensaje":{"NombreFibra":"nueva_FIBRA_4","Valor":"1"}}' },
                    { name: 'ESTADOS_PASO', text: 'Estado Pasos', value: '{"Tipo":"PASO","Mensaje":{"ENCE":"1","GW":"1","ET":"101","IP_PASO":"10103","NOMBRE":"PS 80,7","OFF":"0","PREV":"1","MANT":"2", "ESTADO":"8"}}' },
                    { name: 'CABECERA_ENC', text: 'Cabecera ENC', value: '{"Tipo":"GW","Mensaje":{"GW":"8","ET":"0","COM":"0","ALARMA":"15","PPAL":"0","ALT":"0","EST_PPAL":"0","EST_ALT":"0"}}' },
                    { name: 'NAV', text: 'Zonas Navegador', value: 'NAVEGADOR' }
                ],
                ArrayZonasNavegador: [
                    { name: 'PLASENCIA', text: 'Plasencia', value: 'BTZ1' },
                    { name: 'CÁCERES', text: 'Cáceres', value: 'BTZ2' },
                    { name: 'MÉRIDA', text: 'Mérida', value: 'BTZ3' },
                    { name: 'GUADIANA', text: 'Guadiana', value: 'BTZ4' },
                    { name: 'BADAJOZ', text: 'Badajoz', value: 'BTZ5' }
                ],
                ArrayEstadosZonas: [
                    { text: 'Sin conexión', value: '0', color: '#666666' },
                    { text: 'Normal', value: '1', color: '#lightgray' },
                    { text: 'Objeto', value: '2', color: '#FF0000' },
                    { text: 'Anomalia', value: '3', color: '#FFFF00' },
                    { text: 'Mantenimiento', value: '4', color: '#00CCFF' }
                ],
            }
        },
        props: {
        },
        computed: {
            ...mapState([ "WebSocketConectado", "ArrayMensajes" ]),
            ValidarMensaje() {
                // console.log("**** ValidarMensaje ****: " + this.MensajeAEnviar);
                if(this.MensajeAEnviar.length > 0) {
                    this.EnvioPermitido = true;
                }
                else {
                    this.EnvioPermitido = false;
                }
            },
        },
        methods: {
            ...mapActions(["ConectarWebSocket", "EnviarWebSocket"]),
            ...mapMutations(["ACTUALIZA_ESTADO_WS", "ACTUALIZAR_TIEMPO", "ACTUALIZAR_TABLA_MENSAJES"]),
            GetVariant(Color) {
                console.log('Color: ' + Color);
                
            },
            /***************************************************************************
            * FUNCIÓN: ValidarTipoMensaje()
            * AUTOR: David Blázquez.
            * DESCRIPCIÓN: Pasa el valor del checkbutton seleccionado a la variable que
            *              controla el campo mensaje a enviar.
            * PARÁMETROS DE ENTRADA: Campo value del objeto seleccionado.
            * PARÁMETROS DE SALIDA: Ninguno.
            * FECHA: 26.05.2022
            ****************************************************************************/
            ValidarTipoMensaje(value) {
                if(value == "NAVEGADOR") {
                    this.MensajeAEnviar = "";
                    this.MostrarZonasNavegador = true;
                }
                else {
                    this.MostrarZonasNavegador = false;
                    this.MensajeAEnviar = value;
                    this.SeleccionZona = [];
                    this.SeleccionEstado = "";
                }
            },
            ValidarListaZonas() {
                this.MensajeAEnviar = "";
            },
            ValidarMensajeNavegador() {
                if(this.SeleccionZona != "" && this.SeleccionEstado != "") {
                    return true;
                }
                else {
                    return false;
                }
            },
            ValidarListaEstados() {
                this.MensajeAEnviar = "";
            },
            AceptarEstadosNavegador() {
                console.log('AceptarEstadosNavegador()');
                console.log('this.SeleccionZona: ' + this.SeleccionZona);
                console.log('this.SeleccionEstado: ' + this.SeleccionEstado);

                this.MensajeAEnviar = '{"Tipo":"NAV","Mensaje":['; 

                this.SeleccionZona.forEach((Zona, Indice) => {
                    this.MensajeAEnviar += '{"NombreZona":"' + Zona + '","Estado":"' + this.SeleccionEstado + '"}';
                    if(Indice < this.SeleccionZona.length-1 ) {
                        this.MensajeAEnviar += ',';
                    }
                });
                this.MensajeAEnviar += ']}';
                console.log('this.MensajeAEnviar: ' + this.MensajeAEnviar);
                
            },
            /***************************************************************************
            * FUNCIÓN: ValidacionEnvio()
            * AUTOR: David Blázquez.
            * DESCRIPCIÓN: Comprueba si el envío está permitido y si existe conexión con 
            *              el Servidor de WS para habilitar o no el boón de envío.
            * PARÁMETROS DE ENTRADA: Ninguno.
            * PARÁMETROS DE SALIDA: Ninguno.
            * FECHA: 26.05.2022
            ****************************************************************************/
            ValidacionEnvio() {
                if(this.EnvioPermitido == true && this.WebSocketConectado == true) {
                    return true;
                }
                else {
                    return false;
                }
            },
            /***************************************************************************
            * FUNCIÓN: EnviarMensaje()
            * AUTOR: David Blázquez.
            * DESCRIPCIÓN: Llama tanto a la mutación que se encarga de actualizar la tabla
            *              de mensajes como a la función de envío de mensajes por WS.
            * PARÁMETROS DE ENTRADA: Ninguno.
            * PARÁMETROS DE SALIDA: Ninguno.
            * FECHA: 26.05.2022
            ****************************************************************************/
            EnviarMensaje() {
                this.ACTUALIZAR_TABLA_MENSAJES(this.MensajeAEnviar);
                this.EnviarWebSocket(this.MensajeAEnviar);
            },
            /***************************************************************************
            * FUNCIÓN: ReconectarWS()
            * AUTOR: David Blázquez.
            * DESCRIPCIÓN: Vuelve a intentar la conexión con el Servidor WebSocket.
            * PARÁMETROS DE ENTRADA: Ninguno.
            * PARÁMETROS DE SALIDA: Ninguno.
            * FECHA: 26.05.2022
            ****************************************************************************/            
            ReconectarWS() {
                this.ConectarWebSocket();
            },
            /***************************************************************************
            * FUNCIÓN: BorrarMensajes()
            * AUTOR: David Blázquez.
            * DESCRIPCIÓN: Borra todos los mensajes de la tabla.
            * PARÁMETROS DE ENTRADA: Ninguno.
            * PARÁMETROS DE SALIDA: Ninguno.
            * FECHA: 26.05.2022
            ****************************************************************************/            
            BorrarMensajes() {
                this.ACTUALIZAR_TABLA_MENSAJES("LimpiarTabla");
                
                //this.ArrayMensajes.splice(0);
            }
        },
        /***************************************************************************
        * FUNCIÓN: created()
        * AUTOR: David Blázquez.
        * DESCRIPCIÓN: Hook del ciclo de vida que se ejecuta cuando se ha creado el
        *              componente.
        * PARÁMETROS DE ENTRADA: Ninguno.
        * PARÁMETROS DE SALIDA: Ninguno.
        * FECHA: 17.05.2022
        ****************************************************************************/
        created() {
            var self = this;
            self.ACTUALIZAR_TIEMPO();
            setInterval(function() {
                self.ACTUALIZAR_TIEMPO();
            }, 500);
        },
        /***************************************************************************
        * FUNCIÓN: mounted()
        * AUTOR: David Blázquez.
        * DESCRIPCIÓN: Hook del ciclo de vida que se ejecuta cuando se ha montado el
        *              componente.
        * PARÁMETROS DE ENTRADA: Ninguno.
        * PARÁMETROS DE SALIDA: Ninguno.
        * FECHA: 05.05.2022
        ****************************************************************************/        
        mounted() {
            var self = this;
            self.ConectarWebSocket();
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .Titulo {
        margin-top: 50px;
        margin-left: 50px;
        color: red;
        text-decoration: underline;
    }
    .Elemento {
        margin-top: 20px;
        margin-left: 50px;
    }

    .Opciones {
        margin-left: 50px;
    }
    
    .Puerto {
        width: 50px;
    }
    .TablaRx {
        margin-top: 5px;
        margin-left: 50px;
    }
    .Enviar {
        margin-top: 5px;
        margin-left: 30px;
    }
    .EstiloTabla {
        /* margin: 0px; */
        /* padding: 0px; */
        font-size: 13px;
        font-family: Arial;
        /* font-family: monospace; */
        
        color: var(--Adif);
        background-color: whitesmoke;
        
        outline: 4px;
        outline-color: gray;
        outline-style: inset;
        height: 250px;
        width: 1200px;
    }
    .TestigoWebSocket {
        margin-left: 30px;
        font-size: 13px;
        font-family: Arial;
        font-weight: bold;
    }
    .Conectar {
        pointer-events: auto;
        background-color: red;
        color: white;
    }
    .Conectado {
        pointer-events: none;
        background-color: greenyellow;
        color: black;
    }

    .ListadoZonas {
        /* outline: 4px solid red; */
        margin-left: 635px;
    }

    .ListadoEstados {
        /* outline: 4px solid red; */
        margin-left: 10px;
    }

    .BotonAceptarZonas {
        margin-left: 10px;
        margin-top: 77px;
    }
</style>
