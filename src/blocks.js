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
 * @@pkg.title Blocks
 *
 * All blocks related JavaScript files should be imported here.
 * You can create a new block folder in this dir and include code
 * for that block here as well.
 *
 * All blocks should be included here since this is the file that
 * Webpack is compiling as the input file.
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
