/**
 * WordPress dependencies
 */
const { getCategories, setCategories } = wp.blocks;

/**
 * Internal dependencies
 */
import icons from './icons';

setCategories( [
	// Add a Block Gallery block category
	{
		slug: 'block-gallery',
		title: 'Block Gallery',
		icon: icons.logo,
	},
	...getCategories().filter( ( { slug } ) => slug !== 'block-gallery' ),
] );
