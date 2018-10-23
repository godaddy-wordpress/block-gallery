<?php
/**
 * Modifies the "Thank you" text displayed in the admin footer
 *
 * @package   @@pkg.title
 * @author    @@pkg.author
 * @link      @@pkg.author_uri
 * @license   @@pkg.license
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Generates a link.
 */
class Block_Gallery_Footer_Text {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_filter( 'admin_footer_text', array( $this, 'admin_footer_text' ) );
	}

	/**
	 * Admin footer text.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param string $footer_text The content that will be printed.
	 *
	 * @return string The content that will be printed.
	 */
	public function admin_footer_text( $footer_text ) {
		global $pagenow, $post_type;

		if ( ! in_array( $pagenow, array( 'edit.php' ), true ) ) {
			return $footer_text;
		}

		$footer_text = sprintf(
			/* translators: 1: Block Architect, 2: Link to plugin review */
			__( 'Enjoying %1$s? Please leave a %2$s rating — we appreciate your support!', '@@textdomain' ),
			'Block Gallery',
			'<a href="' . esc_url( BLOCKGALLERY_REVIEW_URL ) . '" target="_blank">&#9733;&#9733;&#9733;&#9733;&#9733;</a>'
		);

		return $footer_text;
	}
}

new Block_Gallery_Footer_Text();
