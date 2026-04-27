import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handlePress = () => {
    inputRef.current?.focus();
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isFocused && styles.containerFocused,
      ]}
      onPress={handlePress}
      activeOpacity={1}
    >
      <View style={styles.leftSection}>
        <Text style={styles.flag}>🇺🇬</Text>
        <Text style={styles.countryCode}>+256</Text>
        <Ionicons name="chevron-down" size={16} color={colors.textSecondary} />
      </View>
      <View style={styles.divider} />
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder="700 000 000"
        placeholderTextColor={colors.textTertiary}
        keyboardType="phone-pad"
        maxLength={12}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  containerFocused: {
    borderColor: colors.borderFocused,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 3,
  },
  leftSection: {
    width: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    gap: 4,
  },
  flag: {
    fontSize: 20,
  },
  countryCode: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: colors.border,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
    paddingHorizontal: 12,
  },
});
