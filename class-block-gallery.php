<?php
/**
 * Plugin Name: Block Gallery
 * Plugin URI: https://wpblockgallery.com/
 * Description: Block Gallery is a suite of beautiful gallery blocks for the WordPress Gutenberg block editor..
 * Author: Rich Tabor
 * Author URI: https://richtabor.com/
 * Version: 1.1.3
 * Text Domain: @@textdomain
 * Domain Path: /languages
 * Tested up to: @@pkg.tested_up_to
 *
 * @@pkg.title is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with @@pkg.title. If not, see <http://www.gnu.org/licenses/>.
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

if ( ! class_exists( 'Block_Gallery' ) ) :
	/**
	 * Main Block_Gallery Class.
	 *
	 * @since 1.0.0
	 */
	final class Block_Gallery {
		/**
		 * This plugin's instance.
		 *
		 * @var Block_Gallery
		 * @since 1.0.0
		 */
		private static $instance;

		/**
		 * Main Block_Gallery Instance.
		 *
		 * Insures that only one instance of Block_Gallery exists in memory at any one
		 * time. Also prevents needing to define globals all over the place.
		 *
		 * @since 1.0.0
		 * @static
		 * @uses Block_Gallery::constants() Setup the constants needed.
		 * @uses Block_Gallery::includes() Include the required files.
		 * @see WIDGETOPTS()
		 * @return object|Block_Gallery The one true Block_Gallery
		 */
		public static function instance() {
			if ( ! isset( self::$instance ) && ! ( self::$instance instanceof Block_Gallery ) ) {
				self::$instance = new Block_Gallery();
				self::$instance->init();
				self::$instance->constants();
				self::$instance->asset_suffix();
				self::$instance->includes();

			}
			return self::$instance;
		}

		/**
		 * Throw error on object clone.
		 *
		 * The whole idea of the singleton design pattern is that there is a single
		 * object therefore, we don't want the object to be cloned.
		 *
		 * @since 1.0.0
		 * @access protected
		 * @return void
		 */
		public function __clone() {
			// Cloning instances of the class is forbidden.
			_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheating huh?', '@@textdomain' ), '1.0' );
		}

		/**
		 * Disable unserializing of the class.
		 *
		 * @since 1.0.0
		 * @access protected
		 * @return void
		 */
		public function __wakeup() {
			// Unserializing instances of the class is forbidden.
			_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheating huh?', '@@textdomain' ), '1.0' );
		}

		/**
		 * Setup plugin constants.
		 *
		 * @access private
		 * @since 1.0.0
		 * @return void
		 */
		private function constants() {
			$this->define( 'BLOCKGALLERY_DEBUG', true );
			$this->define( 'BLOCKGALLERY_VERSION', '@@pkg.version' );
			$this->define( 'BLOCKGALLERY_HAS_PRO', false );
			$this->define( 'BLOCKGALLERY_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
			$this->define( 'BLOCKGALLERY_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
			$this->define( 'BLOCKGALLERY_PLUGIN_FILE', __FILE__ );
			$this->define( 'BLOCKGALLERY_PLUGIN_BASE', plugin_basename( __FILE__ ) );
			$this->define( 'BLOCKGALLERY_SHOP_URL', 'https://wpblockgallery.com/' );
			$this->define( 'BLOCKGALLERY_REVIEW_URL', 'https://wordpress.org/support/plugin/block-gallery/reviews/' );
		}

		/**
		 * Define constant if not already set.
		 *
		 * @param  string|string $name Name of the definition.
		 * @param  string|bool   $value Default value.
		 */
		private function define( $name, $value ) {
			if ( ! defined( $name ) ) {
				define( $name, $value );
			}
		}

		/**
		 * Include required files.
		 *
		 * @access private
		 * @since 1.0.0
		 * @return void
		 */
		private function includes() {
			require_once BLOCKGALLERY_PLUGIN_DIR . 'includes/class-block-gallery-block-assets.php';
			require_once BLOCKGALLERY_PLUGIN_DIR . 'includes/class-block-gallery-body-classes.php';

			if ( is_admin() || ( defined( 'WP_CLI' ) && WP_CLI ) ) {
				require_once BLOCKGALLERY_PLUGIN_DIR . 'includes/admin/class-block-gallery-url-generator.php';
				require_once BLOCKGALLERY_PLUGIN_DIR . 'includes/admin/class-block-gallery-action-links.php';
				require_once BLOCKGALLERY_PLUGIN_DIR . 'includes/admin/class-block-gallery-footer-text.php';
				require_once BLOCKGALLERY_PLUGIN_DIR . 'includes/admin/class-block-gallery-feedback.php';
			}
		}

		/**
		 * Load actions
		 *
		 * @return void
		 */
		private function init() {
			add_action( 'init', array( $this, 'load_textdomain' ) );
		}

		/**
		 * Change the plugin's minified or src file name, based on debug mode.
		 *
		 * @since 1.0.0
		 */
		public function asset_suffix() {
			if ( true === BLOCKGALLERY_DEBUG ) {
				define( 'BLOCKGALLERY_ASSET_SUFFIX', null );
			} else {
				define( 'BLOCKGALLERY_ASSET_SUFFIX', '.min' );
			}
		}

		/**
		 * If debug is on, serve unminified source assets.
		 *
		 * @since 1.0.0
		 * @param string|string $type The type of resource.
		 * @param string|string $directory Any extra directories needed.
		 */
		public function asset_source( $type = 'js', $directory = null ) {

			if ( 'js' === $type ) {
				if ( true === BLOCKGALLERY_DEBUG ) {
					return BLOCKGALLERY_PLUGIN_URL . 'src/' . $type . '/' . $directory . '/';
				} else {
					return BLOCKGALLERY_PLUGIN_URL . 'dist/' . $type . '/' . $directory . '/';
				}
			} else {
				return BLOCKGALLERY_PLUGIN_URL . 'dist/css/' . $directory;
			}
		}

		/**
		 * Check if pro exists.
		 *
		 * @access public
		 */
		public function has_pro() {
			if ( true === BLOCKGALLERY_HAS_PRO ) {
				return true;
			} else {
				return false;
			}
		}

		/**
		 * Check if pro is activated.
		 *
		 * @access public
		 */
		public function is_pro() {

			if ( class_exists( 'Block_Gallery_Pro' ) ) {
				return true;
			} else {
				return false;
			}
		}

		/**
		 * Loads the plugin language files.
		 *
		 * @access public
		 * @since 1.0.0
		 * @return void
		 */
		public function load_textdomain() {
			load_plugin_textdomain( '@@textdomain', false, dirname( plugin_basename( BLOCKGALLERY_PLUGIN_DIR ) ) . '/languages/' );
		}
	}
endif;

/**
 * The main function for that returns Block_Gallery
 *
 * The main function responsible for returning the one true Block_Gallery
 * Instance to functions everywhere.
 *
 * Use this function like you would a global variable, except without needing
 * to declare the global.
 *
 * Example: <?php $blockgallery = Block_Gallery(); ?>
 *
 * @since 1.0.0
 * @return object|Block_Gallery The one true Block_Gallery Instance.
 */
function block_gallery() {
	return Block_Gallery::instance();
}

// Get the plugin running. Load on plugins_loaded action to avoid issue on multisite.
if ( function_exists( 'is_multisite' ) && is_multisite() ) {
	add_action( 'plugins_loaded', 'block_gallery', 90 );
} else {
	block_gallery();
}
