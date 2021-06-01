import React from 'react';
import { TouchableOpacity, View, Button } from 'react-native';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './src/reducers';


import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import ShowMoment from "./src/screens/ShowScreen";
import AddMoment from "./src/screens/AddScreen";
import DetailMoment from "./src/screens/DetailScreen";
import EditMoment from "./src/screens/EditScreen";

import Colors from "./src/colors/index";

//vector
import { Ionicons } from '@expo/vector-icons';

//db

import { init } from "./src/db/index";

init()
  .then(() => {
    console.log("Initialize database");
  })
  .catch(err => {
    console.log("failed")

  })

const store = createStore(reducers, applyMiddleware(thunk));
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const ListStack = () => {
  return (
    <Stack.Navigator
      mode="modal"
      headerMode="float"
    >
      <Stack.Screen
        name="Show"
        component={ShowMoment}
        options={{ title: "Your Moment", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailMoment}
        options={({ route, navigation }) => ({
          title: "Your Moment",
          headerTitleAlign: "center",
          headerRightContainerStyle: "left",

          headerRight: () => {
            const { idCatched } = route.params;

            return (
              <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingRight: 10, width: 120 }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Edit', { id: idCatched })}
                >
                  <Ionicons name="ios-settings-outline" size={24} color="black" />
                </TouchableOpacity>
              </View>
            )
          }

        })}
      />
      <Stack.Screen
        name="Edit"
        component={EditMoment}

        options={({ route }) =>
        ({
          title: "Edit Moment", headerTitleAlign: "center"
        })
        }
      />

    </Stack.Navigator>
  )
};

const AddStack = () => {
  return (
    <Stack.Navigator
      mode="modal"
      headerMode="float"
    >
      <Stack.Screen
        name="Add"
        component={AddMoment}
        options={{ title: "Add Moment", headerTitleAlign: "center" }}
      />

    </Stack.Navigator>
  )
};


function MyTabs() {
  return (
    < Tab.Navigator
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: '#694fad' }}
      shifting={true}
    >
      <Tab.Screen
        name="Home"
        component={ListStack}
        options={{
          tabBarColor: Colors.primaryColor,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-home-outline" size={23} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={AddStack}
        options={{
          tabBarColor: Colors.accentColor,
          tabBarLabel: 'Add Contact',
          tabBarIcon: ({ color }) => (


            <Ionicons name="person-add" size={23} color={color} />


          ),
        }}
      />
    </Tab.Navigator >
  );
}



export default () => {
  return (
    <Provider store={store}>
      <NavigationContainer>{MyTabs()}</NavigationContainer>
    </Provider>

  );
};