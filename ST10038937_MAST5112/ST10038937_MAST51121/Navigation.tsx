import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import Genre from './Genre';
import History from './History';
import home from './home';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainNavigator() {
  return (
<Tab.Navigator>
    <Tab.Screen
    name="HOME"
    component={home}
    options={{
   tabBarIcon: ({ focused, color, size }) => (
   <Image
       source={require('./Home.png')}
     style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="GENRE"
        component={Genre}
        options={{
       tabBarIcon: ({ focused, color, size }) => (
         <Image
        source={require('./Genre.png')}
        style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="HISTORY"
        component={History}
       options={{
       tabBarIcon: ({ focused, color, size }) => (
            <Image
        source={require('./History.png')}
       style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
   <NavigationContainer>
 <Stack.Navigator>
    <Stack.Screen
    name="Main"    component={MainNavigator}
     options={{ headerShown: false }}
     />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



//references
//W3schools.com. (2020). React Tutorial. [online] Available at: https://www.w3schools.com/react/default.asp
//reactnative.dev. (n.d.). Learn the Basics · React Native. [online] Available at: https://reactnative.dev/docs/tutorial.
//Simplilearn.com. (n.d.). Understanding React And Express: (A Comprehensive Guide) | Simplilearn. [online] Available at: https://www.simplilearn.com/tutorials/react-tutorial/guide-to-understanding-react-and-express.
//reactnavigation.org. (n.d.). React Navigation | React Navigation. [online] Available at: https://reactnavigation.org/.
//Yusufu, E. (2022). React Native Navigation: Tutorial with examples. [online] LogRocket Blog. Available at: https://blog.logrocket.com/react-native-navigation-tutorial/.

