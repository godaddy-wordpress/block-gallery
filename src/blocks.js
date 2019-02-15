/**
 * WordPress dependencies
 */
const { registerBlockType } = wp.blocks;

// Category slug and title
const category = {
	slug: 'block-gallery',
	title: 'Block Gallery',
};

// Custom foreground icon color based on the Block Gallery branding
const iconColor = '#f05d7b';

// Register block icons
import icons from './utils/block-category';

// Editor and Frontend Styles
import './styles/editor.scss';
import './styles/style.scss';

//  Register Blocks
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

		const { name, icon, settings } = block;

		registerBlockType( `blockgallery/${ name }`, { category: category.slug, icon: { src: icon, foreground: iconColor, }, ...settings } );
	} );
};
registerBlocks();
