/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Link options.
 */
const autoPlayOptions = [
	{ value: 1000, label: __( 'One Second' ) },
	{ value: 2000, label: __( 'Two Seconds' ) },
	{ value: 3000, label: __( 'Three Seconds' ) },
	{ value: 4000, label: __( 'Four Seconds' ) },
	{ value: 5000, label: __( 'Five Seconds' ) },
];

export default autoPlayOptions;