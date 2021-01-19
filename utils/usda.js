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

const fetchFoods = async function (
  foodResults,
  setFoodResults,
  foodResult,
  setFoodResult,
  apikey,
  log,
  stopper,
  setStopper
) {
  console.log("calling fetch foods ...");
  Promise.all(
    Object.keys(log["foods"]).map((food) =>
      getFood(apikey, log["foods"][food]).then((value) => {
        return value.json();
      })
    )
  ).then((value) => {
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

export default fetchFoods;
