import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../../constants/colors';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'disabled';
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  fullWidth = true,
}) => {
  const getButtonStyle = () => {
    const baseStyle: any[] = [styles.button];
    if (fullWidth) baseStyle.push(styles.fullWidth);

    switch (variant) {
      case 'primary':
        return { ...StyleSheet.flatten(baseStyle), backgroundColor: colors.primary };
      case 'secondary':
        return {
          ...StyleSheet.flatten(baseStyle),
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: colors.primary,
        };
      case 'disabled':
        return { ...StyleSheet.flatten(baseStyle), backgroundColor: colors.textTertiary };
      default:
        return StyleSheet.flatten(baseStyle);
    }
  };

  const getTextColor = () => {
    return variant === 'secondary' ? colors.primary : colors.white;
  };

  return (
    <Pressable
      style={getButtonStyle()}
      onPress={onPress}
      disabled={variant === 'disabled' || loading}
    >
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }]}>{label}</Text>
      )}
    </Pressable>
  );
};
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
