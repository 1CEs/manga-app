import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from "./Home";
import { MangaDetail } from "./MangaDetail";
import { ReadChapter } from "./ReadChapter";
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Top') {
            iconName = focused ? 'trending-up' : 'trending-up-outline';
          } else if (route.name === 'All') {
            iconName = focused ? 'albums' : 'albums-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else {
            iconName = 'home';
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: '#00bdff',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: '#161616',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Top" component={Home} />
      <Tab.Screen name="All" component={Home} />
      <Tab.Screen name="Settings" component={Home} />
    </Tab.Navigator>
  );
};

export const Layout = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={TabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MangaDetail"
                component={MangaDetail}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ReadChapter"
                component={ReadChapter}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};
