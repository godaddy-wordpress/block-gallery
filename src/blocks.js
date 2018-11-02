/**
 * WordPress dependencies
 */
const { registerBlockType } = wp.blocks;

// Register block category.
import icons from './utils/block-category';

// Category slug and title.
const category = {
	slug: 'block-gallery',
	title: 'Block Gallery',
};

/**
 * Utility Editor and Frontend Styles
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Register Blocks
 */
import * as carousel from './blocks/carousel';
import * as masonry from './blocks/masonry';
import * as stacked from './blocks/stacked';

export function registerBlocks () {
	[
		carousel,
		masonry,
		stacked,
	].forEach( ( block ) => {

		if ( ! block ) {
			return;
		}

		const { name, settings } = block;

		registerBlockType( `blockgallery/${ name }`, { category: category.slug, ...settings } );
	} );
};
registerBlocks();
