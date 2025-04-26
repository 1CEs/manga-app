import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface DividerProps {
  style?: any;
  orientation?: 'horizontal' | 'vertical';
  thickness?: 'thin' | 'medium' | 'thick';
  color?: string;
  children?: React.ReactNode;
  textStyle?: any;
}

const Divider: React.FC<DividerProps> = ({
  style,
  orientation = 'horizontal',
  thickness = 'thin',
  color = '#e5e7eb',
  children,
  textStyle,
}) => {
  const thicknessValues = {
    thin: 0.5,
    medium: 1,
    thick: 2,
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    line: {
      flex: 1,
      height: thicknessValues[thickness],
      backgroundColor: color,
    },
    content: {
      marginHorizontal: 10,
      color: color,
    },
    verticalContainer: {
      flexDirection: 'column',
      height: '100%',
      alignItems: 'center',
    },
    verticalLine: {
      flex: 1,
      paddingHorizontal: 8,
      width: thicknessValues[thickness],
      backgroundColor: color,
    },
    verticalContent: {
      marginVertical: 10,
      color: color,
    },
  });

  if (orientation === 'vertical') {
    return (
      <View style={[styles.verticalContainer, style]}>
        <View style={styles.verticalLine} />
        {children && (
          <Text style={[styles.verticalContent, textStyle]}>
            {children}
          </Text>
        )}
        <View style={styles.verticalLine} />
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.line} />
      {children && (
        <Text style={[styles.content, textStyle]}>
          {children}
        </Text>
      )}
      <View style={styles.line} />
    </View>
  );
};

export default Divider;
