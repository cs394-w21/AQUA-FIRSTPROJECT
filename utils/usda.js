const getFood = async (apikey, foodId) => {
  if (apikey && foodId) {
    const result = await fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=` +
        apikey +
        `&pageSize=15&query=` +
        foodId
    );
    return result.json();
  } else {
    console.log("Error: Key Undefined OR FoodID Invalid");
  }
};

const fetchFood = async (apikey, foodId) => {
  return getFood(apikey, foodId);
};

export const takeFood = async (apikey, list) => {
  return Promise.all(list.map(foodId => fetchFood(apikey, foodId)))
}
