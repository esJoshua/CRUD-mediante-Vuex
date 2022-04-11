<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h2>Crear Paciente:</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <label>Nombre</label>
        <input
          v-model="pacienteNuevo.nombre"
          type="text"
          class="form-control"
        />
      </div>
      <div class="col-12">
        <label>Edad</label>
        <input
          v-model.number="pacienteNuevo.edad"
          type="number"
          class="form-control"
        />
      </div>
      <div class="col-12">
        <label>Correo</label>
        <input
          v-model="pacienteNuevo.correo"
          type="text"
          class="form-control"
        />
      </div>
      <div class="col-12 d-flex justify-content-around">
        <button @click="cancelCreate" class="btn btn-danger mt-2">
          Cancelar
        </button>
        <button
          @click="pushPaciente(pacienteNuevo)"
          class="btn btn-primary mt-2"
        >
          Crear Paciente
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  name: "CrearView",
  data() {
    return {
      pacienteNuevo: {
        nombre: "",
        edad: null,
        correo: "",
      },
    };
  },
  methods: {
    ...mapActions(["createPaciente"]),
    ...mapMutations(["SET_PACIENTE_EN_USO"]),
    pushPaciente(e) {
      //console.log(e);
      this.SET_PACIENTE_EN_USO(e);
      this.createPaciente();
      this.$router.push("/");
    },
    cancelCreate() {
      this.$router.push("/");
    },
  },
};
</script>
