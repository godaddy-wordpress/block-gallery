<?php
/**
 * Plugin review class.
 * Prompts users to give a review of the plugin on WordPress.org after a period of usage.
 *
 * Heavily based on code by Rhys Wynne
 * https://winwar.co.uk/2014/10/ask-wordpress-plugin-reviews-week/
 *
 * @package   @@pkg.title
 * @author    @@pkg.author
 * @license   @@pkg.license
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Main @@pkg.title Feedback Notice Class
 */
class Block_Gallery_Feedback {

	/**
	 * Slug.
	 *
	 * @var string $slug
	 */
	private $slug;

	/**
	 * Name.
	 *
	 * @var string $name
	 */
	private $name;

	/**
	 * Time limit.
	 *
	 * @var string $time_limit
	 */
	private $time_limit;

	/**
	 * No Bug Option.
	 *
	 * @var string $nobug_option
	 */
	public $nobug_option;

	/**
	 * Activation Date Option.
	 *
	 * @var string $date_option
	 */
	public $date_option;

	/**
	 * Class constructor.
	 *
	 * @param string $args Arguments.
	 */
	public function __construct( $args ) {

		$this->slug = $args['slug'];
		$this->name = $args['name'];

		$this->date_option  = $this->slug . '_activation_date';
		$this->nobug_option = $this->slug . '_no_bug';

		if ( isset( $args['time_limit'] ) ) {
			$this->time_limit = $args['time_limit'];
		} else {
			$this->time_limit = WEEK_IN_SECONDS;
		}

		// Add actions.
		add_action( 'admin_init', array( $this, 'check_installation_date' ) );
		add_action( 'admin_init', array( $this, 'set_no_bug' ), 5 );
	}

	/**
	 * Seconds to words.
	 *
	 * @param string $seconds Seconds in time.
	 */
	public function seconds_to_words( $seconds ) {

		// Get the years.
		$years = ( intval( $seconds ) / YEAR_IN_SECONDS ) % 100;
		if ( $years > 1 ) {
			/* translators: Number of years */
			return sprintf( __( '%s years', '@@textdomain' ), $years );
		} elseif ( $years > 0 ) {
			return __( 'a year', '@@textdomain' );
		}

		// Get the weeks.
		$weeks = ( intval( $seconds ) / WEEK_IN_SECONDS ) % 52;
		if ( $weeks > 1 ) {
			/* translators: Number of weeks */
			return sprintf( __( '%s weeks', '@@textdomain' ), $weeks );
		} elseif ( $weeks > 0 ) {
			return __( 'a week', '@@textdomain' );
		}

		// Get the days.
		$days = ( intval( $seconds ) / DAY_IN_SECONDS ) % 7;
		if ( $days > 1 ) {
			/* translators: Number of days */
			return sprintf( __( '%s days', '@@textdomain' ), $days );
		} elseif ( $days > 0 ) {
			return __( 'a day', '@@textdomain' );
		}

		// Get the hours.
		$hours = ( intval( $seconds ) / HOUR_IN_SECONDS ) % 24;
		if ( $hours > 1 ) {
			/* translators: Number of hours */
			return sprintf( __( '%s hours', '@@textdomain' ), $hours );
		} elseif ( $hours > 0 ) {
			return __( 'an hour', '@@textdomain' );
		}

		// Get the minutes.
		$minutes = ( intval( $seconds ) / MINUTE_IN_SECONDS ) % 60;
		if ( $minutes > 1 ) {
			/* translators: Number of minutes */
			return sprintf( __( '%s minutes', '@@textdomain' ), $minutes );
		} elseif ( $minutes > 0 ) {
			return __( 'a minute', '@@textdomain' );
		}

		// Get the seconds.
		$seconds = intval( $seconds ) % 60;
		if ( $seconds > 1 ) {
			/* translators: Number of seconds */
			return sprintf( __( '%s seconds', '@@textdomain' ), $seconds );
		} elseif ( $seconds > 0 ) {
			return __( 'a second', '@@textdomain' );
		}
	}

	/**
	 * Check date on admin initiation and add to admin notice if it was more than the time limit.
	 */
	public function check_installation_date() {

		if ( ! get_site_option( $this->nobug_option ) || false === get_site_option( $this->nobug_option ) ) {

			add_site_option( $this->date_option, time() );

			// Retrieve the activation date.
			$install_date = get_site_option( $this->date_option );

			// If difference between install date and now is greater than time limit, then display notice.
			if ( ( time() - $install_date ) > $this->time_limit ) {
				add_action( 'admin_notices', array( $this, 'display_admin_notice' ) );
			}
		}
	}

	/**
	 * Display the admin notice.
	 */
	public function display_admin_notice() {

		$screen = get_current_screen();

		if ( isset( $screen->base ) && 'plugins' === $screen->base ) {
			$no_bug_url = wp_nonce_url( admin_url( '?' . $this->nobug_option . '=true' ), 'blockgallery-feedback-nounce' );
			$time       = $this->seconds_to_words( time() - get_site_option( $this->date_option ) );
		?>

		<style>
		.notice.blockgallery-notice {
			border-left-color: #F97BA0 !important;
			padding: 20px;
		}
		.rtl .notice.blockgallery-notice {
			border-right-color: #F97BA0 !important;
		}
		.notice.notice.blockgallery-notice .blockgallery-notice-inner {
			display: table;
			width: 100%;
		}
		.notice.blockgallery-notice .blockgallery-notice-inner .blockgallery-notice-icon,
		.notice.blockgallery-notice .blockgallery-notice-inner .blockgallery-notice-content,
		.notice.blockgallery-notice .blockgallery-notice-inner .blockgallery-install-now {
			display: table-cell;
			vertical-align: middle;
		}
		.notice.blockgallery-notice .blockgallery-notice-icon {
			color: #509ed2;
			font-size: 50px;
			width: 60px;
		}
		.notice.blockgallery-notice .blockgallery-notice-icon img {
			width: 64px;
		}
		.notice.blockgallery-notice .blockgallery-notice-content {
			padding: 0 40px 0 20px;
		}
		.notice.blockgallery-notice p {
			padding: 0;
			margin: 0;
		}
		.notice.blockgallery-notice h3 {
			margin: 0 0 5px;
		}
		.notice.blockgallery-notice .blockgallery-install-now {
			text-align: center;
		}
		.notice.blockgallery-notice .blockgallery-install-now .blockgallery-install-button {
			padding: 6px 50px;
			height: auto;
			line-height: 20px;
			background: #F97BA0;
			border-color: #F97BA0 #F97BA0 #F97BA0;
			box-shadow: 0 1px 0 #F97BA0;
			text-shadow: 0 -1px 1px #F97BA0, 1px 0 1px #F97BA0, 0 1px 1px #F97BA0, -1px 0 1px #F97BA0;
		}
		.notice.blockgallery-notice .blockgallery-install-now .blockgallery-install-button:hover {
			background: #f989a9;
		}
		.notice.blockgallery-notice a.no-thanks {
			display: block;
			margin-top: 10px;
			color: #72777c;
			text-decoration: none;
		}

		.notice.blockgallery-notice a.no-thanks:hover {
			color: #444;
		}

		@media (max-width: 767px) {

			.notice.notice.blockgallery-notice .blockgallery-notice-inner {
				display: block;
			}
			.notice.blockgallery-notice {
				padding: 20px !important;
			}
			.notice.blockgallery-noticee .blockgallery-notice-inner {
				display: block;
			}
			.notice.blockgallery-notice .blockgallery-notice-inner .blockgallery-notice-content {
				display: block;
				padding: 0;
			}
			.notice.blockgallery-notice .blockgallery-notice-inner .blockgallery-notice-icon {
				display: none;
			}

			.notice.blockgallery-notice .blockgallery-notice-inner .blockgallery-install-now {
				margin-top: 20px;
				display: block;
				text-align: left;
			}

			.notice.blockgallery-notice .blockgallery-notice-inner .no-thanks {
				display: inline-block;
				margin-left: 15px;
			}
		}
		</style>
		<div class="notice updated blockgallery-notice">
			<div class="blockgallery-notice-inner">
				<div class="blockgallery-notice-icon">
					<?php /* translators: 1. Name */ ?>
					<img src="https://ps.w.org/block-gallery/assets/icon-256x256.jpg" alt="<?php printf( esc_attr__( '%1$s WordPress Plugin', '@@textdomain' ), esc_attr( $this->name ) ); ?>" />
				</div>
				<div class="blockgallery-notice-content">
					<?php /* translators: 1. Name */ ?>
					<h3><?php printf( esc_html__( 'Are you enjoying %1$s?', '@@textdomain' ), esc_html( $this->name ) ); ?></h3>
					<p>
						<?php /* translators: 1. Name, 2. Time */ ?>
						<?php printf( esc_html__( 'You have been using %1$s for %2$s now! Mind leaving a quick review to let us know know what you think? I\'d really appreciate it!', '@@textdomain' ), esc_html( $this->name ), esc_html( $time ) ); ?>
					</p>
				</div>
				<div class="blockgallery-install-now">
					<?php printf( '<a href="%1$s" class="button button-primary blockgallery-install-button" target="_blank">%2$s</a>', esc_url( BLOCKGALLERY_REVIEW_URL ), esc_html__( 'Leave a Review', '@@textdomain' ) ); ?>
					<a href="<?php echo esc_url( $no_bug_url ); ?>" class="no-thanks"><?php echo esc_html__( 'No thanks / I already have', '@@textdomain' ); ?></a>
				</div>
			</div>
		</div>
		<?php
		}
	}

	/**
	 * Set the plugin to no longer bug users if user asks not to be.
	 */
	public function set_no_bug() {

		// Bail out if not on correct page.
		if ( ! isset( $_GET['_wpnonce'] ) || ( ! wp_verify_nonce( $_GET['_wpnonce'], 'blockgallery-feedback-nounce' ) || ! is_admin() || ! isset( $_GET[ $this->nobug_option ] ) || ! current_user_can( 'manage_options' ) ) ) {
			return;
		}

		add_site_option( $this->nobug_option, true );
	}
}

/*
* Instantiate the Block_Gallery_Feedback class.
*/
new Block_Gallery_Feedback(
	array(
		'slug'       => 'blockgallery_plugin_feedback',
		'name'       => 'Block Gallery',
		'time_limit' => WEEK_IN_SECONDS,
	)
);
