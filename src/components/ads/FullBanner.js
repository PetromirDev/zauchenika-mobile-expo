import React from 'react'
import { BannerAd, BannerAdSize } from '@react-native-admob/admob'
import PropTypes from 'prop-types'
import { View } from 'react-native'
// Helpers
import { pxH } from '@helpers'

function FullBanner({ id, personalized }) {
	return (
		<View style={{ height: pxH(60) }}>
			<BannerAd
				size={BannerAdSize.ADAPTIVE_BANNER}
				unitId={id}
				requestOptions={{ requestNonPersonalizedAdsOnly: !personalized }}
			/>
		</View>
	)
}

export default FullBanner

FullBanner.propTypes = {
	id: PropTypes.string.isRequired,
	personalized: PropTypes.bool
}

FullBanner.defaultProps = {
	personalized: false
}
