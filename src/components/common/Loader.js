import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useAppContext } from '@context/AuthContext'

export default function Loader() {
	const { palette } = useAppContext()
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				backgroundColor: palette.background
			}}
		>
			<ActivityIndicator size='large' color={palette.textSecondary} />
		</View>
	)
}
