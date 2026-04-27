import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { colors } from '../../constants/colors';

interface ProgressBarProps {
  steps: number;
  current: number;
  style?: any;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ steps, current, style }) => {
  const animatedValues = useRef(
    Array.from({ length: steps }, () => new Animated.Value(0))
  ).current;

  useEffect(() => {
    animatedValues.forEach((animValue, index) => {
      if (index < current) {
        Animated.timing(animValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }).start();
      } else {
        animValue.setValue(0);
      }
    });
  }, [current]);

  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: steps }).map((_, index) => (
        <View key={index} style={styles.segmentContainer}>
          <View style={styles.segmentBackground} />
          <Animated.View
            style={[
              styles.segmentFill,
              {
                width: animatedValues[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 6,
  },
  segmentContainer: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    position: 'relative',
  },
  segmentBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.border,
  },
  segmentFill: {
    position: 'absolute',
    height: '100%',
    backgroundColor: colors.primary,
  },
});
