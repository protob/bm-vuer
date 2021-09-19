<template>
  <div id="loginForm">
    <SchemaFormWithValidation :schema="schema" @submit="formSubmit">
      <template #afterForm>
        <div class="flex justify-between pt-8">
          <PrtButton :native-type="'submit'">
            Login
          </PrtButton>
          <PrtButton :native-type="'button'" @click="cancel">
            Cancel
          </PrtButton>
        </div>
      </template>
    </SchemaFormWithValidation>

    <div class="text-black">
      {{ formData }}
    </div>
  </div>
</template>

<script lang="ts">
import { ref, toRaw } from 'vue'

import { SchemaFormFactory, useSchemaForm } from 'formvuelate'
import VeeValidatePlugin from '@formvuelate/plugin-vee-validate'

import { useRouter } from 'vue-router'
import { defineRule } from 'vee-validate'
import formField from './_internal/formFieldText.vue'
import { useStoreForms } from '@/stores/forms'

const factory = SchemaFormFactory(
  [VeeValidatePlugin({ })],
  { formField },
)

defineRule('required', (value) => {
  if (!value || !value.length) return 'This field is required'
  return true
})

export default {
  name: 'LoginForm',
  components: { SchemaFormWithValidation: factory },
  setup() {
    const router = useRouter()

    const storeForms = useStoreForms()
    const schema = {

      email: {
        component: formField,
        label: 'email',
        validations: 'required',
      },
      password: {
        component: formField,
        label: 'password',
        validations: 'required',
      },
    }

    const formData = ref({})
    useSchemaForm(formData)
    const cancel = () => { // TODO
    }
    const formSubmit = async() => {
      // TODO : move api address to .env
      const rawResponse = await fetch('http://localhost:3335/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          username: toRaw(formData.value).email,
          password: toRaw(formData.value).password,
        }),
      })
      const response = await rawResponse.json()
      const { id, username, token, error } = response

      if (error) {
        alert(JSON.stringify(error)) // TODO
      }
      else {
        localStorage.authToken = token
        localStorage.userId = id
        localStorage.userName = name
        router.push({ path: '/collection' })
      }
      storeForms.closeModalAccount()
    }

    return {
      cancel,
      schema,
      formData,
      formSubmit,

    }
  },
}
</script>
