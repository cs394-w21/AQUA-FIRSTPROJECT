import React, { useState } from "react";
import { Button, Image, Text, TextInput, View, StyleSheet } from "react-native";
import { firebase } from "../firebase";

const db = firebase.database().ref("users");

const newUser = {
  activityLevel: "",
  age: 0,
  firstName: "",
  lastName: "",
  gender: "",
  log: {
    foods: [-1],
  },
  weight: 0,
  weightUnit: "",
};

const SignUpScreen = ({ navigation }) => {
  const [info, setInfo] = useState(newUser);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");

  async function onSignUp() {
    setSignupError("");
    if (email == "") {
      setSignupError("Please provide an email address.");
      return;
    }
    if (password != confirmPassword) {
      setSignupError("Passwords do not match.");
      return;
    }
    var errorCode = "success";

    const signUpAction = (email, userCredential, errorCode) => {
      if (errorCode != "success") return;
      const user = userCredential.user.uid;
      db.update({
        [user]: {
          email: email,
        },
      });
      db.update({
        [user]: { ...newUser, firstName: firstName, lastName: lastName },
      });
      navigation.navigate("mainApp", { screen: "Summary" });
    };
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        errorCode = err.code;
        setSignupError(err.message);
      })
      .then((userCredential) => {
        signUpAction(email, userCredential, errorCode);
      });
  }

  return (
    <View style={styles.container}>
      <Text>BalancedPlate</Text>
      <TextInput
        value={firstName}
        onChangeText={(name) => setFirstName(name)}
        placeholder={"First Name"}
        style={styles.input}
      />
      <TextInput
        value={lastName}
        onChangeText={(name) => setLastName(name)}
        placeholder={"Last Name"}
        style={styles.input}
      />
      <TextInput
        value={email}
        onChangeText={(email) => setEmail(email)}
        placeholder={"Email"}
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={(password) => setPassword(password)}
        placeholder={"Password"}
        secureTextEntry={true}
        style={styles.input}
      />
      <TextInput
        value={confirmPassword}
        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
        placeholder={"Confirm Password"}
        secureTextEntry={true}
        style={styles.input}
      />
      <Button title={"Sign Up"} style={styles.input} onPress={onSignUp} />
      <Text>{signupError}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  roleSelect: {
    backgroundColor: "white",
    padding: 5,
    borderBottomWidth: 2,
    width: 125,
  },
});

export default SignUpScreen;
