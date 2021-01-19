/*
Index   Nutrient
0       Protein
1       Total lipid (fat)
2       Carbohydrate, by difference
*/
const PROTEIN = 0;
const FAT = 1;
const CARB = 2;

const FAT_CAL = 9.4;
const CARB_CAL = 4.2;
const PROTEIN_CAL = 4.2;

const findIdInFoodResults = (id, foodResults) => {
  for (const result in foodResults) {
    if (foodResults[result].foods[0].fdcId == id) {
      return result;
    }
  }
};

const dailySumming = (log, foodResults) => {
  const recentDates = Array(7)
    .fill()
    .map((_, index) => {
      let date = new Date();
      let temp = new Date(date.setDate(date.getDate() - 6 + index));
      return temp.toJSON();
    });

  const data = recentDates.map((currDate) => {
    return log.foods
      .filter((logItem) => {
        let temp = new Date(logItem.time);
        let curr = new Date(currDate);
        return temp.getDate() == curr.getDate();
      })
      .map((logItem) => {
        const nutrients =
          foodResults[findIdInFoodResults(logItem.fdcId, foodResults)].foods[0]
            .foodNutrients;

        return {
          protein: nutrients[PROTEIN].value * PROTEIN_CAL,
          fat: nutrients[FAT].value * FAT_CAL,
          carb: nutrients[CARB].value * CARB_CAL,
        };
      })
      .reduce(
        (total, logItem) => {
          return {
            protein: total.protein + logItem.protein,
            carbohydrate: total.carbohydrate + logItem.carbohydrate,
            fat: total.fat + logItem.fat,
          };
        },
        {
          protein: 0,
          carbohydrate: 0,
          fat: 0,
        }
      );
  });

  return data;
};
export default dailySumming;
