

<template>
  <UForm :task="task" class="space-y-4" @submit="onSubmit">

    <UFormGroup label="Titulo" name="title">
      <UInput v-model="task.title" />
    </UFormGroup>

    <UFormGroup label="Fecha limite" name="deadline">
      <UInput type="datetime-local" v-model="task.deadline" />
    </UFormGroup>

    <UFormGroup name="status" label="Estado">
      <USelect v-model="task.status" :options="states" option-attribute="name"  />
    </UFormGroup>

    <UFormGroup name="description" label="Descripción">
      <UTextarea v-model="task.description" />
    </UFormGroup>

    <UButton type="submit">
      Guardar
    </UButton>

  </UForm>
</template>


<script setup lang="ts">

  import type { FormError, FormSubmitEvent } from '#ui/types'
  import { ref, onMounted } from 'vue'

  import Swal from 'sweetalert2/dist/sweetalert2.js'
  import 'sweetalert2/dist/sweetalert2.min.css'
  
  const props = defineProps([ 'type_action' , 'task_data' ]);

  const states = [{
      name: 'Seleccionar una opcion',
      value: '0',
      disabled: true
    },
    {
      name: 'Sin empezar',
      value: '1'
    }, {
      name: 'En proceso',
      value: '2',
      
    },{
      name: 'Terminada',
      value: '3'
  }]

  const task = ref({
    title: '',
    description: '',
    deadline: '',
    status:'',
    user_id:1
  });

  const title = ref('Tarea');

  onMounted(() => {
    if ( props.type_action == 2 )
    {
      task.value = props.task_data
    }
  })

  // const validate = (task: any): FormError[] => {
  //   const errors = []
  //   if (!task.title) errors.push({ path: 'title', message: 'Required' })
  //   if (!task.description) errors.push({ path: 'description', message: 'Required' })
  //   if (!task.deadline) errors.push({ path: 'deadline', message: 'Required' })
  //   if (!task.status) errors.push({ path: 'status', message: 'Required' })
  //   return errors
  // }

  async function onSubmit (event: FormSubmitEvent<any>) {

    if (  props.type_action == 1 ) {
      store(event);
    } else {
      update(event);
    }
  }

  async function store (event: FormSubmitEvent<any>) {
    const response = await $fetch('http://127.0.0.1:8000/api/tasks/', {
      method: 'POST',
      headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', },
      body:task.value
    });

    Swal.fire({
      title: 'OK!',
      text: 'Recurso creado.',
      icon: 'success',
      confirmButtonText: 'Bueno'
    });
  }

  async function update (event: FormSubmitEvent<any>) {
    const response = await $fetch('http://127.0.0.1:8000/api/tasks/'+props.task_data.id+'/' , {
      method: 'PUT',
      headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', },
      body: task.value
    });
    Swal.fire({
      title: 'OK!',
      text: 'Recurso actualizado.',
      icon: 'success',
      confirmButtonText: 'Bueno'
    });
  }

</script>