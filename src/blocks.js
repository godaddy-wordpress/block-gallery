/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

// Category slug and title.
const category = {
	slug: 'block-gallery',
	title: __( 'Block Gallery' ),
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
