SCK --> "Paso"
    function actualizarPasoDesdeSck(ip_paso,nombre,estado,off,preventivo,mantenimiento); 
        Saca valores de arrays asociativos con los parámetros recibidos para llamar a la siguiente función:
        _root.LD.SCK_actualizarEstPasos(nombre,v_objeto,v_mantenimiento,v_aviso,v_averia,v_fallo,off,preventivo);

MC ListadoDetectoresEnc
    function SCK_actualizarEstPasos(v_paso,v_objeto,v_mantenimiento,v_aviso,v_averia,v_fallo,v_off,v_preventivo)
        Se pasan los parámetros recibidos a las variables del MC LineaEstadoDetector
        Se llama a la función aClip.cambiarEstado del MC LineaEstadoDetector

MC LineaEstadoDetector
    function cambiarEstado(nvoObjeto,nvoMto,nvoAviso,nvaAveria,nvoFallo)
        Se ponen los nuevos estados en el registo correspondiente de la tabla



{
    "Detector": "PS 2,7",
    "IP": "80101",
    "Nombre": "PS 2,7",
    "Estado": "-1",
    "Fallo": "0",
    "Averia": "0",
    "Aviso": "0",
    "Objeto": "0",
    "Mantenimiento": "0",
    "Off": "0",
    "ET": "801",
    "Preventivo": "8",
    "Color": ""
},

tipo    = "paso"
ence    = "5"
gw      = "9"
et      = "901"
ip_paso = "90103"
nombre  = "TP 30,9"
off     = "0"
prev    = "1"
mant    = "0"
estado  = "0"