<script setup lang="ts">
import { defineProps } from "vue";
import { Layout, Input, Button } from "ant-design-vue";
import { watch } from "vue";

const props = defineProps<{
  isSelectedIngredients: boolean;
}>();

defineEmits<{
  (e: "onHandleSearch", searchValue: string): void;
  (e: "onHandleIngredients", isSelected: boolean): void;
}>();

const { isSelectedIngredients } = props;

watch(
  () => props.isSelectedIngredients,
  (val) => {
    console.log("Prop changed:", val);
  },
);
</script>

<template>
  <Layout.Header
    :style="{
      padding: '24px',
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
          enter-button="Search"
          size="large"
          @search="(value) => $emit('onHandleSearch', value)"
          :style="{ maxWidth: '400px' }"
        />
      </div>
    </div>
  </Layout.Header>
</template>
