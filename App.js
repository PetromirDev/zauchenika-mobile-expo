// Global
import 'expo-dev-client'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useFonts } from 'expo-font'
// Helpers
import AuthContextProvider, { useAppContext } from '@context/AuthContext'
// Pages
import Login from '@screens/Login/Login'
import Home from '@screens/Home/Home'
import Groups from '@screens/Groups/Groups'
import Profile from '@screens/Profile/Profile'
import CreateTask from '@screens/CreateTask/CreateTask'
import CreateGroup from '@screens/CreateGroup/CreateGroup'
import Group from '@screens/Group/Group'
// import Notifications from '@screens/Notifications/Notifications'
import Faq from '@screens/Faq/Faq'
import ProfileSettings from '@screens/ProfileSettings/ProfileSettings'
import Task from '@screens/Task/Task'
// import Message from '@screens/Message/Message'

const Stack = createNativeStackNavigator()

function Navigation() {
	const { user, palette } = useAppContext()

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{user ? (
					<Stack.Group
						screenOptions={{
							headerStyle: {
								backgroundColor: palette.background
							},
							headerTintColor: palette.textPrimary,
							headerShown: false
						}}
					>
						<Stack.Screen name='Начало' component={Home} />
						<Stack.Screen name='Групи' component={Groups} />
						<Stack.Screen name='Профил' component={Profile} options={{ headerShown: true }} />
						<Stack.Screen name='Създай задача' component={CreateTask} options={{ headerShown: true }} />
						<Stack.Screen name='Създай група' component={CreateGroup} options={{ headerShown: true }} />
						<Stack.Screen name='Група' component={Group} options={{ headerShown: true }} />
						{/* <Stack.Screen name='Съобщение' component={Message} options={{ headerShown: true }} /> */}
						{/* <Stack.Screen name='Нотификации' component={Notifications} options={{ headerShown: true }} /> */}
						<Stack.Screen name='Често задавани въпроси' component={Faq} options={{ headerShown: true }} />
						<Stack.Screen name='Настройки профил' component={ProfileSettings} options={{ headerShown: true }} />
						<Stack.Screen name='Задача' component={Task} options={{ headerShown: true }} />
					</Stack.Group>
				) : (
					<Stack.Screen name='Вход' component={Login} options={{ headerShown: false }} />
				)}
			</Stack.Navigator>
		</NavigationContainer>
	)
}

function App() {
	const [fontsLoaded] = useFonts({
		'FiraSans-Regular': require('./src/assets/fonts/FiraSans-Regular.otf'),
		'FiraSans-Bold': require('./src/assets/fonts/FiraSans-Bold.otf'),
		'FiraSans-Medium': require('./src/assets/fonts/FiraSans-Medium.otf')
	})

	if (!fontsLoaded) return null

	return (
		<AuthContextProvider>
			<Navigation />
		</AuthContextProvider>
	)
}

export default App
