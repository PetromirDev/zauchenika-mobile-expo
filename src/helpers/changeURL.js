export const resize = (uri, width, height) => {
	if (uri.includes('facebook')) {
		return `${uri}?width=${width}&height=${height}`
	}
	return uri.replace('s96-c', `s${width}-c`)
}

export const changeURL = (uri) => {
	if (!uri) return ''

	try {
		return uri.replace('image.', 'image_400x400.')
	} catch {
		return uri
	}
}
