import React from "react";
import { Text, StyleSheet } from "react-native";
import GlobalStyles from "./GlobalStyles";

const CustomText = ({ children, variant, style, ...props }) => {
  const variantStyle = GlobalStyles[variant] || {};
  return (
    <Text style={[variantStyle, style]} {...props}>
      {children}
    </Text>
  );
};

export default CustomText;
