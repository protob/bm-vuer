<template>
  <div class="form-wrap p-4">
    <SchemaFormWithValidation :schema="schema" @submit="submitForm">
      <template #afterForm>
        <div class="pt-4">
          <PrtButton :native-type="'submit'"> Submit </PrtButton>
        </div>
      </template>
    </SchemaFormWithValidation>

    {{ formData }}
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw, toRaw, computed, toRefs, defineEmits } from "vue";
import { SchemaFormFactory, useSchemaForm } from "formvuelate";
import VeeValidatePlugin from "@formvuelate/plugin-vee-validate";

import { useStoreForms } from "@/stores/forms";
import { useStoreTx } from "@/stores/taxonomies";
import useUtils from "@/composables/useUtils";
import formField from "./_internal/formFieldText.vue";

markRaw(formField);
const SchemaFormWithValidation = SchemaFormFactory([VeeValidatePlugin({})], {
  formField,
});
const { slugify } = useUtils();
const storeForms = useStoreForms();
const storeTaxonomies = useStoreTx();

const schema = {
  name: {
    component: formField,
    label: "name",
    validations: "required",
  },
};

//TODO
const success = ref(null);
const formData = ref({});
useSchemaForm(formData);

const modalFormDataTx = toRefs(storeForms.getModalFormDataTx);
const modalFormMetaTx = toRefs(storeForms.getModalFormMetaTx);
const submitForm = async () => {
  const dataObj = {
    id: formData.value.id,
    name: formData.value.name,
  };

  const submitData = {
    dataObj,
    formId: targetTax.value === "cat" ? "catForm" : "tagForm",
    isEditing: modalFormMetaTx.isEditing.value,
  };
  await storeForms.CRUDHandler(submitData);
  storeTaxonomies.getCats();
  storeTaxonomies.getTags();
  storeForms.toggleModal();
};
const submitLabel = computed(() => {
  return modalFormMeta.isEditing ? "Submit" : "Add";
});

const resetData = (forceUpdate = true) => {
  // TODO
  console.log("TODO RESET DATA");
};
// SET DATA
const emit = defineEmits(["updateEditFlag"]);
const { taxId, targetTax } = modalFormMetaTx;

const setData = () => {
  resetData(false);
  if (modalFormMetaTx.isEditing.value) {
    const { name } = modalFormDataTx;
    const formDataObj = {
      id: taxId,
      name,
      slug: slugify(name.value),
    };
    formData.value = formDataObj;
    emit("updateEditFlag", true, targetTax.value);
  } else {
    emit("updateEditFlag", false, targetTax.value);
  }
};
setData();
</script>
