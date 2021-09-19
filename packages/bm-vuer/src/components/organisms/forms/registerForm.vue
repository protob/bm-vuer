<template>
  <div id="registerForm">
    <SchemaFormWithValidation
      :schema="schema"
      @submit="formSubmit"
    >
      <template #afterForm>
        <PrtButton :native-type="'submit'">
          Register
        </PrtButton>
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
import formField from './_internal/formFieldText.vue'

import { useStoreForms } from '@/stores/forms'

const factory = SchemaFormFactory([
  VeeValidatePlugin({}),
], { formField })

export default {
  name: 'RegisterForm',
  components: { SchemaFormWithValidation: factory },
  setup() {
    const storeForms = useStoreForms()
    const schema = {
      name: {
        component: formField,
        label: 'Username',
        validations: 'required',
      },
      email: {
        component: formField,
        label: 'Email',
        validations: 'required',
      },
      password: {
        component: formField,
        label: 'Password',
        validations: 'required',
      },

      confirmPassword: {
        component: formField,
        label: 'Confirm Password',
        validations: 'required',
      },

    }

    const formData = ref({})
    useSchemaForm(formData)

    const formSubmit = async() => {
      // TODO: move api address to .env
      const rawResponse = await fetch('http://localhost:3335/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          // TODO
          email: toRaw(formData.value).email,
          username: toRaw(formData.value).name,
          password: toRaw(formData.value).password,
          confirmPassword: toRaw(formData.value).password,

        }),
      })
      const response = await rawResponse.json()

      const { id, username, token, error } = response
      if (error) {
        alert(JSON.stringify(error)) // TODO
      }
      else {
        // TODO
        alert('TODO')
      }
      storeForms.closeModalAccount()
    }

    return {
      schema,
      formData,
      formSubmit,

    }
  },
}
</script>
<style lang="postcss" scoped>

  .prt-btn {
    --protium-button-margin:1rem 0 0 0;

  }

</style>
