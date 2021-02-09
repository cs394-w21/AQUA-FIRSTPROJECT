import React, { useState, useEffect } from "react";
import { firebase } from "../firebase.js";
import { StyleSheet, View, Text, SafeAreaView, Modal, TouchableOpacity } from "react-native";
import {fetchFoods } from "../utils/usda";
import VitaminsAndMinerals from "../components/VitaminsAndMinerals";
import theme from "../utils/theme";
import dailySumming from "../utils/dailySumming";
import { ScrollView } from "react-native-gesture-handler";
import MacroChart from "../components/MacroChart";
import { recs } from "../components/Recommendations";
//import Modal from "react-native-modal";


const Legend = () => {
  const keys = {
    "Protein": theme.red,
    "Fat": theme.lightYellow,
    "Carbohydrate": theme.orange
  }
  return (
    <View style={{flexDirection: 'row'}}>
      {Object.keys(keys).map((name) => {
        return (
          <View style={{flexDirection: 'row', padding: 5, alignItems: 'center'}} key={name}>
            <View style={{backgroundColor: keys[name], width: 10, height: 10}}></View>
            <Text>
              {' ' + name + ' '}
            </Text>
          </View>
        )
      })
      }
  </View>
  )
}

const Cover = ({isOpen}) => {
  return (isOpen ?
    <View style={{
      position: "absolute",
      height: "100%",
      width: "100%",
      backgroundColor: "black",
      opacity: isOpen ? 0.5 : 0}}>
    </View>
    : null
  )
}

const DeficiencyModal = ({nutrient, isOpen, setIsOpen}) => {
  return(
    <View
    style={{
      flex: 1,
      justifyContent: "center",
      //alignItems: "center",
      position: "absolute",
      height: "100%",
      width: "100%",
      marginLeft: "35%",
      zIndex: isOpen ? 3000 : -3000}}>
      <Modal style={isOpen ? styles.modalView : styles.modalClose}>
        {recs[nutrient]}
        <TouchableOpacity onPress={() => setIsOpen(false)}>
          <Text>
            Close
          </Text>
        </TouchableOpacity>
      </Modal>
    </View> 
  )
}

const SummaryScreen = () => {
  const [admin, setAdmin] = useState(null);
  const [log, setLog] = useState(null);
  const [foods, setFoods] = useState(null);
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [nutrient, setNutrient] = useState();

  useEffect(() => {
    const db =
      firebase.auth() && firebase.auth().currentUser
        ? firebase
            .database()
            .ref("users/" + firebase.auth().currentUser.uid + "/log")
        : null;

    const handleData = (snap) => {
      if (snap.val()) {
        setLog(snap.val());
      } else {
        setLog({});
      }
    };
    db.on("value", handleData, (error) => console.log(error));
    return () => {
      db.off("value", handleData);
    };
  }, []);

  useEffect(() => {
    const db = firebase.database().ref("admin");
    const handleData = (snap) => {
      if (snap.val()) {
        setAdmin(snap.val());
      }
    };
    db.on("value", handleData, (error) => console.log(error));
    return () => {
      db.off("value", handleData);
    };
  }, []);

  useEffect(() => {
    console.log("Foods:", foods);
    console.log("data:", data);
  }, [foods,data]);

  useEffect(() => {
    if (admin && log && log.foods) {
      const built = Object.values(log.foods).map((food) => food.fdcId);
      fetchFoods(admin.apikey, built).then((value) => {
        setFoods(value);
        /*
        if (!foods) {
          setFoods(value);
        }
        */
      });
    }
  }, [admin, log]);

  useEffect(() => {
    if (log && foods) {
      setData(dailySumming(log, foods));
    }
  }, [log, foods]);

  

  return (
    <React.Fragment>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ textAlign: "center" }}>
          <Text style={{ fontSize: 30 }}>Weekly Summary</Text>
        </View>
        {data ? (
          <SafeAreaView style={{alignItems: 'center', justifyContent: 'center'}}>
            <Legend></Legend>
            <MacroChart data={data} />
            <VitaminsAndMinerals data={data} setIsOpen={setIsOpen} setNutrient={setNutrient} />
          </SafeAreaView>
        ) : (
          null
          //<WeeklyMacroChart data={[]} />
        )}


        <Cover isOpen={isOpen}/>
        {/*<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
      </Modal>*/}
      </ScrollView>
      <DeficiencyModal nutrient={nutrient} isOpen={isOpen} setIsOpen={setIsOpen}/>
    </React.Fragment>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.cream,
    alignItems: "center",
    justifyContent: "space-evenly",
    overflowX: 'scroll'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    //margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    maxWidth: "30%",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    borderColor: theme.lightGreen,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalClose: {
    opacity: 0,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default SummaryScreen;
