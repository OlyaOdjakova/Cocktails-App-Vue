<script lang="ts" setup>
import { h, onMounted, ref } from "vue";
import { Cocktail } from "@/components/Cocktails/cocktails.types";
import { getIngredientsWithMeasures } from "@/components/Cocktails/cocktails.utils";
import { fetchCocktails } from "@/components/Cocktails/cocktails.api";
import { COCKTAILS_LIST } from "@/components/Cocktails/cocktails.constants";
import CocktailsHeader from "@/components/Cocktails/CocktailsHeader/CocktailsHeader.vue";
import Ingredients from "@/components/Cocktails/Ingredients/Ingredients.vue";

import {
  Button,
  Card,
  Col,
  Divider,
  Layout,
  List,
  Row,
  Spin,
  Typography,
} from "ant-design-vue";

const cocktails = ref<Cocktail[]>([]);
const isLoading = ref(false);
const isSelectedIngredients = ref(false);

const onHandleIngredients = (isSelected: boolean) => {
  isSelectedIngredients.value = isSelected;
};

const onHandleSearch = async (searchValue: string) => {
  const searchTerm = searchValue.trim().toLowerCase();

  const filtered = cocktails.value.filter((cocktail) =>
    cocktail.strDrink.toLowerCase().includes(searchTerm),
  );
  cocktails.value = filtered;
};

const fetchRandomCocktails = async () => {
  try {
    isLoading.value = true;
    const fetchRandomCocktails = Array.from({ length: 10 }, () =>
      fetch(COCKTAILS_LIST).then(async (res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        return data.drinks?.[0] as Cocktail;
      }),
    );

    cocktails.value = await Promise.all(fetchRandomCocktails);
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    console.error("Fetch failed:", error);
  }
};

onMounted(async () => {
  isLoading.value = true;
  cocktails.value = await fetchCocktails();
  isLoading.value = false;
});
</script>

<template>
  <div>
    <CocktailsHeader
      :isSelectedIngredients="isSelectedIngredients"
      v-on:onHandleSearch="onHandleSearch"
      v-on:onHandleIngredients="onHandleIngredients"
    />

    <Layout.Content
      style="padding: 24px; background-color: #001529; min-height: 100vh"
    >
      <Row
        justify="center"
        style="padding: 40px 0 10px; margin-bottom: 4rem; text-align: center"
      >
        <div>
          <Typography.Title
            :level="2"
            style="
              letter-spacing: 5px;
              margin-top: 5rem;
              margin-bottom: 8px;
              color: white;
            "
          >
            <span v-if="!isSelectedIngredients">LIST OF COCKTAILS</span>
            <span v-if="isSelectedIngredients">LIST OF INGREDIENTS</span>
          </Typography.Title>
          <Divider
            style="
              background-color: #e6007e;
              height: 4px;
              margin: 0 auto;
              width: 20px;
            "
          />
        </div>
      </Row>

      <Ingredients v-if="isSelectedIngredients" />

      <Row v-else :gutter="[16, 16]" justify="center" style="gap: 2rem">
        <Spin v-if="isLoading" size="large" style="transform: scale(2)" />
        <div
          v-else-if="cocktails.length === 0 && !isLoading"
          style="
            text-align: center;
            margin-top: 50px;
            font-size: 18px;
            color: white;
          "
        >
          No cocktails found.
        </div>
        <Col
          v-for="cocktail in cocktails"
          :key="cocktail.idDrink"
          :xs="22"
          :sm="12"
          :md="8"
          :lg="5"
        >
          <Card
            :isLoading="isLoading"
            :cover="
              h('img', { alt: cocktail.strDrink, src: cocktail.strDrinkThumb })
            "
            style="
              box-shadow: 0 4px 16px rgba(211, 211, 211, 0.6);
              background-color: #f8f8f8;
            "
          >
            <Typography.Title :level="4" style="margin-bottom: 12px">{{
              cocktail.strDrink
            }}</Typography.Title>

            <Typography.Paragraph style="font-size: 0.9rem; display: inline">
              <strong>Measures:</strong>
            </Typography.Paragraph>
            <List
              size="small"
              :data-source="getIngredientsWithMeasures(cocktail)"
              :renderItem="
                ({ item, index }) =>
                  h('a-list-item', { key: index }, [
                    item,
                    index < getIngredientsWithMeasures(cocktail).length - 1
                      ? h('span', ', ')
                      : null,
                  ])
              "
              style="margin-bottom: 12px"
            />
            <Typography.Paragraph style="font-size: 0.9rem">
              <strong>How to make:</strong> {{ cocktail.strInstructions }}
            </Typography.Paragraph>
            <Typography.Paragraph style="font-size: 0.9rem">
              <strong>Glass type:</strong> {{ cocktail.strGlass }}
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>

      <template v-if="!isSelectedIngredients">
        <Row
          justify="center"
          style="padding: 40px 0 10px; margin-bottom: 4rem; text-align: center"
        >
          <Button type="primary" size="large" @click="fetchRandomCocktails">
            🍹 LOAD NEW COCKTAILS
          </Button>
        </Row>
      </template>
    </Layout.Content>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
}
</style>
