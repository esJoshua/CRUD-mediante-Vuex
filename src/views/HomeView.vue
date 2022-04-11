<template>
  <div class="container">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1 class="my-3">Lista de Pacientes</h1>
    <RouterLink to="/crear" class="btn btn-primary mb-3 d-grid"
      >Añadir Paciente</RouterLink
    >
    <div
      class="text-primary mt-5"
      role="status"
      aria-hidden="true"
      v-if="cargaSpinner"
    >
      <div class="spinner-border m-3"></div>
      <div>Cargando contenido...</div>
    </div>
    <TablaComp :data="pacientes" v-if="!cargaSpinner" />
  </div>
</template>

<script>
// @ is an alias to /src
import TablaComp from "@/components/TablaComp.vue";
import { mapState } from "vuex";
export default {
  name: "HomeView",
  components: {
    TablaComp,
  },
  computed: {
    ...mapState(["pacientes", "cargaSpinner"]),
  },
};
</script>
