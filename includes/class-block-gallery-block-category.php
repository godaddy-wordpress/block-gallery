<?php
/**
 * Load @@pkg.title custom block categories.
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
 * Main @@pkg.title Block Category Class
 *
 * @since 1.0.0
 */
class Block_Gallery_Block_Category {

	/**
	 * This class's instance.
	 *
	 * @var Block_Gallery_Block_Category
	 */
	private static $instance;

	/**
	 * Registers the class.
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new Block_Gallery_Block_Category();
		}
	}

	/**
	 * The Constructor.
	 */
	private function __construct() {
		add_filter( 'block_categories', array( $this, 'block_categories' ) );
	}

	/**
	 * Register our custom block category.
	 *
	 * @access public
	 * @param array $categories All categories.
	 * @link https://wordpress.org/gutenberg/handbook/extensibility/extending-blocks/#managing-block-categories
	 */
	public function block_categories( $categories ) {

		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'block-gallery',
					'title' => __( 'Block Gallery', '@@textdomain' ),
				),
			)
		);
	}
}

Block_Gallery_Block_Category::register();
