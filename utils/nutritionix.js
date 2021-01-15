import React, { useState, useEffect } from "react";
import { firebase } from "../firebase.js";
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