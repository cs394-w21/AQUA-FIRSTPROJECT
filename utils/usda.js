const getFood = async () => {
  const result = await fetch('https://api.nal.usda.gov/fdc/v1/foods/search?api_key=utEsABLIQ0bCVRd3z3GvZ0x6LVcRZg8zhrG3iFJH&pageSize=15&query=362759') 
  return result;
}

const fetchFood = async function (foodResult, setFoodResult) {
  getFood().then((value) => {
    return value.json();
  }).then((value) => {
    if (foodResult == null) {
      console.log(value);
      setFoodResult(value);
    }
  })
}

export default fetchFood;





/*
const nutritionix = require("nutritionix-api");
const RequestFoodData = (food) => {
  const [admin, setAdmin] = useState(null);
  useEffect(()=> {
    const db = firebase.database().ref("admin");
    db.on("value", (snap)=> {
      if (snap.val()) setAdmin(snap.val());
    },
    (error)=> console.log(error)
    );
    return () => {
      db.off("value", handleData);
    };
  },[]);
  if (admin) {
    nutritionix.init(admin.appid,admin.appkey);
    nutritionix.natural.search(food).then(result => {
      console.log(result);
    });
  }
}

export default RequestFoodData;
*/