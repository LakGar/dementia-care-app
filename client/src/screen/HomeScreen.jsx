import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../../ThemeContext";
import HomeHeader from "../components/home/HomeHeader";
import UpcomingTask from "../components/home/UpcomingTask";
import SearchTask from "../components/home/SearchTask";
import PatientTasks from "../components/home/PatientTasks";
const HomeScreen = () => {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <HomeHeader />
        <SearchTask />
        <UpcomingTask />
        <PatientTasks />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  scrollView: {
    width: "100%",
  },
});
