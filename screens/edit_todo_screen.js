import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useState } from "react";

export default function EditTodoScreen({ route, navigation }) {
  const { id, title, description, date_start, time_start } = route.params;
  const [getId, setGetId] = useState(0);
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDesc, setUpdateDesc] = useState("");
  const [textDate, setTextDate] = useState(null);
  const [textTime, setTextTime] = useState(null);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [list, setList] = useState([]);


  const updateTodoData = (item) => {
    var data = {
      title: updateTitle,
      description: updateDesc,
      date_start: textDate,
      time_start: textTime,
    };

    axios({
      url:
        "https://tzufskmukstybbiabxio.supabase.co/rest/v1/todo_rn?id=eq." +
        item +
        "&apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6dWZza211a3N0eWJiaWFieGlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIzMjMwMTAsImV4cCI6MTk4Nzg5OTAxMH0.l_cyVviXhSJAY6GB3Kk0dDdXux5gr0ajm6vNstIcQfI",
      method: "PATCH",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // getList();

        if (
          updateTitle != null &&
          updateDesc != null &&
          textDate != null &&
          textTime != null
        ) {
          navigation.goBack();
        }

        // navigation.goBack();
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
    let fTime =
      tempDate.getMinutes() < 10
        ? tempDate.getHours() + ":" + "0" + tempDate.getMinutes()
        : tempDate.getHours() + ":" + tempDate.getMinutes();
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
          onChangeText={(val) => setUpdateTitle(val)}
          style={styles.textFieldStyle}
          placeholder={JSON.stringify(title)}
        />
        <Text style={styles.textFieldName}>Desciption</Text>
        <TextInput
          onChangeText={(val) => setUpdateDesc(val)}
          style={styles.textFieldStyle}
          placeholder={JSON.stringify(description)}
        />
        <View style={styles.dateSection}>
          <Text style={styles.textFieldName}>
            Date Start :{" "}
            {textDate != null ? textDate : JSON.stringify(date_start)}
          </Text>
          <FontAwesome5
            name="calendar"
            color="teal"
            size={30}
            onPress={() => showMode("date")}
          ></FontAwesome5>
        </View>
        <View style={styles.dateSection}>
          <Text style={styles.textFieldName}>
            Time Start :{" "}
            {textTime != null ? textTime : JSON.stringify(time_start)}
          </Text>
          <FontAwesome5
            name="clock"
            color="teal"
            size={30}
            onPress={() => showMode("time")}
          ></FontAwesome5>
        </View>
        <Button
          title="Update Todo"
          color={"teal"}
          onPress={() => updateTodoData(JSON.stringify(id))}
        />
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
