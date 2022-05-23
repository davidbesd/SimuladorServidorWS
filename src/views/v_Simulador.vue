<template>
    <div class="home">
        <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
        <Simulador></Simulador>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Simulador from "@/components/Simulador.vue";
    // import Simulador from '../components/Simulador.vue';

    export default {
        name: "v_Simulador",
        components: {
            Simulador
        },
    };
</script>
