<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h2>Editar Paciente:</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <label>Nombre</label>
        <input v-model="nombre" type="text" class="form-control" />
      </div>
      <div class="col-12">
        <label>Edad</label>
        <input v-model.number="edad" type="number" class="form-control" />
      </div>
      <div class="col-12">
        <label>Correo</label>
        <input v-model="correo" type="text" class="form-control" />
      </div>
      <div class="col-12 d-flex justify-content-around">
        <button @click="cancelUpdate" class="btn btn-danger mt-2">
          Cancelar
        </button>
        <button @click="updatePacienteLocal" class="btn btn-primary mt-2">
          Actualizar Datos
        </button>
        <button @click="deletePacienteLocal" class="btn btn-danger mt-2">
          Eliminar Paciente
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState, mapActions } from "vuex";
export default {
  name: "EditarView",
  data() {
    return {
      paciente: {
        nombre: "",
        edad: null,
        correo: "",
      },
    };
  },
  computed: {
    ...mapState(["pacienteEnUso"]),
    nombre: {
      get() {
        return this.pacienteEnUso.nombre;
      },
      set(value) {
        this.paciente.nombre = value;
      },
    },
    edad: {
      get() {
        return this.pacienteEnUso.edad;
      },
      set(value) {
        this.paciente.edad = Number(value);
      },
    },
    correo: {
      get() {
        return this.pacienteEnUso.correo;
      },
      set(value) {
        this.paciente.correo = value;
      },
    },
  },
  methods: {
    ...mapMutations([
      "SET_EDIT_PACIENTE_NOMBRE",
      "SET_EDIT_PACIENTE_EDAD",
      "SET_EDIT_PACIENTE_CORREO",
    ]),
    ...mapActions(["updatePaciente", "deletePaciente"]),
    cancelUpdate() {
      this.$router.push("/");
    },
    async updatePacienteLocal() {
      this.SET_EDIT_PACIENTE_NOMBRE(
        this.paciente.nombre || this.pacienteEnUso.nombre
      );
      this.SET_EDIT_PACIENTE_EDAD(
        this.paciente.edad || this.pacienteEnUso.edad
      );
      this.SET_EDIT_PACIENTE_CORREO(
        this.paciente.correo || this.pacienteEnUso.correo
      );
      await this.updatePaciente();
      this.$router.push("/");
    },
    deletePacienteLocal() {
      this.deletePaciente();
      this.$router.push("/");
    },
  },
};
</script>
