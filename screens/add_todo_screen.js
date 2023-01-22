import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import axios from "axios";
import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput } from "react-native-gesture-handler";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function AddTodoScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [textDate, setTextDate] = useState("Empty");
  const [textTime, setTextTime] = useState("Empty");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const addTodoData = () => {
    var data = {
      title: title,
      description: description,
      date_start: textDate,
      time_start: textTime,
    };
    axios({
      url: "https://tzufskmukstybbiabxio.supabase.co/rest/v1/todo_rn?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6dWZza211a3N0eWJiaWFieGlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIzMjMwMTAsImV4cCI6MTk4Nzg5OTAxMH0.l_cyVviXhSJAY6GB3Kk0dDdXux5gr0ajm6vNstIcQfI",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
    
        setTitle("");
        setDescription("");
        setTextDate("");
        setTextTime("");
        navigation.goBack();
      })
      .catch((error) => console.log(error));
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    let fTime = tempDate.getHours() + ":" + tempDate.getMinutes();
    setTextDate(fDate);
    setTextTime(fTime);
    setShow(false);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.textFieldName}>Title</Text>
        <TextInput
          style={styles.textFieldStyle}
          placeholder="Enter your title todo"
          onChangeText={(val) => setTitle(val)}
        />
        <Text style={styles.textFieldName}>Description</Text>
        <TextInput
          style={styles.textFieldStyle}
          placeholder="Enter your desciption todo"
          onChangeText={(val) => setDescription(val)}
        />
        <View style={styles.dateSection}>
          <Text style={styles.textFieldName}>Date Start : {textDate}</Text>
          <FontAwesome5
            name="calendar"
            color="teal"
            size={30}
            onPress={() => showMode("date")}
          ></FontAwesome5>
        </View>
        <View style={styles.dateSection}>
          <Text style={styles.textFieldName}>Time Start : {textTime}</Text>
          <FontAwesome5
            name="clock"
            color="teal"
            size={30}
            onPress={() => showMode("time")}
          ></FontAwesome5>
        </View>
        <Button title="Add Todo" color={"teal"} onPress={addTodoData} />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "azure",
    padding: 12,
  },
  dateSection: {
    marginBottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
  },
  textFieldName: {
    marginTop: 20,
    fontSize: 18,
  },
  textFieldStyle: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "dimgray",
    borderRadius: 12,
    padding: 8,
    width: "100%",
    height: 50,
  },
});
