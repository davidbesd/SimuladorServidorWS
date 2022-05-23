<template>
    <div class="container-fluid">
        <div class="row align-items-start">
            <h1 class="Titulo font-weight-bold">Simulador Servidor WebSocket</h1>
        </div>
        <!--  ********************************************************************************************************  -->
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
        <div class="row align-items-start mr-sm-2 mb-sm-0">
            <label class="Elemento mr-sm-2 mb-sm-0 font-weight-bold">Tipo de mensaje:</label>
        </div>
        <!--  ********************************************************************************************************  -->
        <div class="row align-items-start">
            <b-form-radio-group
                v-model="TipoSeleccionado"
                :options="TiposDeMensaje"
                class="Elemento mr-sm-2 mb-sm-0 font-weight-bold"
                value-field="item"
                text-field="name">
            </b-form-radio-group>
        </div>
        <!--  ********************************************************************************************************  -->
        <div class="row align-items-start mr-sm-2 mb-sm-0">
            <label class="Elemento mr-sm-2 mb-sm-0 font-weight-bold">Mensaje a enviar:</label>
        </div>
        <!--  ********************************************************************************************************  -->
        <div class="row align-items-start mr-sm-2 mb-sm-0">
            <div class="col-lg-8 d-flex justify-content-start">
                <b-form-input  v-model="MensajeAEnviar" :state="Validacion" class="Enviar mr-sm-2 mb-sm-0" placeholder="Mensaje a envíar"></b-form-input>
                <!-- <b-button class="font-weight-bold" size="sm" pill variant="primary" :disabled="!EnvioPermitido" @click="EnviarMensaje">ENVIAR</b-button>         -->
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
                Mensaje: {
                    Texto: "",
                    Estilo: "LOG"
                },
                // Para los RadioButton
                TipoSeleccionado: "LOG",
                TiposDeMensaje: [
                    { item: 'LOG', name: 'Registro Eventos' },
                    { item: 'FIBRAS', name: 'Fibras a Rearmar' },
                ],
                EnvioPermitido: false,
                MensajeAEnviar: "",
            }
        },
        props: {
        },
        computed: {
            ...mapState([ "WebSocketConectado", "ArrayMensajes" ]),
            Validacion() {
                if(this.MensajeAEnviar.length > 0) {
                    this.EnvioPermitido = true;
                }
                else {
                    this.EnvioPermitido = false;
                }
            }
        },
        methods: {
            ...mapActions(["ConectarWebSocket", "EnviarWebSocket"]),
            ...mapMutations(["ACTUALIZA_ESTADO_WS", "ACTUALIZAR_TIEMPO", "ACTUALIZAR_TABLA_MENSAJES"]),
            ArrancarSocket() {
                this.ACTUALIZA_ESTADO_WS(true);
            },
            PararSocket() {
                this.ACTUALIZA_ESTADO_WS(false);
            },
            ValidacionEnvio() {
                if(this.EnvioPermitido == true && this.WebSocketConectado == true) {
                    return true;
                }
                else {
                    return false;
                }
            },
            EnviarMensaje() {
                const MensajeFormado = {"Tipo":this.TipoSeleccionado, "Mensaje":this.MensajeAEnviar};

                console.log("MensajeFormado: " + JSON.stringify(MensajeFormado));

                this.EnviarWebSocket(MensajeFormado);

                this.ACTUALIZAR_TABLA_MENSAJES(MensajeFormado);
            },
            ReconectarWS() {
                this.ConectarWebSocket();
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

             // Subscripción a las acciones del Socket
            this.$store.subscribeAction((action, state) => {
            // console.log("Action Subscrita [Consola " + this.Puesto.Consola + "] = " + action.type);
            switch (action.type) {
                case "NuevoMensajeWS":
                // self.ActualizaMensajeLog(action.payload);
                this.Mensaje.Texto = action.payload;
                this.Mensaje.Estilo = "danger";
                this.ACTUALIZAR_TABLA_MENSAJES(this.Mensaje);

                break;
            }
            });
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
</style>
