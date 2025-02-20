import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../../../ThemeContext";
import { Svg, Circle, Text as SvgText } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import Octicons from "@expo/vector-icons/Octicons";
import { Confetti } from "react-native-fast-confetti";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

const UpcomingTask = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const confettiRef = useRef(null);
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  // Example task data - replace with your actual task data
  const totalTasks = 9;
  const completedTasks = 7; // Change this value to test different states
  const hasNoTasks = totalTasks === 0;
  const allTasksCompleted = totalTasks > 0 && completedTasks === totalTasks;

  // Progress circle parameters
  const size = 70;
  const strokeWidth = 6;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const targetProgress = hasNoTasks ? 0 : (completedTasks / totalTasks) * 100;
  const [progress, setProgress] = useState(0);

  const tasks = [
    {
      id: 1,
      title: "Give a gift to my friend",
      completed: false,
      user: "John Doe",
    },
    {
      id: 2,
      title: "Buy a new phone",
      completed: true,
      user: "Jane Doe",
    },
    {
      id: 3,
      title: "Buy a new laptop",
      completed: true,
      user: "Jason Doe",
    },
  ];

  useEffect(() => {
    let startTime = null;
    const duration = 1000; // 1 second duration

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const newProgress = Math.min(
        targetProgress,
        (elapsed / duration) * targetProgress
      );
      setProgress(newProgress);
      if (elapsed < duration) {
        requestAnimationFrame(animate);
      } else {
        setProgress(targetProgress);
        if (allTasksCompleted) {
          confettiRef.current?.start();
        }
      }
      openDropDown();
    };

    requestAnimationFrame(animate);
  }, [targetProgress, allTasksCompleted]);

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const height = useSharedValue(35);

  const openDropDown = () => {
    if (tasks.length === 1) {
      height.value = withSpring(95);
    } else if (tasks.length === 2) {
      height.value = withSpring(135);
    } else {
      height.value = withSpring(215);
    }
    setTimeout(() => {
      setIsDropDownOpen(true);
    }, 100);
  };

  const closeDropDown = () => {
    height.value = withSpring(35);
    //wait for the animation to complete
    setTimeout(() => {
      setIsDropDownOpen(false);
    }, 100);
  };

  const renderContent = () => {
    if (hasNoTasks) {
      return (
        <View style={styles.emptyStateContainer}>
          <Ionicons name="clipboard-outline" size={38} color={theme.subText} />
          <Text style={[styles.emptyStateText, { color: theme.text }]}>
            No tasks for today
          </Text>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: theme.primary, marginTop: 10 },
            ]}
            onPress={() => navigation.navigate("Add")}
          >
            <Text style={[styles.buttonText, { color: theme.background }]}>
              Add Task
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (allTasksCompleted) {
      return (
        <>
          <View style={styles.contentLeft}>
            <Text style={[styles.headerText, { color: theme.text }]}>
              Today's Tasks
            </Text>
            <Text style={[styles.subHeaderText, { color: theme.subText }]}>
              {completedTasks}/{totalTasks} tasks done
            </Text>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.primary }]}
              onPress={() => navigation.navigate("Task")}
            >
              <Text style={[styles.buttonText, { color: theme.background }]}>
                {formattedDate}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.chartContainer}>
            <Svg height={size} width={size}>
              <Circle
                cx={center}
                cy={center}
                r={radius}
                stroke={theme.secondary}
                strokeWidth={strokeWidth}
                fill="none"
              />
              <Circle
                cx={center}
                cy={center}
                r={radius}
                stroke={theme.primary}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform={`rotate(-90, ${center}, ${center})`}
              />
              <SvgText
                x={center}
                y={center + 6}
                fontSize="16"
                fontWeight="600"
                fill={theme.text}
                textAnchor="middle"
              >
                {`${Math.round(targetProgress)}%`}
              </SvgText>
            </Svg>
          </View>
        </>
      );
    }

    return (
      <>
        <View style={styles.contentLeft}>
          <Text style={[styles.headerText, { color: theme.text }]}>
            Today's Tasks
          </Text>
          <Text style={[styles.subHeaderText, { color: theme.subText }]}>
            {completedTasks}/{totalTasks} tasks done
          </Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.primary }]}
            onPress={() => navigation.navigate("Task")}
          >
            <Text style={[styles.buttonText, { color: theme.background }]}>
              {formattedDate}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.chartContainer}>
          <Svg height={size} width={size}>
            <Circle
              cx={center}
              cy={center}
              r={radius}
              stroke={theme.secondary}
              strokeWidth={strokeWidth}
              fill="none"
            />
            <Circle
              cx={center}
              cy={center}
              r={radius}
              stroke={theme.primary}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform={`rotate(-90, ${center}, ${center})`}
            />
            <SvgText
              x={center}
              y={center + 6}
              fontSize="16"
              fontWeight="600"
              fill={theme.text}
              textAnchor="middle"
            >
              {`${Math.round(targetProgress)}%`}
            </SvgText>
          </Svg>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.containerContent,
          { backgroundColor: theme.card },
          hasNoTasks && { paddingBottom: 25, borderRadius: 15 },
          allTasksCompleted && { paddingBottom: 25, borderRadius: 15 },
        ]}
      >
        {renderContent()}
      </View>
      {allTasksCompleted && (
        <>
          <Confetti isInfinite={false} />
        </>
      )}
      {!allTasksCompleted && !hasNoTasks && (
        <Animated.View
          style={[
            styles.dropDownContainer,
            { backgroundColor: theme.card, height },
          ]}
        >
          <View>
            {isDropDownOpen && (
              <>
                {tasks.slice(0, 3).map((task) => (
                  <View style={styles.dropDownTaskContainer} key={task.id}>
                    <View
                      style={[
                        styles.userImg,
                        {
                          backgroundColor: theme.secondary,
                          borderColor: theme.text,
                        },
                      ]}
                    >
                      <Ionicons name="person" size={24} color={theme.text} />
                    </View>
                    <View style={styles.dropDownTaskDetails}>
                      <Text
                        style={[
                          styles.dropDownTaskTitle,
                          { color: theme.text },
                        ]}
                      >
                        {task.title}
                      </Text>
                      <Text
                        style={[
                          styles.dropDownTaskUser,
                          { color: theme.subText },
                        ]}
                      >
                        {task.user}
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.dropDownTaskButton}>
                      {task.completed ? (
                        <Octicons
                          name="check-circle-fill"
                          size={24}
                          color={theme.text}
                        />
                      ) : (
                        <Entypo name="circle" size={24} color={theme.text} />
                      )}
                    </TouchableOpacity>
                  </View>
                ))}
              </>
            )}
            {isDropDownOpen ? (
              <TouchableOpacity
                onPress={() => closeDropDown()}
                style={styles.dropDownButtonContainer}
              >
                <Ionicons
                  name="chevron-up-outline"
                  size={24}
                  color={theme.text}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => openDropDown()}
                style={styles.dropDownButtonContainer}
              >
                <Ionicons
                  name="chevron-down-outline"
                  size={24}
                  color={theme.text}
                />
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
  containerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingBottom: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  contentLeft: {
    flex: 1,
    gap: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
  },
  subHeaderText: {
    fontSize: 14,
    opacity: 0.7,
    fontWeight: "500",
  },
  button: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 5,
    width: 120,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  chartContainer: {
    marginLeft: 20,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },
  emptyStateSubText: {
    fontSize: 16,
    marginTop: 5,
  },
  completedStateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  completedStateText: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },
  completedStateSubText: {
    fontSize: 14,
    marginTop: 5,
  },
  dropDownContainer: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  dropDownButtonContainer: {
    padding: 5,
    alignItems: "center",
  },
  dropDownTaskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 20,
    gap: 10,
  },
  userImg: {
    width: 40,
    height: 40,
    borderRadius: 250,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dropDownTaskDetails: {
    alignItems: "flex-start",
    flex: 1,
  },
  dropDownTaskUser: {
    fontSize: 14,
    fontWeight: "500",
    opacity: 0.7,
  },
  dropDownTaskTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default UpcomingTask;
