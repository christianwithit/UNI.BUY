import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FavoritesProvider } from '../contexts/FavoritesContext';
import { CurrentUserProvider } from '../contexts/CurrentUserContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <CurrentUserProvider>
        <FavoritesProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="auth" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </FavoritesProvider>
      </CurrentUserProvider>
    </SafeAreaProvider>
  );
}
