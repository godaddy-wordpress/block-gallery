<?php
/**
 * Add body classes to particular themes to help style them.
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
 * Main @@pkg.title Class
 *
 * @since 1.0.0
 */
class Block_Gallery_Body_Classes {

	/**
	 * The Constructor.
	 */
	public function __construct() {
		add_action( 'body_class', array( $this, 'add_theme_class' ) );
		add_action( 'admin_body_class', array( $this, 'add_theme_class_admin' ) );
	}

	/**
	 * Add actions to enqueue assets.
	 *
	 * @access public
	 */
	public function get_theme() {

		// Get the parent theme's name.
		$theme = esc_attr( wp_get_theme( get_template() )->get( 'Name' ) );

		// Replace spaces with hypens, and makes it lowercase for links.
		$theme = strtolower( $theme );
		$theme = str_replace( ' ', '-', $theme );
		$theme = preg_replace( '#[ -]+#', '-', $theme );

		return esc_attr( $theme );
	}

	/**
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @access public
	 */
	public function add_theme_class() {

		// Add a class if selective sharing is enabled.
		if ( 'twenty-seventeen' || 'twenty-sixteen' === $this->get_theme() ) {
			$classes[] = 'is-' . $this->get_theme();
		}

		return $classes;
	}

	/**
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @access public
	 */
	public function add_theme_class_admin() {

		// Add a class if selective sharing is enabled.
		if ( 'twenty-seventeen' || 'twenty-sixteen' === $this->get_theme() ) {
			$classes = 'is-' . $this->get_theme();
		}

		return $classes;
	}
}

new Block_Gallery_Body_Classes();
