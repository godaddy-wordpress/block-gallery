/**
 * External dependencies
 */
import pick from 'lodash/pick';

// Set dim ratio.
export function overlayToClass( ratio ) {
	return ( ratio === 0 || ratio === 50 ) ?
		null :
		'has-background-overlay-' + ( 10 * Math.round( ratio / 10 ) );
}

// Retreive relevant file attributes.
export const pickRelevantMediaFiles = ( image ) => {
	return pick( image, [ 'alt', 'id', 'link', 'url', 'caption' ] );
};

export const ALLOWED_MEDIA_TYPES = [ 'image' ];
