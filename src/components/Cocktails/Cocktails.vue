<script lang="ts" setup>
import { ref, onMounted, h } from "vue";
import { Cocktail } from "@/components/Cocktails/cocktails.types";
import { getIngredientsWithMeasures } from "@/components/Cocktails/cocktails.utils";
import { fetchCocktails } from "@/components/Cocktails/cocktails.api";
import { COCKTAILS_LIST } from "@/components/Cocktails/cocktails.constants";
import CocktailsHeader from "@/components/Cocktails/CocktailsHeader/CocktailsHeader.vue";
import Ingredients from "@/components/Cocktails/Ingredients/Ingredients.vue";

import {
  Row,
  Col,
  Card,
  Typography,
  Spin,
  Layout,
  Divider,
  List,
  Button,
} from "ant-design-vue";

const cocktails = ref<Cocktail[]>([]);
const loading = ref(false);

const selectedIngredients = ref(false);

const onHandleIngredients = (value: boolean) => {
  selectedIngredients.value = value;
};

const onHandleSearch = async (searchValue: string) => {
  const searchTerm = searchValue.trim().toLowerCase();

  if (!searchTerm) {
    fetchRandomCocktails();
    return;
  }

  const filtered = cocktails.value.filter((cocktail) =>
    cocktail.strDrink.toLowerCase().includes(searchTerm),
  );
  cocktails.value = filtered;
};

const fetchRandomCocktails = async () => {
  try {
    loading.value = true;
    const fetchPromises = Array.from({ length: 3 }, () =>
      fetch(COCKTAILS_LIST).then(async (res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        return data.drinks?.[0] as Cocktail;
      }),
    );

    cocktails.value = await Promise.all(fetchPromises);
  } catch (error: any) {
    console.error("Fetch failed:", error.message);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  cocktails.value = await fetchCocktails();
});
</script>

<template>
  <div style="height: 100%">
    <CocktailsHeader
      :selectedIngredients="selectedIngredients"
      @onHandleSearch="onHandleSearch"
      @onHandleIngredients="onHandleIngredients"
    />

    <Layout.Content
      style="padding: 24px; background-color: #001529; min-height: 100vh"
    >
      <template v-if="!selectedIngredients">
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
              LIST OF COCKTAILS
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
      </template>

      <Ingredients v-if="selectedIngredients" />

      <Row v-else gutter="[16, 16]" justify="center" style="gap: 3rem">
        <Spin
          v-if="loading"
          size="large"
          style="transform: scale(2); margin: 50px 0"
        />
        <div
          v-else-if="cocktails.length === 0"
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
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
        >
          <Card
            :loading="loading"
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
            <List
              size="small"
              :data-source="getIngredientsWithMeasures(cocktail)"
              header="<strong>Measures:</strong>"
              :renderItem="(item: string) => h('a-list-item', item)"
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

      <template v-if="!selectedIngredients">
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
