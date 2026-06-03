import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import JournalScreen from './screens/JournalScreen';
import ArchiveScreen from './screens/ArchiveScreen';
import GoalsScreen from './screens/GoalsScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [auth, setAuth] = useState({ token: null, user: null });

  const handleLogin = ({ token, user }) => {
    setAuth({ token, user });
  };

  const handleLogout = () => {
    setAuth({ token: null, user: null });
  };

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName={auth.token ? 'Home' : 'Login'}
        screenOptions={{
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#fff',
          contentStyle: { backgroundColor: '#e7f0ff' }
        }}
      >
        {!auth.token ? (
          <>
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen name="Register">
              {(props) => <RegisterScreen {...props} onLogin={handleLogin} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Home">
              {(props) => <HomeScreen {...props} user={auth.user} />}
            </Stack.Screen>
            <Stack.Screen name="Goals">
              {(props) => <GoalsScreen {...props} user={auth.user} token={auth.token} />}
            </Stack.Screen>
            <Stack.Screen name="Profile">
              {(props) => <ProfileScreen {...props} user={auth.user} token={auth.token} onLogout={handleLogout} />}
            </Stack.Screen>
            <Stack.Screen name="Journal">
              {(props) => <JournalScreen {...props} user={auth.user} token={auth.token} />}
            </Stack.Screen>
            <Stack.Screen name="Archive">
              {(props) => <ArchiveScreen {...props} user={auth.user} token={auth.token} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
