import React from 'react'
import { View } from 'react-native'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads'
import PropTypes from 'prop-types'
// Helpers
import { pxH } from '@helpers'

function FullBanner({ id, personalized }) {
	const adUnitId = __DEV__ ? TestIds.BANNER : id

	return (
		<View style={{ height: pxH(60) }}>
			<BannerAd
				unitId={adUnitId}
				size={BannerAdSize.FULL_BANNER}
				requestOptions={{
					requestNonPersonalizedAdsOnly: personalized
				}}
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
