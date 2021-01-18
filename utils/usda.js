const getFood = async (apikey, foodId) => {
  if (apikey && foodId) {
    const result = await fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=` +
        apikey +
        `&pageSize=15&query=` +
        foodId
    );
    return result;
  } else {
    console.log("get food failed");
  }
};

const fetchFood = async function (
  foodResults,
  setFoodResults,
  foodResult,
  setFoodResult,
  apikey,
  foodId,
  stopper,
  setStopper
) {
  console.log("calling fetch food ...");
  getFood(apikey, foodId)
    .then((value) => {
      return value.json();
    })
    .then((value) => {
      if (foodResult == null) {
        setFoodResult(value);
        const tempResults = foodResults.concat(value);
        if (stopper == null) {
          setFoodResults(tempResults);
          setStopper(true);
          console.log("success");
        }
      } else {
        console.log("it was null");
      }
    });
};

export default fetchFood;
