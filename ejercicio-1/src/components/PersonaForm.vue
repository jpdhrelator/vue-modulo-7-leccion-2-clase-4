<script setup>
import { ref } from 'vue';
import {ref as dbRef,push,set }  from 'firebase/database';
import { db } from '../firebase';


const form= ref({
    nombre:"",
    apellidos:"",
    edad:""
});
const loading = ref(false);
const mensaje = ref({ texto: '', tipo: '' }); // tipo: 'success' | 'error'


const registrarPersona = async ()=>{
    if (!form.value.nombre || !form.value.apellidos || !form.value.edad) {
        mostrarMensaje('Por favor, completa todos los campos.', 'error');
        return;
    }
    loading.value = true;
    const personasRef = dbRef(db, 'personas');

    // Generar una nueva clave única (push)
    const nuevaPersonaRef = push(personasRef);

    
    // Guardar los datos (set)
    await set(nuevaPersonaRef, {
      nombre: form.value.nombre,
      apellidos: form.value.apellidos,
      edad: Number(form.value.edad),
      fechaRegistro: new Date().toISOString()
    });

    mostrarMensaje('¡Persona registrada con éxito!', 'success');

    loading.value = false;
    resetForm();
}


const mostrarMensaje = (texto, tipo) => {
  mensaje.value = { texto, tipo };
  setTimeout(() => (mensaje.value.texto = ''), 4000);
};
const resetForm= ()=> {form.value={
    nombre:"",
    apellidos:"",
    edad:""
}}
</script>

<template>
    <div class="card">
        <h2>Registro de Personas</h2>
        <p class="subtitle">Conexión con Firebase Realtime Database</p>

        <form @submit.prevent="registrarPersona" class="registration-form">
            <div class="form-group">
                <label for="nombre">Nombre</label>
                <input 
                id="nombre" 
                v-model="form.nombre" 
                type="text" 
                placeholder="Ej: Jose Alberto"
                :disabled="loading"
                />
            </div>
            <div class="form-group">
                <label for="apellidos">Apellidos</label>
                <input 
                id="apellidos" 
                v-model="form.apellidos" 
                type="text" 
                placeholder="Ej: Toro Hernández"
                :disabled="loading"
                />
            </div>

            <div class="form-group">
                <label for="edad">Edad</label>
                <input 
                id="edad" 
                v-model="form.edad" 
                type="number" 
                placeholder="Ej: 25"
                :disabled="loading"
                />
            </div>
            <button type="submit" :disabled="loading" class="submit-btn">
                <span v-if="loading">Registrando...</span>
                <span v-else>Guardar en Firebase</span>
            </button>

            <transition name="fade">
                <div v-if="mensaje.texto" :class="['alert', mensaje.tipo]">
                {{ mensaje.texto }}
                </div>
            </transition>


        </form>
    </div>
</template >


<style scoped>
.card {
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  max-width: 450px;
  margin: 2rem auto;
}

h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.5rem;
}

.subtitle {
  color: #64748b;
  margin-bottom: 2rem;
  font-size: 0.875rem;
}

.registration-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;
}

label {
  font-weight: 600;
  color: #334155;
  font-size: 0.875rem;
}

input {
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.submit-btn {
  background-color: #3b82f6;
  color: white;
  padding: 0.875rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  background-color: #2563eb;
}

.submit-btn:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.alert {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  text-align: center;
}

.success {
  background-color: #ecfdf5;
  color: #059669;
  border: 1px solid #10b981;
}

.error {
  background-color: #fef2f2;
  color: #dc2626;
  border: 1px solid #ef4444;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>