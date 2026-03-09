<script setup>
import PersonaForm from './components/PersonaForm.vue';
import PersonaList from './components/PersonaList.vue';


</script>

<template>
  <div class="app-container">
    <header>
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      <h1>Firebase + Vue 3</h1>
    </header>
     <main class="main-content">
       <PersonaForm/>
      <PersonaList/>
     </main>
  </div>
</template>

<style>
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light dark;
  color: #213547;
  background-color: #f8fafc;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

#app {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}

.app-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  margin-bottom: 3rem;
}

.main-content {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: flex-start;
}

.logo {
  height: 2em;
  padding: 0.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

h1 {
  font-size: 2.5rem;
  color: #1e293b;
  margin-top: 1rem;
}

footer {
  margin-top: 4rem;
  color: #94a3b8;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
    align-items: center;
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    color: #f1f5f9;
    background-color: #0f172a;
  }
  h1 {
    color: #f8fafc;
  }
}
</style>
