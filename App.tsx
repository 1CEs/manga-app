import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css';
import { Init } from 'screen/Init';
import { Layout } from 'screen/Layout';

const stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <stack.Navigator>
          <stack.Screen name="Init" component={Init} options={{headerShown: false}} />
          <stack.Screen name="Layout" component={Layout} options={{headerShown: false}} />
        </stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
