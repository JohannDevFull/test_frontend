<template>

    <AppLayout>

        <h3 class="text-gray-700 text-3xl font-medium">Dashboard</h3>

        <UCard class="mt-4">

            <template #header>
                <button @click="openModal()"  class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Crear tarea
                </button>
            </template>
        
            <div class="flex flex-col mt-2">
                <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                        <table class="min-w-full">
                            
                            <thead>
                                <tr>
                                    <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Titulo
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
                                    <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Accciones
                                    </th>
                                </tr>
                            </thead>
        
                            <tbody class="bg-white">

                                <tr v-for=" ( item , i ) in list " :key="i">
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <div class="text-sm leading-5 text-gray-900">{{item.title}}</div>
                                    </td>
                                    
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <div class="text-sm leading-5 text-gray-900">{{item.description}}</div>
                                    </td>
        
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <span v-if="item.status == 1" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Sin empezar
                                        </span>
                                        <span v-if="item.status == 2" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                            En proceso
                                        </span>
                                        <span v-if="item.status == 3" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                            Terminada
                                        </span>
                                    </td>
        
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                        {{item.deadline}}
                                    </td>
        
                                    <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                        <UButton @click="edit( item )" color="blue" variant="solid">Editar</UButton>
                                        <UButton @click="destroy( item.id)" color="red" variant="solid">Eliminar</UButton>
                                    </td>
                                </tr>
                                
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>

            <template #footer>
                
            </template>

        </UCard>


        <UModal v-model="isOpen">
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    {{ type == 1 ? 'Crear tarea' : 'Actualizar tarea' }}
                </template>

                <Formulario :type_action="type" :task_data="task_data" />

                <template #footer>
                    <Placeholder class="h-8" />
                </template>
            </UCard>
        </UModal>
            
        
    </AppLayout>
    

</template>

<script>
  import AppLayout from "../Layout/applayout.vue";
  import Formulario from "../Components/Formulario.vue";
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
      Formulario,
      Swal
    },
    mounted(){
        this.get();
    },
    methods:{
        openModal(){
            this.type = 1;
            this.isOpen = true;
        },
        edit(element){
            this.type = 2;
            this.task_data = Object.assign( {} , element);
            const fecha = new Date(element.deadline);
            const fechaFormateada = fecha.toISOString().slice(0, 16);
            this.task_data.deadline = fechaFormateada;
            this.isOpen = true;
        },
        async destroy( id ) {
            const response = await $fetch('http://127.0.0.1:8000/api/tasks/'+id+'/' , {
                method: 'DELETE',
                headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', },
            });
        },
        async get() {
            const response = await $fetch('http://127.0.0.1:8000/api/tasks/' , {
                method: 'GET',
                headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', },
            });

            this.list = response
        }
    }
  };
</script>