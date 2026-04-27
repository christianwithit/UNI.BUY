import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { colors } from '../../constants/colors';

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

const { width: screenWidth } = Dimensions.get('window');
const BOX_WIDTH = (screenWidth - 64 - 50) / 6;

export const OtpInput: React.FC<OtpInputProps> = ({ value, onChange, error = false }) => {
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const [digits, setDigits] = useState<string[]>(Array(6).fill(''));

  useEffect(() => {
    const newDigits = value.split('').concat(Array(6).fill('')).slice(0, 6);
    setDigits(newDigits);
  }, [value]);

  useEffect(() => {
    if (error) {
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [error]);

  const handleChangeText = (text: string, index: number) => {
    if (text.length > 1) {
      // Handle paste
      const pastedDigits = text.slice(0, 6).split('');
      const newDigits = [...digits];
      pastedDigits.forEach((digit, i) => {
        if (index + i < 6) {
          newDigits[index + i] = digit;
        }
      });
      onChange(newDigits.join(''));
      const nextIndex = Math.min(index + pastedDigits.length, 5);
      inputRefs.current[nextIndex]?.focus();
    } else {
      const newDigits = [...digits];
      newDigits[index] = text;
      onChange(newDigits.join(''));

      if (text && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateX: shakeAnimation }] },
      ]}
    >
      {digits.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          style={[
            styles.box,
            error && styles.boxError,
            { width: BOX_WIDTH },
          ]}
          value={digit}
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus
          textAlign="center"
        />
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  box: {
    height: 58,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  boxError: {
    borderColor: colors.danger,
    backgroundColor: colors.dangerLight,
  },
});
