# Reto Técnico: Panel de Gestión de Proyectos de Innovación (CRUD Realtime)

## 🎯 Objetivo
Desarrollar una aplicación con **Vue 3**, **Vue Router** y **Firebase Realtime Database** que permita gestionar un catálogo de proyectos tecnológicos. El sistema debe permitir la lectura global pero restringir la edición y eliminación a los creadores de cada registro.

**Tiempo límite:** 60 minutos.

---

## 🏗️ Requerimientos Técnicos
- **Framework:** Vue 3 (Vite).
- **Enrutamiento:** Vue Router.
- **Backend:** Firebase Realtime Database.
- **Estilos:** Libre (puedes usar CSS puro, Tailwind o Bootstrap).

---

## 📋 Contexto del Dominio
Cada registro en la base de datos representará un "Proyecto de Innovación" con la siguiente estructura:
- `nombreProyecto`: (Texto)
- `descripcion`: (Texto)
- `tecnologia`: (Ej: Vue, React, IA, etc.)
- `estudiante`: (Texto - **Usa tu nombre completo o alias único**). Este campo es vital para la lógica de permisos.

---

## 🚀 Tareas a Realizar

### 1. Configuración de Rutas
Debes configurar `vue-router` para manejar tres vistas principales:
- `Home.vue` (en `/`): Donde se listarán todos los proyectos.
- `Registro.vue` (en `/nuevo`): Formulario para dar de alta un proyecto.
- `Edicion.vue` (en `/editar/:id`): Formulario para modificar un proyecto existente.

### 2. Conexión a Firebase
Utiliza el siguiente objeto de configuración para conectar tu aplicación con la base de datos de la clase. Configura el SDK de Firebase para que el servicio de **Realtime Database** esté disponible en toda tu App.

```javascript
// Configuración de Firebase para el ejercicio
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "--la dare en clases--",
  authDomain: "clase-vue-project.firebaseapp.com",
  databaseURL: "https://clase-vue-project-default-rtdb.firebaseio.com",
  projectId: "clase-vue-project",
  storageBucket: "clase-vue-project.firebasestorage.app",
  messagingSenderId: "1076862482191",
  appId: "1:1076862482191:web:4d7ca195224f59ecd9b07a"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Realtime Database y exportar la instancia
export const db = getDatabase(app);
```

### 3. Implementación del CRUD

#### A. Listado en Tiempo Real (Lectura)
En la vista principal, implementa un listener de Firebase que:
- Recupere todos los proyectos de la colección.
- Actualice la interfaz automáticamente cada vez que un compañero agregue o modifique un dato (sin recargar la página).
- Muestre los botones de "Editar" y "Eliminar" en cada tarjeta o fila.

#### B. Registro de Proyectos (Escritura)
En la vista de registro:
- Implementa un formulario vinculado a un objeto reactivo.
- Al guardar, envía los datos a Firebase y redirige al usuario al inicio automáticamente al finalizar con éxito.

#### C. Lógica de "Propiedad" (Update y Delete)
Esta es la parte más importante del ejercicio:
- **Validación:** Al intentar editar o eliminar, el código debe comparar el campo `estudiante` del registro con tu nombre/alias.
- **Acción:** Si el nombre coincide, permite realizar la operación en la base de datos.
- **Restricción:** Si el nombre **no coincide**, muestra una alerta al usuario indicando que "No tiene permisos para modificar este proyecto" y aborta la operación.

---

## 🛡️ Criterios de Evaluación
1. **Reactividad:** ¿Los datos se actualizan en vivo cuando otros alumnos insertan registros?
2. **Navegación:** ¿El cambio entre vistas es fluido y usa parámetros de ruta (`:id`) correctamente?
3. **Seguridad Lógica:** ¿Se impide efectivamente que un alumno borre el trabajo de otro mediante la validación del campo `estudiante`?
4. **Manejo de Estados:** ¿La aplicación informa cuando los datos se están cargando o cuando una operación fue exitosa?

---
*¡El éxito depende de tu capacidad para conectar la reactividad de Vue con los eventos de Firebase! Comienza ahora.*
