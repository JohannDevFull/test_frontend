<template>
  
  <div x-data="{ sidebarOpen: false }" class="flex h-screen bg-gray-200 font-roboto">
    
    <Sidebar ref="miHijoComponente" />
    
    <div class="flex-1 flex flex-col overflow-hidden">

      <NavBar @some-event="ejecutarEventoEnHijo" />

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container mx-auto px-6 py-8">
          <slot></slot>
        </div>
      </main>

    </div>
  </div>
  
</template>
  
<script>
  import Sidebar from "./Components/Sidebar";
  import NavBar from "./Components/Navbar";
  import Footer from "./Components/Footer";

  export default {
    components: {
      NavBar,
      Footer,
      Sidebar
    },
    methods: {
      ejecutarEventoEnHijo()
      {

        this.$refs.miHijoComponente.abrir();
        
      },
    },

  };
</script>