<script setup>
import { onMounted, ref } from "vue";
import { Card, Col, Row, Typography } from "ant-design-vue";
import { INGREDIENTS } from "@/components/Cocktails/cocktails.constants.js";

const ingredients = ref([]);
const isLoading = ref(false);

const fetchRandomIngredients = async () => {
  try {
    isLoading.value = true;
    const response = await fetch(INGREDIENTS);
    const data = await response.json();
    isLoading.value = false;
    return data?.drinks || [];
  } catch (error) {
    console.error("Fetch failed:", error);
    isLoading.value = false;
    return [];
  }
};

const getIngredients = async () => {
  try {
    ingredients.value = await fetchRandomIngredients();
  } catch (error) {
    console.error("Failed to fetch ingredients:", error);
    ingredients.value = [];
  }
};

onMounted(() => {
  getIngredients();
});
</script>

<template>
  <div>
    <Row
      :gutter="[22, 22]"
      style="overflow-x: hidden; gap: 2rem"
      justify="center"
    >
      <Col
        v-for="ingredient in ingredients.slice(0, 7)"
        :key="ingredient.idDrink"
        :xs="22"
        :sm="12"
        :md="8"
        :lg="5"
      >
        <Card
          :loading="isLoading"
          style="
            box-shadow: 0 4px 16px rgba(211, 211, 211, 0.6);
            background-color: #f8f8f8;
          "
        >
          <template #cover>
            <img
              :alt="ingredient.strDrinkThumb"
              :src="ingredient.strDrinkThumb"
              style="width: 100%; object-fit: cover"
            />
          </template>
          <Typography.Title :level="4" style="margin-bottom: 12px">
            {{ ingredient.strDrink }}
          </Typography.Title>
        </Card>
      </Col>
    </Row>
  </div>
</template>
