import { Redirect } from 'expo-router';

export default function Index() {
  // Mock session check - replace with real Supabase session check later
  const hasSession = false;

  if (hasSession) {
    return <Redirect href="/(tabs)/" />;
  }

  return <Redirect href="/auth/splash" />;
}
