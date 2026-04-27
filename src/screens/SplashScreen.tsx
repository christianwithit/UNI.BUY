import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    console.log('Get Started button pressed');
    try {
      navigation.navigate('OnboardingPhone' as never);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const handleLogin = () => {
    console.log('Login button pressed');
    try {
      navigation.navigate('Login' as never);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Background gradient circles */}
      <View style={styles.gradientTop} />
      <View style={styles.gradientBottom} />
      
      {/* Central Identity */}
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>UNI</Text>
          <View style={styles.dotContainer}>
            <View style={styles.orangeDot} />
          </View>
          <Text style={styles.title}>BUY</Text>
        </View>
        <Text style={styles.subtitle}>
          Buy and sell with students near you.
        </Text>
      </View>

      {/* Bottom Action Buttons */}
      <View style={styles.bottomContainer} pointerEvents="box-none">
        <View style={styles.buttonContainer} pointerEvents="box-none">
          <TouchableOpacity 
            style={styles.getStartedButton}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.getStartedText}>Get started</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F6E56', // primary-container
    position: 'relative',
    overflow: 'hidden',
  },
  gradientTop: {
    position: 'absolute',
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width * 0.6,
    backgroundColor: '#005440', // primary
    opacity: 0.3,
    top: -width * 0.3,
    right: -width * 0.2,
  },
  gradientBottom: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: '#086b53', // surface-tint
    opacity: 0.2,
    bottom: width * 0.1,
    left: -width * 0.2,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    paddingBottom: 120,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 48,
    lineHeight: 56,
    letterSpacing: -0.96,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'System',
  },
  dotContainer: {
    width: 12,
    height: 56,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: 2,
    paddingBottom: 8,
  },
  orangeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FCAA33', // secondary orange
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    fontFamily: 'System',
    paddingHorizontal: 40,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 32,
    paddingBottom: 40,
    paddingHorizontal: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 100,
  },
  buttonContainer: {
    gap: 16,
    zIndex: 101,
  },
  getStartedButton: {
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 102,
  },
  getStartedText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
    fontFamily: 'System',
    letterSpacing: 0.1,
  },
  loginButton: {
    height: 56,
    backgroundColor: colors.white,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 102,
  },
  loginText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    fontFamily: 'System',
    letterSpacing: 0.1,
  },
});
