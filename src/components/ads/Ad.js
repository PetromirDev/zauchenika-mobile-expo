import React from 'react'
import { View } from 'react-native'
import { MyText } from '@components/common'
import { useAppContext } from '@context/AuthContext'
import { pxH } from '@helpers'

export default function Ad() {
	const { palette } = useAppContext()

	return (
		<View
			style={{
				height: pxH(60.7),
				width: '100%',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: palette.backgroundSecondary
			}}
		>
			<MyText text='Място за реклама' color={palette.textSecondary} />
		</View>
	)
}
