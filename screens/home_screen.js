import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen({ navigation }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    getList();
  }, [list]);

  const getList = () => {
    axios({
      url: "https://tzufskmukstybbiabxio.supabase.co/rest/v1/todo_rn?select=*&apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6dWZza211a3N0eWJiaWFieGlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIzMjMwMTAsImV4cCI6MTk4Nzg5OTAxMH0.l_cyVviXhSJAY6GB3Kk0dDdXux5gr0ajm6vNstIcQfI",
      method: "GET",
    }).then((res) => {
      var response = res.data;
      setList(response);
    });
  };

  const deleteTodoItem = (item) => {
    axios({
      url:
        "https://tzufskmukstybbiabxio.supabase.co/rest/v1/todo_rn?id=eq." +
        item.id +
        "&apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6dWZza211a3N0eWJiaWFieGlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIzMjMwMTAsImV4cCI6MTk4Nzg5OTAxMH0.l_cyVviXhSJAY6GB3Kk0dDdXux5gr0ajm6vNstIcQfI",
      method: "DELETE",
    }).then((res) => {
      var response = res.data;

      getList();
    });
  };

  const deleteAlert = (item) =>
    Alert.alert("Confirmation", "Are you sure to delete this todo?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          deleteTodoItem(item);
        },
      },
    ]);
  const hari = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
  ];
  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <Text style={styles.titleText}>Todo App with React Native</Text>
        <Text style={styles.todoTitle}>Item : {list.length}</Text>
      </View>
      <ScrollView>
        {list.map((item, index) => {
          return (
            <View key={index} style={styles.listItem}>
              <View>
                <Text style={styles.todoTitle}>{item.title}</Text>
                <Text style={styles.todoDesc}>{item.description}</Text>
                <View style={styles.todoDateView}>
                  <Text style={styles.todoDate}>{item.date_start}</Text>
                  <Text style={styles.todoDate}> - </Text>
                  <Text style={styles.todoDate}>{item.time_start}</Text>
                </View>
              </View>
              <View style={styles.actionTodo}>
                <FontAwesome5
                  name="trash-alt"
                  color="white"
                  size={20}
                  onPress={() => deleteAlert(item)}
                ></FontAwesome5>
                <FontAwesome5
                  name="pen"
                  color="white"
                  size={20}
                  onPress={() => {
                    navigation.navigate("EditTodo", item);
                  }}
                ></FontAwesome5>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddTodo")}
      >
        <View>
          <Text style={styles.todoTitle}>+</Text>
        </View>
      </TouchableOpacity>
      <StatusBar></StatusBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "azure",
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
  actionTodo: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 100,
  },
  statusBar: {
    height: 150,
    elevation: 10,
    width: "100%",
    backgroundColor: "teal",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    marginTop: 30,
    color: "white",
    textAlign: "center",
    fontSize: 24,
  },
  todoTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  todoDesc: {
    fontSize: 16,
    color: "white",
  },
  todoDateView: {
    flexDirection: "row",
  },
  todoDate: {
    fontSize: 14,
    color: "white",
    fontWeight: "light",
  },
  fab: {
    resizeMode: "contain",
    backgroundColor: "#00564d",
    height: 60,
    width: 60,
    borderRadius: 100,
    display: "flex",
    position: "absolute",
    bottom: 20,
    right: 20,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  flatList: {
    width: "100%",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "teal",
    width: 370,
    padding: 15,
    margin: 10,
    borderRadius: 10,
    elevation: 3,
  },
});
