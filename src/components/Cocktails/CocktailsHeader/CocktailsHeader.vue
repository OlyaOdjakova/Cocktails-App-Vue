<script setup lang="ts">
import { defineProps } from "vue";
import Header from "ant-design-vue";
import Search from "ant-design-vue";

const props = defineProps<{
  selectedIngredients: boolean;
}>();

const { selectedIngredients } = props;
</script>

<template>
  <Header
    :style="{
      background: '',
      padding: '0 24px',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
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
        }"
      >
        <div
          :style="{ marginLeft: '20px', cursor: 'pointer', gap: '2rem' }"
          @click="$emit('onHandleSearch', false)"
        >
          Cocktails
        </div>
        <div
          :style="{ marginLeft: '20px', cursor: 'pointer' }"
          @click="$emit('onHandleIngredients', true)"
        >
          Ingredients
        </div>
      </div>

      <Search
        v-if="!selectedIngredients"
        placeholder="Search by name"
        allow-clear
        enter-button="Search"
        size="large"
        @search="$emit('onHandleSearch')"
        :style="{ maxWidth: '400px' }"
      />
    </div>
  </Header>
</template>
