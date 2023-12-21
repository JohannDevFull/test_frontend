
<template>
  <AppLayout>

    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold text-gray-800">Lista de tareas</h2>
        <button @click="abrirModal()"  class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Crear tarea
        </button>
      </template>

      <Tareas/>

      <template #footer>
        <Placeholder class="h-8" />
      </template>
    </UCard>

    <UModal v-model="isOpen">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <Placeholder class="h-8" />
        </template>

        <Formulario/>

        <template #footer>
          <Placeholder class="h-8" />
        </template>
      </UCard>
    </UModal>

  </AppLayout>
  
</template>


<script>
  import AppLayout from "./Layout/AppLayout";
  import Tareas from "./Components/Tareas";
  import Formulario from "./Components/Formulario";
  export default {
    components: {
      AppLayout,
      Tareas,
      Formulario
    },
    data() {
      return {
        isOpen: false,
        nuevaTarea: {
          nombre: '',
          descripcion: ''
        }
      };
    },
    methods: {
      abrirModal() {
        this.isOpen = true;
      },
      cerrarModal() {
        this.mostrarModal = false;
        this.resetearFormulario();
      },
      resetearFormulario() {
        this.nuevaTarea = { nombre: '', descripcion: '' };
      },
      agregarTarea() {
        this.$emit('agregar', this.nuevaTarea);
        this.cerrarModal();
      }
    }
  };
</script>