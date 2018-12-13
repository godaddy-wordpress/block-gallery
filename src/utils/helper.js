/**
 * External dependencies
 */
import pick from 'lodash/pick';
import get from 'lodash/get';

export function overlayToClass( ratio ) {
	return ( ratio === 0 || ratio === 50 ) ?
		null :
		'has-background-overlay-' + ( 10 * Math.round( ratio / 10 ) );
}

export const pickRelevantMediaFiles = ( image ) => {
	const imageProps = pick( image, [ 'alt', 'id', 'link', 'caption', 'type' ] );
	imageProps.url = get( image, [ 'sizes', 'large', 'url' ] ) || get( image, [ 'media_details', 'sizes', 'large', 'source_url' ] ) || image.url;
	return imageProps;
};

export const ALLOWED_MEDIA_TYPES = [ 'image' ];
