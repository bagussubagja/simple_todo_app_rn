import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AddTodoScreen from "../screens/add_todo_screen";
import EditTodoScreen from "../screens/edit_todo_screen";
import HomeScreen from "../screens/home_screen";

const Stack = createStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddTodo"
          component={AddTodoScreen}
          options={{
            title: "Add Todo",
            headerStyle: {
              backgroundColor: "azure",
            },
          }}
        />
        <Stack.Screen
          name="EditTodo"
          component={EditTodoScreen}
          options={{
            title: "Edit Todo",
            headerStyle: {
              backgroundColor: "azure",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
