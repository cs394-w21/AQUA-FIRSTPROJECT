const getFood = async (apikey, foodId) => {
  if (apikey && foodId) {
    const result = await fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=` +
        apikey +
        `&pageSize=15&query=` +
        foodId
    );
    return result;
  }
};

const fetchFood = async function (foodResult, setFoodResult, apikey, foodId) {
  getFood(apikey, foodId)
    .then((value) => {
      return value.json();
    })
    .then((value) => {
      if (foodResult == null) {
        console.log(value);
        setFoodResult(value);
      }
    });
};

export default fetchFood;
