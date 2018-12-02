<?php
/**
 * Load @@pkg.title block assets.
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
class Block_Gallery_Block_Assets {


	/**
	 * This plugin's instance.
	 *
	 * @var Block_Gallery_Block_Assets
	 */
	private static $instance;

	/**
	 * Registers the plugin.
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new Block_Gallery_Block_Assets();
		}
	}

	/**
	 * The base directory path (without trailing slash).
	 *
	 * @var string $_url
	 */
	private $_dir;

	/**
	 * The base URL path (without trailing slash).
	 *
	 * @var string $_url
	 */
	private $_url;

	/**
	 * The Plugin version.
	 *
	 * @var string $_version
	 */
	private $_version;

	/**
	 * The Plugin version.
	 *
	 * @var string $_slug
	 */
	private $_slug;

	/**
	 * The Constructor.
	 */
	private function __construct() {
		$this->_version = BLOCKGALLERY_VERSION;
		$this->_slug    = 'block-gallery';
		$this->_dir     = untrailingslashit( plugin_dir_path( '/', __FILE__ ) );
		$this->_url     = untrailingslashit( plugins_url( '/', dirname( __FILE__ ) ) );

		add_action( 'init', array( $this, 'register_blocks' ), 99 );
		add_action( 'init', array( $this, 'block_assets' ) );
		add_action( 'init', array( $this, 'editor_assets' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'frontend_scripts' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'localization' ) );
	}

	/**
	 * Add actions to enqueue assets.
	 *
	 * @access public
	 */
	public function register_blocks() {

		// Return early if this function does not exist.
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}

		// Shortcut for the slug.
		$slug = $this->_slug;

		register_block_type(
			'blockgallery/carousel',
			array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend',
			)
		);
		register_block_type(
			'blockgallery/masonry',
			array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend',
			)
		);

		register_block_type(
			'blockgallery/stacked',
			array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend',
			)
		);
	}

	/**
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @access public
	 */
	public function block_assets() {

		// Styles.
		wp_register_style(
			$this->_slug . '-frontend',
			$this->_url . '/dist/blocks.style.build.css',
			array(),
			$this->_version
		);
	}

	/**
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @access public
	 */
	public function editor_assets() {

		// Styles.
		wp_register_style(
			$this->_slug . '-editor',
			$this->_url . '/dist/blocks.editor.build.css',
			array(),
			$this->_version
		);

		// Scripts.
		wp_register_script(
			$this->_slug . '-editor',
			$this->_url . '/dist/blocks.build.js',
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-plugins', 'wp-components', 'wp-edit-post', 'wp-api' ),
			$this->_version,
			true
		);
	}

	/**
	 * Enqueue front-end assets for blocks.
	 *
	 * @access public
	 */
	public function frontend_scripts() {

		global $post;

		// Define where the asset is loaded from.
		$dir = Block_Gallery()->asset_source( 'js' );

		// Define where the vendor asset is loaded from.
		$vendors_dir = Block_Gallery()->asset_source( 'js', 'vendors' );

		// Masonry block.
		if ( null !== $post->post_content && strpos( $post->post_content, 'wp-block-blockgallery-masonry' ) ) {
			wp_enqueue_script(
				$this->_slug . '-masonry',
				$dir . $this->_slug . '-masonry' . BLOCKGALLERY_ASSET_SUFFIX . '.js',
				array( 'jquery', 'masonry', 'imagesloaded' ),
				$this->_version,
				true
			);
		}

		// Carousel block.
		if ( null !== $post->post_content && strpos( $post->post_content, 'wp-block-blockgallery-carousel' ) ) {
			wp_enqueue_script(
				'block-gallery-carousel',
				$vendors_dir . 'flickity' . BLOCKGALLERY_ASSET_SUFFIX . '.js',
				array( 'jquery' ),
				$this->_version,
				true
			);
		}
	}

	/**
	 * Enqueue Jed-formatted localization data.
	 *
	 * @access public
	 */
	public function localization() {

		// Check if this function exists.
		if ( ! function_exists( 'gutenberg_get_jed_locale_data' ) ) {
			return;
		}

		$locale  = gutenberg_get_jed_locale_data( $this->_slug );
		$content = 'wp.i18n.setLocaleData( ' . wp_json_encode( $locale ) . ' );';

		wp_script_add_data( $this->_slug . '-editor', 'data', $content );
	}
}

Block_Gallery_Block_Assets::register();
