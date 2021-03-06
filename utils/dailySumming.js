const PROTEIN = 203;
const FAT = 204;
const CARB = 205;
const CALCIUM = 301;
const IRON = 303;
const VIT_A = 320;
const VIT_C = 401;

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
const findNutrientNumInFoodNutrients = (num, foodNutrients) => {
  for (const nutrient in foodNutrients) {
    if (foodNutrients[nutrient].nutrientNumber == num) {
      return nutrient;
    }
  }
  return -1;
};

const dailySumming = (log, foodResults) => {
  console.log("FoodResults:", foodResults);
  const recentDates = Array(7)
    .fill()
    .map((_, index) => {
      let date = new Date();
      let temp = new Date(date.setDate(date.getDate() - 6 + index));
      //console.log(temp);
      return temp.toJSON();
    });

  const data = recentDates.map((currDate) => {
    return Object.values(log.foods)
      .filter((logItem) => {
        let temp = new Date(logItem.time);
        let curr = new Date(currDate);
        return temp.getDate() == curr.getDate();
      })
      .map((logItem) => {
        const nutrients = findIdInFoodResults(logItem.fdcId, foodResults)
          ? foodResults[findIdInFoodResults(logItem.fdcId, foodResults)]
              .foods[0].foodNutrients
          : {
              [PROTEIN]: 0,
              [FAT]: 0,
              [CARB]: 0,
              [IRON]: 0,
              [VIT_A]: 0,
              [VIT_C]: 0,
            };
        let currDay = new Date(logItem.time);
        //console.log(nutrients);
        return {
          protein:
            findNutrientNumInFoodNutrients(PROTEIN, nutrients) == -1
              ? 0
              : (nutrients[findNutrientNumInFoodNutrients(PROTEIN, nutrients)]
                  .value *
                  PROTEIN_CAL *
                  logItem.grams) /
                100,
          fat:
            findNutrientNumInFoodNutrients(FAT, nutrients) == -1
              ? 0
              : (nutrients[findNutrientNumInFoodNutrients(FAT, nutrients)]
                  .value *
                  FAT_CAL *
                  logItem.grams) /
                100,
          carb:
            findNutrientNumInFoodNutrients(CARB, nutrients) == -1
              ? 0
              : (nutrients[findNutrientNumInFoodNutrients(CARB, nutrients)]
                  .value *
                  CARB_CAL *
                  logItem.grams) /
                100,
          calcium:
            findNutrientNumInFoodNutrients(CALCIUM, nutrients) == -1
              ? 0
              : (nutrients[findNutrientNumInFoodNutrients(CALCIUM, nutrients)]
                  .value *
                  logItem.grams) /
                100,
          iron:
            findNutrientNumInFoodNutrients(IRON, nutrients) == -1
              ? 0
              : (nutrients[findNutrientNumInFoodNutrients(IRON, nutrients)]
                  .value *
                  logItem.grams) /
                100,
          vit_a:
            findNutrientNumInFoodNutrients(VIT_A, nutrients) == -1
              ? 0
              : (nutrients[findNutrientNumInFoodNutrients(VIT_A, nutrients)]
                  .value *
                  logItem.grams) /
                100,
          vit_c:
            findNutrientNumInFoodNutrients(VIT_C, nutrients) == -1
              ? 0
              : (nutrients[findNutrientNumInFoodNutrients(VIT_C, nutrients)]
                  .value *
                  logItem.grams) /
                100,
          date: currDay.getDate(),
        };
      })
      .reduce(
        (total, logItem) => {
          return {
            protein: total.protein + logItem.protein,
            carbohydrate: total.carbohydrate + logItem.carb,
            fat: total.fat + logItem.fat,
            calcium: total.calcium + logItem.calcium,
            iron: total.iron + logItem.iron,
            vit_a: total.vit_a + logItem.vit_a,
            vit_c: total.vit_c + logItem.vit_c,
            date: logItem.date,
          };
        },
        {
          protein: 0,
          carbohydrate: 0,
          fat: 0,
          calcium: 0,
          iron: 0,
          vit_a: 0,
          vit_c: 0,
          date: new Date().getDate(),
        }
      );
  });
  //console.log("Data:", data);
  /*
  console.log(
    "Here are the sums in calories:",
    data.map((row) => row.protein + row.carbohydrate + row.fat)
  );
  */
  return data;
};

export const weeklySums = (data) => {
  return data.reduce(
    (total, logItem) => {
      return {
        Protein: total.Protein + logItem.protein,
        Carbohydrate: total.Carbohydrate + logItem.carbohydrate,
        Fat: total.Fat + logItem.fat,
        Calcium: total.Calcium + logItem.calcium,
        Iron: total.Iron + logItem.iron,
        "Vitamin A": total["Vitamin A"] + logItem.vit_a,
        "Vitamin C": total["Vitamin C"] + logItem.vit_c,
      };
    },
    {
      Protein: 0,
      Carbohydrate: 0,
      Fat: 0,
      Calcium: 0,
      Iron: 0,
      "Vitamin A": 0,
      "Vitamin C": 0,
    }
  );
};

export const weeklyDeficiencies = (weeklySums) => {
  const weeklyDV = {
    Calcium: 9100,
    Iron: 126,
    "Vitamin A": 6300,
    "Vitamin C": 630,
  };
  const nutrients = ["Vitamin A", "Vitamin C", "Calcium", "Iron"];

  const deficiencies = nutrients.map((nutrient) => {
    /*
    console.log("actual", nutrient, weeklySums[nutrient]);
    console.log("recc", nutrient, weeklyDV[nutrient]);
    */
    return weeklySums[nutrient] <= weeklyDV[nutrient] ? nutrient : null;
  });
  return deficiencies;
};
export default dailySumming;
