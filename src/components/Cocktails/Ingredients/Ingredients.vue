<script setup>
import { onMounted, ref } from "vue";
import { Card, Col, Row, Typography } from "ant-design-vue";

const ingredients = ref([]);
const loading = ref(false);

const fetchRandomIngredients = async () => {
  try {
    loading.value = true;
    const res = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin",
    );
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    loading.value = false;
    return data?.drinks || [];
  } catch (error) {
    console.error("Fetch failed:", error);
    loading.value = false;
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
    <Typography.Title :level="4" style="color: white">Gin</Typography.Title>
    <Row
      :gutter="[24, 24]"
      style="margin-top: 10rem; overflow-x: hidden"
      justify="center"
    >
      <Col
        v-for="ingredient in ingredients.slice(0, 15)"
        :key="ingredient.idDrink"
        :xs="12"
        :sm="6"
        :md="4"
        :lg="3"
      >
        <Card
          :loading="loading"
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
