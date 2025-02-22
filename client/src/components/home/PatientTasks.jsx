import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useRef, useEffect } from "react";
import { useTheme } from "../../../ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Svg, { Path } from "react-native-svg";

const PatientTasks = () => {
  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  const navigation = useNavigation();
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Add preset colors for cards
  const cardColors = [
    "#FF6B6B", // coral red
    "#4ECDC4", // turquoise
    "#45B7D1", // sky blue
    "#FFA500", // orange
    "#FF69B4", // hot pink
    "#800080", // purple
  ];

  // Add different wave patterns for each card
  const wavePatterns = [
    "M0,160L34.3,138.7C68.6,117,137,75,206,80C274.3,85,343,139,411,160C480,181,549,171,617,181.3C685.7,192,754,224,823,218.7C891.4,213,960,171,1029,144C1097.1,117,1166,107,1234,112C1302.9,117,1371,139,1406,149.3L1440,160L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z",
    "M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,101.3C672,85,768,107,864,128C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
    "M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
  ];

  const patients = [
    {
      id: 1,
      name: "John Doe",
      tasks: 10,
      completed: 5,
      careTeam: [
        {
          id: 1,
          name: "Dr. John Doe",
          image:
            "https://images.unsplash.com/photo-1738363436173-0b49cd20dea8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
        },
        {
          id: 2,
          name: "Dr. Jane Doe",
          image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGVmYXVsdCUyMGZhY2V8ZW58MHx8MHx8fDA%3D",
        },
        {
          id: 3,
          name: "Dr. John Smith",
          image:
            "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZGVmYXVsdCUyMGZhY2V8ZW58MHx8MHx8fDA%3D",
        },
      ],
      alert: true,
    },
    {
      id: 2,
      name: "Jane Doe",
      tasks: 10,
      completed: 8,
      careTeam: [
        {
          id: 1,
          name: "Dr. John Doe",
          image:
            "https://images.unsplash.com/photo-1738363436173-0b49cd20dea8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
        },
        {
          id: 2,
          name: "Dr. Jane Doe",
          image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGVmYXVsdCUyMGZhY2V8ZW58MHx8MHx8fDA%3D",
        },
      ],
      alert: false,
    },
    {
      id: 3,
      name: "Sarah Smith",
      tasks: 8,
      completed: 3,
      careTeam: [
        {
          id: 1,
          name: "Dr. Emily Brown",
          image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGVmYXVsdCUyMGZhY2V8ZW58MHx8MHx8fDA%3D",
        },
        {
          id: 2,
          name: "Dr. Michael Chen",
          image:
            "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZGVmYXVsdCUyMGZhY2V8ZW58MHx8MHx8fDA%3D",
        },
      ],
      alert: true,
    },
  ];

  const renderPatientCard = ({ item, index }) => {
    const progressPercentage = (item.completed / item.tasks) * 100;

    return (
      <Animated.View
        style={[
          styles.patientCard,
          {
            backgroundColor: cardColors[index],
            opacity: fadeAnim,
            transform: [{ translateY }],
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Patient")}
          style={{ position: "relative" }}
        >
          {item.alert && (
            <View
              style={[
                styles.alertContainer,
                { backgroundColor: theme.background },
              ]}
            >
              <Ionicons name="alert-circle" size={24} color="red" />
            </View>
          )}
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            style={{
              position: "absolute",
              top: -85,
              left: -20,
              right: -20,
              width: 340, // Increased to cover padding
              height: 200,
            }}
          >
            <Path
              fill="rgba(255, 255, 255, 0.2)"
              fillOpacity="1"
              d={wavePatterns[index]}
            />
          </Svg>
          <View style={styles.cardPattern} />
          <View style={styles.patientCardHeader}>
            <View style={styles.patientCardHeaderTextContainer}>
              <Text style={styles.patientCardHeaderText}>{item.name}'s</Text>
              <Text style={styles.patientCardHeaderTextTeam}>Care Team</Text>
            </View>
            <TouchableOpacity style={styles.patientCardHeaderIconContainer}>
              <Ionicons name="ellipsis-vertical" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.patientCardBody}>
            <Text style={styles.patientCardBodyText}>
              {item.completed}/{item.tasks} tasks completed
            </Text>
            <View style={styles.progressBar}>
              <Animated.View
                style={[
                  styles.progress,
                  {
                    width: `${progressPercentage}%`,
                  },
                ]}
              />
            </View>

            <View style={styles.patientCardFooter}>
              <View style={styles.careTeamContainer}>
                {item.careTeam.map((teamMember, index) => (
                  <TouchableOpacity
                    key={teamMember.id}
                    style={[
                      styles.careTeamMember,
                      {
                        left: index * 30,
                        zIndex: item.careTeam.length - index,
                      },
                    ]}
                  >
                    <Image
                      source={{ uri: teamMember.image }}
                      style={styles.careTeamMemberImage}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity style={styles.CardNotification}>
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>Patients</Text>
      <Text style={[styles.subtitle, { color: theme.subText }]}>
        You have {patients.length} patients
      </Text>
      <FlatList
        horizontal
        data={patients}
        renderItem={renderPatientCard}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        snapToInterval={320} // Adjust based on card width + padding
        decelerationRate="fast"
        pagingEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    opacity: 0.7,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  flatListContainer: {
    paddingHorizontal: 20,
    paddingRight: 40,
  },
  patientCard: {
    padding: 20,
    borderRadius: 15,
    width: 300,
    marginRight: 20,
    elevation: 5,
    marginVertical: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    // overflow: "hidden",
  },
  patientCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  patientCardHeaderTextContainer: {
    flex: 1,
  },
  patientCardHeaderText: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
  },
  patientCardHeaderTextTeam: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 2,
  },
  patientCardBody: {
    marginTop: 25,
  },
  patientCardBodyText: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.9)",
  },
  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 4,
    marginTop: 10,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    backgroundColor: "white",
    borderRadius: 4,
  },
  patientCardFooter: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  careTeamContainer: {
    flexDirection: "row",
    height: 40,
    width: 120,
  },
  careTeamMember: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "absolute",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  careTeamMemberImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  CardNotification: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  cardPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    backgroundColor: "transparent",
    backgroundImage: `linear-gradient(135deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent)`,
    backgroundSize: "30px 30px",
  },
  alertContainer: {
    position: "absolute",
    top: -30,
    right: -30,
    borderRadius: 20,
    padding: 5,
    elevation: 5,
  },
});

export default PatientTasks;
