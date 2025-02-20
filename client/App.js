import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/Auth/LoginScreen";
import RegisterScreen from "./src/Auth/RegisterScreen";
import MainTabNavigator from "./MainTabNavigator";
import AuthScreen from "./src/Auth/AuthScreen";
import { ThemeProvider } from "./ThemeContext";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      {/* You can add more screens here that do not require tabs */}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        {/* Uncomment the line below to switch to the main app stack after authentication */}
        <AppStack />
      </NavigationContainer>
    </ThemeProvider>
  );
}
