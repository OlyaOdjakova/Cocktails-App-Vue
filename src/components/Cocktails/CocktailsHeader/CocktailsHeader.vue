<script setup lang="ts">
import { computed, defineProps } from "vue";
import { Layout, Input, Button } from "ant-design-vue";

const props = defineProps<{
  isSelectedIngredients: boolean;
}>();

defineEmits<{
  (e: "onHandleSearch", searchValue: string): void;
  (e: "onHandleIngredients", isSelected: boolean): void;
  (e: "onHandleIngredientsSearch", searchValue: string): void;
}>();

const isSelectedIngredients = computed(() => props.isSelectedIngredients);
</script>

<template>
  <Layout.Header
    :style="{
      padding: '20px',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: '#001529',
    }"
  >
    <div
      :style="{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }"
    >
      <div
        :style="{
          color: 'white',
          fontSize: '20px',
          cursor: 'pointer',
          display: 'flex',
          gap: '2rem',
        }"
      >
        <Button
          :style="{
            fontSize: '22px',
            background: 'transparent',
            border: 'none',
            color: 'white',
            paddingBottom: '1rem',
            borderBottom: !isSelectedIngredients ? '2px solid #e6007e' : 'none',
          }"
          @click="$emit('onHandleIngredients', false)"
        >
          Cocktails
        </Button>

        <Button
          id="ingredients-button"
          :style="{
            fontSize: '22px',
            background: 'transparent',
            border: 'none',
            color: 'white',
            borderBottom: isSelectedIngredients ? '2px solid #e6007e' : 'none',
          }"
          @click="$emit('onHandleIngredients', true)"
        >
          Ingredients
        </Button>
      </div>

      <div v-if="!isSelectedIngredients">
        <Input.Search
          placeholder="Search by name"
          allow-clear
          size="large"
          @search="(value) => $emit('onHandleSearch', value)"
        />
      </div>
    </div>
  </Layout.Header>
</template>
