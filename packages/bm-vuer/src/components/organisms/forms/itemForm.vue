<template>
  <div class="form-wrap p-4">
    <SchemaFormWithValidation :schema="schema" @submit="submitForm">
      <template #afterForm>
        <div class="pt-4">
          <PrtButton :native-type="'submit'">
            {{ submitLabel }}
          </PrtButton>
        </div>
      </template>
    </SchemaFormWithValidation>
    {{ formData }} 
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw, toRaw, computed, toRefs, defineEmits } from "vue";

// FORMS
import { SchemaFormFactory, useSchemaForm } from "formvuelate";
import VeeValidatePlugin from "@formvuelate/plugin-vee-validate";

import { useStoreForms } from "@/stores/forms";
import useUtils from "@/composables/useUtils";
import { useStoreItems } from "@/stores/items";
import formField from "./_internal/formFieldText.vue";

const itemsDB = useStoreItems();

markRaw(formField);

const schema = {
  name: {
    component: formField,
    label: "name",
    validations: "required",
  },
  url: {
    component: formField,
    label: "url",
    validations: "required",
  },

  desc: {
    component: formField,
    label: "desc",
    rules: "required",
  },

  tags: {
    component: formField,
    label: "tags",
    rules: "",
  },
};
// Declare FormText and FormSelect as local components
const SchemaFormWithValidation = SchemaFormFactory([VeeValidatePlugin({})], {
  formField,
});

// COMPOSABLES
const { slugify, genUuidv4 } = useUtils();
const storeForms = useStoreForms();

// REFS
const formData = ref({
  name: "",
  url: "",
  tags: "",
  desc: "",
  id: "",
  cat_id: "",
});

const success = ref(null);

useSchemaForm(formData);

const modalFormData = toRefs(storeForms.getModalFormData);
const modalFormMeta = toRefs(storeForms.getModalFormMeta);
const submitLabel = computed(() => {
  return modalFormMeta.isEditing ? "Submit" : "Add";
});

// METHODS
const resetData = (forceUpdate = true) => {
  // TODO
  console.log("TODO RESET DATA");
};
const emit = defineEmits(["updateEditFlag"]);
const setData = () => {
  resetData(false);
  const { id, cat_id } = modalFormMeta;
  if (modalFormMeta.isEditing.value) {
    const { name, slug, url, tags, desc } = modalFormData;
    const formDataObj = {
      id: id.value,
      cat_id: cat_id.value,
      // taxName,
      name,
      slug,
      url,
      tags:
        tags.value.length > 0
          ? toRaw(tags.value)
              .map((item) => item.tag.name)
              .join(",") // make sting from array
          : "",
      desc,
    };
    formData.value = formDataObj;
    emit("updateEditFlag", true, "item");
  } else {
    formData.value.cat_id = cat_id;
    emit("updateEditFlag", false, "item");
  }
};
setData();

const submitForm = async () => {
  const { id, name, url, desc, tags, cat_id } = formData.value;
  const itemUuidVal = modalFormMeta.isEditing.value ? id : genUuidv4();
  const dataObj = {
    id: itemUuidVal,
    cat_id,
    name,
    slug: slugify(name),
    url,
    desc,
    tags,
  };
  const submitData = {
    dataObj,
    formId: "itemForm",
    isEditing: modalFormMeta.isEditing.value === true,
  };
  await storeForms.CRUDHandler(submitData);
  setTimeout(() => {
    itemsDB.getItems();
  }, 3000);
  storeForms.toggleModal();
  resetData();
  success.value = true;
};
</script>
