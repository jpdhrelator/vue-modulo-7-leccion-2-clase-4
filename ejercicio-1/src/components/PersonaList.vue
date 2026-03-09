<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { ref as dbRef, onValue, remove, update } from 'firebase/database';
import { db } from '../firebase';

const personas = ref([]);
const loading = ref(true);


const personasRef = dbRef(db, 'personas');
// Estado para la edición
const personaEditandoId = ref(null);
const personaEditada = ref({
  nombre: '',
  apellidos: '',
  edad: 0
});

// Suscribirse a los cambios en tiempo real
let unsubscribe;

onMounted(() => {
  unsubscribe = onValue(personasRef,(snapshot)=>{
      
        const data = snapshot.val();
        console.log('original:',data);
        
        if (data) {
           personas.value = Object.entries(data).map(([id, valores]) => ({
                id,
                ...valores
            })) 

          console.log( 'transformado:',personas.value );  
        }else{
            personas.value = [];
        }

    });
});

// Limpiar la suscripción al desmontar el componente
onUnmounted(() => {
  if (unsubscribe) unsubscribe();
});

// Funciones de Edición
const habilitarEdicion = (persona) => {
  personaEditandoId.value = persona.id;
  personaEditada.value = { 
    nombre: persona.nombre, 
    apellidos: persona.apellidos, 
    edad: persona.edad 
  };
};

const cancelarEdicion = () => {
  personaEditandoId.value = null;
};

const guardarEdicion = async (id) => {
  try {
    await update(dbRef(db, `personas/${id}`), personaEditada.value);
    personaEditandoId.value = null;
  } catch (error) {
    console.error("Error al actualizar:", error);
    alert("Error al actualizar el registro");
  }
};

// Función opcional para eliminar
const eliminarPersona = async (id) => {
  if (confirm('¿Estás seguro de eliminar este registro?')) {
    try {
      await remove(dbRef(db, `personas/${id}`));
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  }
};

// Formatear fecha
const formatearFecha = (fechaISO) => {
  return new Date(fechaISO).toLocaleString();
};


</script>

<template>
    <div class="card list-card">
        <div class="header-list">
        <h2>Listado de Personas</h2>
        <span class="badge">{{ personas.length }} registros</span>
    </div>

     <div v-if="personas.length === 0" class="empty-state">
      <div class="icon">📁</div>
      <p>No hay personas registradas aún.</p>
    </div>

    <div class="list-container">
        <div v-for="persona in personas" :key="persona.id" class="persona-item" :class="{ 'editing': personaEditandoId === persona.id }">
        
        <!-- Vista Normal -->
        <template v-if="personaEditandoId !== persona.id">
          <div class="persona-info">
            <p class="nombre">{{ persona.nombre }} {{ persona.apellidos }}</p>
            <p class="detalles">
              <span class="edad">🎂 {{ persona.edad }} años</span> • 
              <span class="fecha">📅 {{ formatearFecha(persona.fechaRegistro) }}</span>
            </p>
          </div>
          <div class="actions">
            <button @click="habilitarEdicion(persona)" class="edit-btn" title="Editar">
              ✏️
            </button>
            <button @click="eliminarPersona(persona.id)" class="delete-btn" title="Eliminar">
              🗑️
            </button>
          </div>
        </template>

        <!-- Vista Edición Inline -->
        <template v-else>
          <div class="edit-form-inline">
            <div class="input-row">
              <input v-model="personaEditada.nombre" placeholder="Nombre" type="text" />
              <input v-model="personaEditada.apellidos" placeholder="Apellidos" type="text" />
            </div>
            <div class="input-row">
              <input v-model.number="personaEditada.edad" placeholder="Edad" type="number" class="small-input" />
              <div class="edit-actions">
                <button @click="guardarEdicion(persona.id)" class="save-btn" title="Guardar">
                  ✅
                </button>
                <button @click="cancelarEdicion" class="cancel-btn" title="Cancelar">
                  ❌
                </button>
              </div>
            </div>
          </div>
        </template>

      </div>

    </div>

    </div>
</template>



<style scoped>
.card {
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 550px;
}

.list-card {
  text-align: left;
}

.header-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.5rem;
}

.badge {
  background: #e2e8f0;
  color: #475569;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.loading-state, .empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  color: #64748b;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.list-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 500px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

/* Custom Scrollbar */
.list-container::-webkit-scrollbar {
  width: 6px;
}
.list-container::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.persona-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
  transition: all 0.2s ease;
}

.persona-item:hover:not(.editing) {
  transform: translateX(4px);
  background: #f1f5f9;
}

.persona-item.editing {
  border-left-color: #10b981;
  background: #ecfdf5;
}

.nombre {
  margin: 0;
  font-weight: 600;
  color: #1e293b;
  font-size: 1.05rem;
}

.detalles {
  margin: 0.25rem 0 0 0;
  font-size: 0.8rem;
  color: #64748b;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.delete-btn, .edit-btn, .save-btn, .cancel-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background 0.2s;
}

.delete-btn { opacity: 0.6; }
.delete-btn:hover { background: #fee2e2; opacity: 1; }

.edit-btn { opacity: 0.6; }
.edit-btn:hover { background: #e0f2fe; opacity: 1; }

.save-btn:hover { background: #d1fae5; }
.cancel-btn:hover { background: #f3f4f6; }

/* Inline Edit Form Styles */
.edit-form-inline {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-row {
  display: flex;
  gap: 0.5rem;
  width: 100%;
}

.input-row input {
  flex: 1;
  padding: 0.4rem;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font-size: 0.9rem;
  background: white;
}

.small-input {
  max-width: 80px;
}

.edit-actions {
  display: flex;
  gap: 0.25rem;
}

.empty-state .icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

@media (prefers-color-scheme: dark) {
  .card { background: #1e293b; }
  h2 { color: #f1f5f9; }
  .nombre { color: #f8fafc; }
  .persona-item { background: #334155; }
  .persona-item:hover:not(.editing) { background: #475569; }
  .persona-item.editing { background: #064e3b; }
  .detalles { color: #94a3b8; }
  .badge { background: #334155; color: #cbd5e1; }
  .input-row input { background: #1e293b; color: white; border-color: #475569; }
}
</style>