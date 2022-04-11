import Vue from "vue";
import Vuex from "vuex";
import { db } from "@/helpers/firebase.js";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pacientes: [],
    pacienteEnUso: {},
    cargaSpinner: false,
  },
  getters: {},
  mutations: {
    SET_DATA_PACIENTES(state, payload) {
      state.pacientes = payload;
    },
    SET_DATA_PUSH_LOCAL(state, payload) {
      state.pacientes.push(payload);
    },
    SET_DATA_DELETE_LOCAL(state, payload) {
      const index = state.pacientes.findIndex(
        (item) => item.idFirebase === payload
      );
      state.pacientes.splice(index, 1);
    },
    SET_PACIENTE_EN_USO(state, payload) {
      state.pacienteEnUso = payload;
    },
    SET_EDIT_PACIENTE_NOMBRE(state, payload) {
      state.pacienteEnUso.nombre = payload;
    },
    SET_EDIT_PACIENTE_EDAD(state, payload) {
      state.pacienteEnUso.edad = payload;
    },
    SET_EDIT_PACIENTE_CORREO(state, payload) {
      state.pacienteEnUso.correo = payload;
    },
    SET_CARGAR_SPINNER(state, payload) {
      state.cargaSpinner = payload;
    },
  },
  actions: {
    async getCollectionPacientes({ commit }) {
      try {
        commit("SET_CARGAR_SPINNER", true);
        const request = await getDocs(collection(db, "Trabajadores"));
        const data = request.docs.map((doc) => {
          const obj = {
            ...doc.data(),
            idFirebase: doc.id,
          };
          return obj;
        });
        console.log(data);
        commit("SET_CARGAR_SPINNER", false);
        commit("SET_DATA_PACIENTES", data);
      } catch (error) {
        console.error(error);
      }
    },
    async updatePaciente({ state }) {
      const paciente = state.pacienteEnUso;
      try {
        const docRef = doc(db, "Trabajadores", paciente.idFirebase);
        await updateDoc(docRef, paciente);
        console.log("Ha sido Actualizado el paciente con ID: ", docRef.id);
      } catch (error) {
        console.error(error);
      }
    },
    async createPaciente({ state, commit }) {
      try {
        commit("SET_CARGAR_SPINNER", true);
        const docRef = await addDoc(collection(db, "Trabajadores"), {
          nombre: state.pacienteEnUso.nombre,
          edad: state.pacienteEnUso.edad,
          correo: state.pacienteEnUso.correo,
        });
        const obj = {
          nombre: state.pacienteEnUso.nombre,
          edad: state.pacienteEnUso.edad,
          correo: state.pacienteEnUso.correo,
          idFirebase: docRef.id,
        };
        console.log("Ha sido creado el paciente con ID: ", docRef.id);
        commit("SET_DATA_PUSH_LOCAL", obj);
        commit("SET_CARGAR_SPINNER", false);
      } catch (error) {
        console.error(error);
      }
    },
    async deletePaciente({ state, commit }) {
      const pacienteId = state.pacienteEnUso.idFirebase;
      try {
        commit("SET_CARGAR_SPINNER", true);
        await deleteDoc(doc(db, "Trabajadores", pacienteId));
        console.log("Ha sido borrado el paciente con ID: ", pacienteId);
        commit("SET_DATA_DELETE_LOCAL", pacienteId);
        commit("SET_CARGAR_SPINNER", false);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
