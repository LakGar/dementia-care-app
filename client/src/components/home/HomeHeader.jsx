import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTheme } from "../../../ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
const HomeHeader = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.leftContainer}
        onPress={() => navigation.navigate("Profile")}
      >
        <View
          style={[
            styles.userImg,
            { backgroundColor: theme.secondary, borderColor: theme.text },
          ]}
        >
          <Ionicons name="person" size={24} color={theme.text} />
        </View>
        <View>
          <Text style={[styles.userName, { color: theme.text }]}>
            Hello, Jane
          </Text>
          <Text style={[styles.userEmail, { color: theme.subText }]}>
            janed02@gmail.com
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightContainer}>
        <Ionicons name="notifications" size={24} color={theme.text} />
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationBadgeText}>1</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    height: 50,
    marginTop: 60,
  },
  leftContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 250,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  userEmail: {
    fontWeight: "400",
    opacity: 0.5,
  },
  rightContainer: {
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: -10,
    right: -7,
    backgroundColor: "red",
    width: 20,
    height: 20,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
