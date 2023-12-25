<template>
  <AppLayout>

    <template #breadcrumb>
      Productos
    </template>

    <UCard >

      <template #header>
        <button @click="openModal()"  class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Crear producto                
        </button>
      </template>

      <div class="bg-gray-800 flex flex-col mt-2">
        <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <table class="min-w-full">
                
              <thead>
                  <tr>
                      <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          Titulo
                      </th>
                      <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          Precio
                      </th>
                      <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          Descripción
                      </th>
                      <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          Estado
                      </th>
                      <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          Fecha limite
                      </th>
                      <th style="text-align: center;" class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          Accciones
                      </th>
                  </tr>
              </thead>

              <tbody class="bg-gray-800 ">

                  <tr v-for=" ( item , i ) in list " :key="i">

                      <td class="px-5 py-5 border-b border-gray-200  text-sm">
                        <div class="flex items-center">
                          <div class="flex-shrink-0 w-10 h-10">
                            <img v-if=" item.url_img == '' " class="w-full h-full rounded-full" src="http://localhost:3000/img/default-150.png" alt="" />
                            <img v-else class="w-full h-full rounded-full" :src="'http://127.0.0.1:8000/'+item.url_img" alt="" />
                          </div>
                          <div class="ml-3">
                              <p class=" whitespace-no-wrap ">{{item.name}}</p>
                          </div>
                        </div>
                      </td>
                      
                      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div class="text-sm leading-5 ">{{item.price}}</div>
                      </td>

                      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div class="text-sm leading-5 ">{{item.description}}</div>
                      </td>

                      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <span v-if="item.is_active == 1" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                          </span>
                          <span v-else class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Inactivo
                          </span>
                      </td>

                      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                          {{item.created_at}}
                      </td>

                      <td style="text-align: center;" class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                          <UButton @click="edit( item )" color="blue" variant="solid" :ui="{ paddingRight: '5px' }">Editar</UButton>
                          <span class="pr-2"></span>
                          <UButton @click="destroyModal( item.id)" color="red" variant="solid">Eliminar</UButton>
                      </td>
                  </tr>
                  
              </tbody>

            </table>
          </div>
        </div>
      </div>

      <template #footer>

        <div class="bg-gray-800 flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
          <div class="flex flex-1 justify-between sm:hidden">
            <a href="#" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
            <a href="#" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
          </div>
          <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">1</span>
                to
                <span class="font-medium">10</span>
                of
                <span class="font-medium">97</span>
                results
              </p>
            </div>
            <div>
              <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <a href="#" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                  <span class="sr-only">Previous</span>
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                  </svg>
                </a>
                <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
                <a href="#" aria-current="page" class="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">1</a>
                <a href="#" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">2</a>
                <a href="#" class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">3</a>
                <span class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
                <a href="#" class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">8</a>
                <a href="#" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">9</a>
                <a href="#" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">10</a>
                <a href="#" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                  <span class="sr-only">Next</span>
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>

      </template>

    </UCard>

    <UModal v-model="isOpen" width="sm:max-w-lx" :ui="{width: 'w-full sm:max-w-screen-sm'}">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
            {{ type == 1 ? 'Crear tarea' : 'Actualizar tarea' }}
        </template>

        <ProductForm :action="type" :el="task_data" @update:data=" get() ,test() " />

        <template #footer>
            <Placeholder class="h-8" />
        </template>
      </UCard>
    </UModal>

  </AppLayout>
</template>

<script>

  import AppLayout from "../Layout/TailwindLayout.vue";
  import ProductForm from "../Components/ProductForm.vue";

  import Swal from 'sweetalert2/dist/sweetalert2.js'
  import 'sweetalert2/dist/sweetalert2.min.css'

  export default {
    data(){
      return {
        isOpen:false,
        type:1,

        task_data:{
            id: 0,
            title: '', 
            description: '',
            deadline: '',
            status: 1,
            user_id: 1,
            created_at: ''
        },
        list:[]
      }
    },
    components: {
      AppLayout,
      ProductForm,
      Swal
    },
    mounted(){
      this.get()
    },
    methods:{

      openModal(){
        this.type = 1;
        this.isOpen = true;
      },
      edit(element){
        this.type = 2;
        this.task_data = Object.assign( {} , element);
        const fecha = new Date(element.created_at);
        const fechaFormateada = fecha.toISOString().slice(0, 16);
        this.task_data.created_at = fechaFormateada;
        this.isOpen = true;
      },
      destroyModal( id ) {

        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed)
          {
            this.destroy(id)
          }
        });
        
      },
      async destroy( id ) {
        
        const { error , status } = await useFetch('http://127.0.0.1:8000/products/'+id+'/' , {
          method: 'DELETE',
          headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', },
        });

        console.log( 'ERROR:::' , error )
        console.log( 'STATUS:::' , status )
        
        if ( status.value == 'error')
        {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
          this.errors = error.value.data
        }

        if ( status.value == 'success')
        {
          Swal.fire({
            title: "Borrado!",
            text: "Resurso borrado correctamente.",
            icon: "success"
          });
          this.get();
        }

      },
      async get() {
        const response = await $fetch('http://127.0.0.1:8000/products/' , {
          method: 'GET',
          headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', },
        });

        this.list = response
      },
      test(){
        this.isOpen = false
      }
      
    }
  };

</script>