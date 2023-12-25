<template>

<div class="max-w-sm w-full lg:max-w-full rounded overflow-hidden shadow-lg">

  <div class="flex justify-center"> 
    
    <img 
      v-if="!imageUrl" 
      class="w-32" 
      :src="img_item" 
      @click="$refs.fileInput.click()"
      alt="Sunset in the mountains"
    >
    <img 
      v-else 
      class="w-32" 
      :src="imageUrl" 
      @click="$refs.fileInput.click()"
      alt="Sunset in the mountains"
    >
    <input
      type="file"
      class="hidden"
      @change="onFileChange"
      ref="fileInput"
    />

  </div>

  <div class="px-6 py-4">

    <form class="w-full max-w-lg" @submit.prevent="onSubmit">

      <div class="flex flex-wrap -mx-3 mb-1">

        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
            Nombre
          </label>
          <input v-model="element.name" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="name" type="text" placeholder="Nombre">
          <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
        </div>

        <div class="w-full md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
            Precio
          </label>
          <input v-model="element.price" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="price" type="text" placeholder="Precio">
        </div>

      </div>

      <div class="flex flex-wrap -mx-3 mb-1">

        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0" v-if=" element.is_active !== '' ">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
            Estado
          </label>
          <select v-model="element.is_active" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500">
            <option value="" disabled>Seleccionar una opción</option>
            <option :value="true">Activo</option>
            <option :value="false">Inactivo</option>
          </select>
          <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
        </div>

      </div>

      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            Descripción
          </label>
          <textarea
            v-model="element.description"
            class="resize-none border rounded-md w-full p-1 focus:outline-none focus:ring focus:border-blue-500"
            rows="2"
            placeholder="Escribe una descripción aquí..."
          ></textarea>
          <!-- <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> -->
        </div>
      </div>

      <UButton type="submit" v-if=" action == 1" :loading="loading">
        Crear
      </UButton>
      <UButton type="submit" v-if=" action == 2" :loading="loading">
        Actualizar
      </UButton>
      
      <!-- <button v-if=" action == 1" class="bg-blue-300 hover:bg-blue-400 text-blue-800 font-bold py-2 px-4 rounded inline-flex items-center">
        <div class="spinner" v-if="loading"></div>
      </button> -->
      <!-- <button v-if=" action == 2" class="bg-orange-300 hover:bg-orange-400 text-orange-800 font-bold py-2 px-4 rounded inline-flex items-center">
        <div class="spinner" v-if="loading"></div>
      </button> -->

    </form>

  </div>

</div>
  

</template>

<style>
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border-left-color: #09f;
  margin-right: 5px;
  animation: spin 1s ease infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

<script >

  import Swal from 'sweetalert2/dist/sweetalert2.js'
  import 'sweetalert2/dist/sweetalert2.min.css'

  export default {
    
    props:[ 'action' , 'el' ],
    components:{
      Swal,
    },
    data() {
      return {

        title:'Test',

        element: {
          name: '',
          price: '',
          description: '',
          is_active:''
        },

        img_item:'http://localhost:3000/img/default-150.png',
        selectedFile: '',
        imageUrl:'',

        loading:false,
        errors:[],

        test:[]
      };
    },
    mounted(){
      if ( this.action == 2 )
      {
        this.element = this.el
        if ( this.el.url_img != '') {
          
          this.img_item = 'http://127.0.0.1:8000/' + this.el.url_img
        } else {
          
          this.img_item = 'http://localhost:3000/img/default-150.png'
        }
      }else{

        this.element.is_active = ''
        this.img_item = 'http://localhost:3000/img/default-150.png'
      }
    },
    methods: {

      async onSubmit () {
        if (  this.action == 1 ) {
          this.store();
        } else {
          this.update();

        }
      },

      async store () {

        this.loading = true;
        const formData = new FormData();

        if (this.selectedFile)
        {
          formData.append('image', this.selectedFile);
        }else{
          formData.append('image', '');
        }
        formData.append('name', this.element.name);
        formData.append('price', this.element.price);
        formData.append('description', this.element.description);

        try {
          
          const response = await $fetch('http://127.0.0.1:8000/products/', {
            method: 'POST',
            headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', },
            body:formData
          });
        } catch (error) {
          console.error('Error al subir la imagen:', error);
        }

        setTimeout(() => {
          this.loading = false;
        }, 3333);

        this.$emit('update:data');

        Swal.fire({
          title: 'OK!',
          text: 'Recurso creado.',
          icon: 'success',
          confirmButtonText: 'Bueno'
        });

      },

      async update () {

        this.loading = true;
        const formData = new FormData();

        if (this.selectedFile)
        {
          formData.append('image', this.selectedFile);
        }else{
          formData.append('image', '');
          formData.append('path_img', this.element.path_img);
          formData.append('url_img', this.element.url_img);
        }
        formData.append('name', this.element.name);
        formData.append('price', this.element.price);
        formData.append('description', this.element.description);
        formData.append('is_active', this.element.is_active);
        
        const { error , status } = await useFetch('http://127.0.0.1:8000/products/'+this.element.id+'/' , {
          method: 'PUT',
          headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', },
          body: formData
        });

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
            icon: "success",
            title: "Ok",
            text: "Iniciado sesión...",
          });
          this.$emit('update:data')
          this.loading = false;
        }
        
      },

      onFileChange(event) {

        const file = event.target.files[0];

        if (file)
        {

          const reader = new FileReader();

          reader.onload = (e) => {
            this.imageUrl = e.target.result;
          };

          reader.readAsDataURL(file);

          this.selectedFile = event.target.files[0];
        } else {
          this.imageUrl = '';
        }

        

      },


    }

  };
</script>