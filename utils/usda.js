export const getFood = async (apikey, foodId) => {
  if (apikey && foodId) {
    const result = await fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=` +
        apikey +
        `&pageSize=15&query=` +
        foodId +
        "&nutrients=203,204,205,301,303,320,401"
    );
    return result.json();
  } else {
    console.log("Error: Key Undefined OR FoodID Invalid");
    return null;
  }
};

export const getFoodByFDCID = async (apikey, foodId) => {
  if (apikey && foodId) {
    const result = await fetch(
      "https://api.nal.usda.gov/fdc/v1/food/" + foodId + "?api_key=" + apikey
    );
    return result.json();
  }
};

export const fetchFoods = async (apikey, list) => {
  return Promise.all(list.map((foodId) => getFood(apikey, foodId)));
};
