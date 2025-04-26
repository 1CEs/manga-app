import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css';
import { Init } from 'screen/Init';
import { Layout } from 'screen/Layout';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Init" component={Init} />
          <Stack.Screen name="Layout" component={Layout} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
