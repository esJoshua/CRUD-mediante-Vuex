<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Edad</th>
              <th scope="col">Correo</th>
              <th scope="col">Editar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(paciente, i) in data" :key="i">
              <th scope="row">{{ i + 1 }}</th>
              <td>{{ paciente.nombre }}</td>
              <td>{{ paciente.edad }}</td>
              <td>{{ paciente.correo }}</td>
              <td>
                <span @click="moveToEditar(paciente)" class="cursor-pointer"
                  >✏️</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "TablaComp",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    ...mapMutations(["SET_PACIENTE_EN_USO"]),
    moveToEditar(paciente) {
      this.SET_PACIENTE_EN_USO(paciente);
      this.$router.push("/editar");
    },
  },
};
</script>
<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
