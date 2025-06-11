import { Cocktail } from "./cocktails.types";
import { COCKTAILS_LIST } from "@/components/Cocktails/cocktails.constants";

export const fetchCocktails = async (): Promise<Cocktail[]> => {
  try {
    const fetchRandomCocktails = Array.from({ length: 10 }, () =>
      fetch(COCKTAILS_LIST).then(async (res) => {
        if (!res.ok) throw new Error(`HTTP error, status: ${res.status}`);
        const data = await res.json();
        return data.drinks?.[0] as Cocktail;
      }),
    );
    return await Promise.all(fetchRandomCocktails);
  } catch (error) {
    console.error("Error fetching cocktails:", error);
    return [];
  }
};
