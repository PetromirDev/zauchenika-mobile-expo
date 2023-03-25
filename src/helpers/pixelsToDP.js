import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

export const pxH = (pixels) => hp(pixels / 8)
export const pxW = (pixels) => wp(pixels / 4)
