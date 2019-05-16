=== Block Gallery - Photo Gallery Gutenberg Blocks ===
Author URI: https://www.godaddy.com
Plugin URI: https://wpblockgallery.com
Contributors: richtabor
Tags: blocks, gutenberg, gallery, page builder, gutenberg blocks, editor, photo gallery, masonry, block, slider, carousel
Requires at least: 5.0
Tested up to: 5.2
Requires PHP: 5.2.4
Stable tag: @@pkg.version
License: GPL-2.0
License URI: http://www.gnu.org/licenses/gpl-2.0.html

== Description ==

[Block Gallery](https://wpblockgallery.com?utm_medium=wp.org&utm_source=wordpressorg&utm_campaign=readme&utm_content=block-gallery) is a suite of beautiful gallery Gutenberg blocks for photographers, artists, writers and content marketers. This is the smartest, most powerful photo gallery plugin for WordPress. Block Gallery is absolutely brilliant any way you look at it.

>Good news! Block Gallery was selected as this year’s winner in the Best Solution category of the [Automattic Design Awards](https://automatticdesignaward.blog/2018/12/08/the-winners/) at WordCamp US 2018. 🔥🔥

## A short demo of Block Gallery
[vimeo https://vimeo.com/296746112]

## Unrivaled, in every way
The first of its kind, [Block Gallery](https://wpblockgallery.com?utm_medium=wp.org&utm_source=wordpressorg&utm_campaign=readme&utm_content=block-gallery) offers an unrivaled drag and drop gallery building experience in Gutenberg. Drop your images in your choice of photo gallery block, customize display settings, hit publish.

## Unparalleled capabilities
An innovative transform system lets you instantly change your photos galleries into another form. Go from a fullscreen masonry gallery to a casual carousel, with just a single click. You won't find another Gutenberg gallery plugin with this kind of capability. Guaranteed.

## Highly responsive
Our Gutenberg gallery blocks are second-to-none, featuring fullscale responsive support. And with fine controls for mobile and desktop styles, you can set custom styling for each gallery.

## A Super-fast experience
We've built a highly interactive and intuitive experience with a focus on speed and ease of use. Drag. Drop. Transform. Style.

## Included Gallery Gutenberg Blocks

* Masonry Gallery - ([demo](https://richtabor.com/block-gallery-blocks/?utm_medium=wp.org&utm_source=wordpressorg&utm_campaign=readme&utm_content=block-gallery-masonry-demo#masonry))
* Fullscreen Stacked Gallery - ([demo](https://richtabor.com/block-gallery-blocks/?utm_medium=wp.org&utm_source=wordpressorg&utm_campaign=readme&utm_content=block-gallery-stacked-demo#stacked))
* Carousel Slider - ([demo](https://richtabor.com/block-gallery-blocks/?utm_medium=wp.org&utm_source=wordpressorg&utm_campaign=readme&utm_content=block-gallery-carousel-demo#carousel))

## Works with CoBlocks
If you enjoy Block Gallery, check out [CoBlocks](https://wordpress.org/plugins/coblocks), a suite of page builder WordPress blocks and tools for the Gutenberg editor — also built by Rich. It's fantastic!

== Screenshots ==

1. Masonry Grid block
2. Carousel Slideshow block
3. Stacked Fullwidth block
4. Offset Grid block (Pro Only - coming soon)
5. Auto Height Slider block (Pro Only - coming soon)

== Installation ==

1. Upload the `block-gallery` folder to your `/wp-content/plugins/` directory or alternatively upload the block-gallery.zip file via the plugin page of WordPress by clicking 'Add New' and selecting the zip from your computer.
2. Install and activate the Gutenberg WordPress plugin (if pre WordPress 5.0).
3. Activate the Block Gallery WordPress plugin through the 'Plugins' menu in WordPress.

== Frequently Asked Questions ==

= How do I start using Gutenberg? =
To get the full experience of the next-generation WordPress block editor,  you'll need a Gutenberg-ready WordPress theme, like [Tabor](https://themebeans.com/themes/tabor?utm_medium=block-gallery-lite&utm_source=readme&utm_campaign=readme&utm_content=tabor) or [Stash](https://themebeans.com/themes/stash?utm_medium=block-gallery-lite&utm_source=readme&utm_campaign=readme&utm_content=stash). Then install the [Gutenberg](https://wordpress.org/plugins/gutenberg/) WordPress plugin. That's it! 💥

= What themes work with Block Gallery =
Most WordPress themes that have baked in Gutenberg support will work with Block Gallery. If you’re looking for exceptional themes, check out my theme catalogue at [ThemeBeans](https://themebeans.com?utm_medium=wp.org&utm_source=wordpressorg&utm_campaign=readme&utm_content=block-gallery).

= Is Block Gallery free? =
Yes! Block Gallery's core features are absolutely free.

= Where can I ask for help? =
Please reach out via the official [support forum on WordPress.org](https://wordpress.org/support/plugin/block-gallery/).

== Changelog ==

= 1.1.6 =
* New: Block Gallery now supports WordPress 5.1 and Gutenberg 5.0
* Tweak: Add Block Gallery color to icons within the block inserter

= 1.1.5 =
* Tweak: Use the MediaUploadCheck component to make sure the current user has upload permissions
* Fix: Resolve lodash/isEmpty issue with the npm start command [thanks @mtekk]
* Fix: Resolve issue where image radius styles were not applied to child captions [thanks @wido]

= 1.1.4 =
* New: Add toggles for turning image captions on/off for each block
* New: Add new "none" Caption Style option
* New: Add new options for slider autoplay times up to 10 seconds [thanks @batracy]
* Fix: Resolve translatable placeholder issue in the Slider Settings panel [thanks @morganestes]
* Fix: Resolve translatable invalid HTML issue in the Carousel block [thanks @morganestes]
* Fix: Resolve issue where the Carousel autoplay speed was not functioning properly [thanks @morganestes]
* Fix: Resolve PHP 5.4.16 compatibility issue [thanks @ndcadmin]
* Tweak: Adjust Stacked Inspector interface

= 1.1.3 =
* Fix: Resolve issue where block assets were not loading on the blogroll

= 1.1.2 =
* New: Add minor style touch-ups for the default Twenty Nineteen WordPress theme

= 1.1.1 =
* Tweak: Remove Gutenberg check

= 1.1.0, December 04, 2018 =
* New: Add ability to transform Image blocks to Block Gallery blocks
* New: Add ":" prefix transforms using each blocks' name - i.e. ":masonry",
* New: Load frontend assets only on pages that need them
* New: Add translation strings in /languages/block-gallery.pot
* New: Add support for the WP 5.0 wp_set_script_translations() function
* New: Add styling for the core Twenty Seventeen theme
* New: Add styling for the core Twenty Sixteen theme
* New: Add styling for the core Twenty Fifteen theme
* New: Add styling for the core Twenty Fourteen theme
* New: Add styling for the core Twenty Twelve theme
* New: Add styling for the core Twenty Eleven theme
* New: Add block-gallery-translations.php for referencing PHP translatable strings
* Tweak: Improve grid size responsiveness for the Masonry block
* Tweak: Hide the GalleryUpload component if not selected
* Tweak: Improve Flickity focus styles for better theme compatibility

= 1.0.9 =
Tweak: Use better specificity for figcaption margins
Tweak: Add inherit color for caption link hovers

= 1.0.8 =
* Tweak: Remove unnecessary style dependancies

= 1.0.7 =
* Tweak: Indicate uploading using a spinner
* Tweak: Adjust figcaption margin for better theme compatibility

= 1.0.6 =
* Tweak: Adjust mobile styles for the block inspector controls UI
* Tweak: Adjust UI of SizeControl controls
* Tweak: Adjust pickRelevantMediaFiles
* Tweak: Hide shadow controls if Stacked block is fullwidth
* Tweak: Improve default caption style for Carousel
* Tweak: Tweak mobile styles for Carousel block arrows
* Tweak: Adjust height of Stacked image uploader

= 1.0.5 =
* Tweak: Ensure the last figcaption in the Stacked Block is styled appropriately
* Tweak: Update styling of feedback notice
* Tweak: Improve language of the gallery instructions for placeholders
* Tweak: Tweak icon placement in the placeholder label
* Tweak: Remove caption color that was overriding theme styles
* Tweak: Use register_block_type to check if the block editor is live
* Tweak: Improve UI of the ResponsiveTabsControl component
* Tweak: Add tab navigation support for gallery images
* Tweak: Tweak editor styles for captions

= 1.0.4 =
* Fix: Resolve issue with the Stacked block shadow attribute

= 1.0.3 =
* New: Add support for adding a primary caption to the Carousel block
* New: Add font size option for the Stacked gallery block
* Tweak: Improve UI of the slider arrows within the editor
* Tweak: Improve help language of the Slider Settings panel for better context and understanding
* Tweak: Improve UI of the ResponsiveTabsControl component
* Tweak: Add slider controls to global transforms
* Fix: Improve display of fullwidth images in the Stacked gallery block
* Fix Improved reliablity of the Stacked block when triggering fullwidth imagery
* Fix: Improve display of carousel arrows

= 1.0.2 =
* Tweak: Improve figcaption display
* Tweak: Improve block category registration
* Tweak: Add icon to the block category for Gutenberg 4.2+
* Fix: Color palette colors properly render in the editor

= 1.0.1 =
* New: Improve block registration

= 1.0.0 =
* Initial release on WordPress.org. Enjoy!