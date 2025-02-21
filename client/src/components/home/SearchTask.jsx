import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../ThemeContext";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

const SearchTask = () => {
  const [search, setSearch] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { theme } = useTheme();

  // Get screen dimensions
  const screenHeight = Dimensions.get("window").height;

  const handleClear = () => {
    setSearch("");
    setIsSearchActive(false);
    height.value = withTiming(0);
  };
  const height = useSharedValue(0);
  const handleSearch = (text) => {
    setIsSearchActive(text?.length > 0);
    height.value = withTiming(screenHeight - 250);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.searchContainer, { backgroundColor: theme.card }]}>
        <Ionicons name="search-outline" size={24} color={theme.subText} />
        <TextInput
          value={search}
          placeholder="Search task"
          placeholderTextColor={theme.subText}
          style={[styles.searchInput, { color: theme.text }]}
          onChangeText={(text) => {
            setSearch(text);
            handleSearch(text);
          }}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <Ionicons name="close-outline" size={24} color={theme.subText} />
          </TouchableOpacity>
        )}
      </View>
      {isSearchActive && (
        <Animated.View
          style={[
            styles.searchResultsContainer,
            {
              backgroundColor: theme.background,
              height,
            },
          ]}
        >
          <Text style={{ color: theme.text }}>Search results</Text>
        </Animated.View>
      )}
    </View>
  );
};

export default SearchTask;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
  },
  searchContainer: {
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  searchResultsContainer: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    padding: 20,
    zIndex: 1000,
  },
});
