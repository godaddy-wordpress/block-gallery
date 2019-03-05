/**
 * External dependencies
 */
import isEmpty from 'lodash/isEmpty';

/**
 * Internal dependencies
 */
import ResponsiveTabsControl from '../../components/responsive-tabs-control';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { withColors, ColorPalette, PanelColorSettings } = wp.editor;
const { SelectControl, RangeControl, ToggleControl, PanelBody, Button, FocalPointPicker } = wp.components;

class BackgroundPanel extends Component {

	constructor() {
		super( ...arguments );
		this.setBackgroundPaddingTo = this.setBackgroundPaddingTo.bind( this );
		this.setBackgroundPaddingMobileTo = this.setBackgroundPaddingMobileTo.bind( this );
		this.getColors = this.getColors.bind( this );
	}

	setBackgroundPaddingTo( value ) {
		this.props.setAttributes( { backgroundPadding: value } );

		if ( this.props.attributes.backgroundPadding <= 0 ) {
			this.props.setAttributes( {
				backgroundRadius: 0,
			} );
		}

	}

	setBackgroundPaddingMobileTo( value ) {
		this.props.setAttributes( { backgroundPaddingMobile: value } );
	}

	getColors() {

		const {
			backgroundColor,
			setBackgroundColor,
			captionColor,
			setCaptionColor,
			hasCaption,
			attributes,
		} = this.props;

		const {
			backgroundImg,
			backgroundPadding,
			backgroundPaddingMobile,
		} = attributes;

		const background = [
			{
				value: backgroundColor.color,
				onChange: ( nextBackgroundColor ) => {

					setBackgroundColor( nextBackgroundColor );

					// Add default padding, if they are not yet present.
					if ( ! backgroundPadding && ! backgroundPaddingMobile  ) {
						this.props.setAttributes( {
							backgroundPadding: 30,
							backgroundPaddingMobile: 30,
						} );
					}

					// Reset when cleared.
					if ( ! nextBackgroundColor && ! backgroundImg ) {
						this.props.setAttributes( {
							backgroundPadding: 0,
							backgroundPaddingMobile: 0,
						} );
					}
				},
				label: __( 'Background Color' ),
			},
		];

		const caption = [
			{
				value: captionColor.color,
				onChange: setCaptionColor,
				label: __( 'Caption Text Color' ),
			},
		];

		if ( hasCaption ) {
			return background.concat( caption );
		} else {
			return background;
		}
	}

	render() {

		const {
			attributes,
			setAttributes,
			backgroundColor,
			setBackgroundColor,
			captionColor,
			setCaptionColor,
		} = this.props;

		const {
			focalPoint,
			align,
			backgroundPosition,
			backgroundRepeat,
			backgroundSize,
			backgroundOverlay,
			backgroundPadding,
			backgroundPaddingMobile,
			hasParallax,
			backgroundImg,
			backgroundRadius,
		} = attributes;

		const backgroundPositionOptions = [
			{ value: 'top left', label: __( 'Top Left' ) },
			{ value: 'top center', label: __( 'Top Center' ) },
			{ value: 'top right', label: __( 'Top Right' ) },
			{ value: 'center left', label: __( 'Center Left' ) },
			{ value: 'center center', label: __( 'Center Center' ) },
			{ value: 'center right', label: __( 'Center Right' ) },
			{ value: 'bottom left', label: __( 'Bottom Left' ) },
			{ value: 'bottom center', label: __( 'Bottom Center' ) },
			{ value: 'bottom right', label: __( 'Bottom Right' ) },
		];

		const backgroundRepeatOptions = [
			{ value: 'no-repeat', label: __( 'No Repeat' ) },
			{ value: 'repeat', label: __( 'Repeat' ) },
			{ value: 'repeat-x', label: __( 'Repeat Horizontally' ) },
			{ value: 'repeat-y', label: __( 'Repeat Vertically' ) },
		];

		const backgroundSizeOptions = [
			{ value: 'auto', label: __( 'Auto' ) },
			{ value: 'cover', label: __( 'Cover' ) },
			{ value: 'contain', label: __( 'Contain' ) },
		];

		const backgroundSizeDefault = ( typeof options !== 'undefined' && typeof options.backgroundSize !== 'undefined' ) ? options.backgroundSize : 'cover';

		const onSelectRepeat = ( backgroundRepeat ) => {

			if ( backgroundRepeat === 'no-repeat' ) {
				setAttributes( {
					backgroundRepeat: backgroundRepeat,
					backgroundSize: 'cover',
				} );
			} else {
				setAttributes( {
					backgroundRepeat: backgroundRepeat,
					backgroundSize: 'contain',
					focalPoint: undefined,
				} );
			}
		}

		return (
			<Fragment>
				<PanelColorSettings
					title={ __( 'Color Settings' ) }
					initialOpen={ false }
					colorSettings={ this.getColors() }
				>
				</PanelColorSettings>
				{ ( ! isEmpty( backgroundImg ) || ! isEmpty( backgroundColor.color ) ) && (
					<PanelBody
						title={ __( 'Background Settings' ) }
						initialOpen={ false }
						className="components-panel__body--blockgallery-background-panel"
					>
						<ResponsiveTabsControl { ...this.props }
							label={ __( 'Padding' ) }
							value={ backgroundPadding }
							valueMobile={ backgroundPaddingMobile }
							onChange={ this.setBackgroundPaddingTo }
							onChangeMobile={ this.setBackgroundPaddingMobileTo }
							min={ 5 }
							max={ 100 }
						/>
						{ ( ( ! isEmpty( backgroundImg ) || ! isEmpty( backgroundColor.color ) ) && backgroundPadding > 0 ) && align != 'full' &&
							<RangeControl
								label={ __( 'Rounded Corners' ) }
								value={ backgroundRadius }
								onChange={ ( nextBackgroundRadius ) => setAttributes( {  backgroundRadius: nextBackgroundRadius } ) }
								min={ 0 }
								max={ 20 }
								step={ 1 }
							/>
						}
						{ backgroundImg && (
							<Fragment>
								<ToggleControl
									label={ __( 'Fixed Background' ) }
									className='components-blockgallery-inspector__background-parallax'
									checked={ !! hasParallax }
									onChange={ () => setAttributes( {  hasParallax: ! hasParallax } ) }
								/>
								{ ! hasParallax && FocalPointPicker && backgroundRepeat !== 'repeat' && (
									<FocalPointPicker
										label={ __( 'Focal Point' ) }
										url={ backgroundImg }
										value={ focalPoint }
										onChange={ ( value ) => setAttributes( { focalPoint: value } ) }
										className="components-focal-point-picker--blockgallery"
									/>
								) }
								<RangeControl
									label={ __( 'Background Opacity' ) }
									className='components-blockgallery-inspector__background-image-overlay'
									value={ backgroundOverlay }
									onChange={ ( nextBackgroundOverlay ) => setAttributes( {  backgroundOverlay: nextBackgroundOverlay } ) }
									min={ 0 }
									max={ 90 }
									step={ 10 }
								/>
								<SelectControl
									label={ __( 'Repeat' ) }
									className="components-background-display-select--blockgallery"
									value={ backgroundRepeat ? backgroundRepeat : 'no-repeat' }
									options={ backgroundRepeatOptions }
									onChange={ ( nextbackgroundRepeat ) => onSelectRepeat( nextbackgroundRepeat ) }
								/>
								{ ! FocalPointPicker && (
									<SelectControl
										label={ __( 'Position' ) }
										className='components-blockgallery-inspector__background-position'
										value={ backgroundPosition ? backgroundPosition : 'center center' }
										options={ backgroundPositionOptions }
										onChange={ ( nextbackgroundPosition ) => setAttributes( { backgroundPosition: nextbackgroundPosition } ) }
									/>
								) }
								<SelectControl
									label={ __( 'Display' ) }
									className='components-blockgallery-inspector__background-size'
									value={ backgroundSize ? backgroundSize : backgroundSizeDefault }
									options={ backgroundSizeOptions }
									onChange={ ( nextbackgroundSize ) => setAttributes( { backgroundSize: nextbackgroundSize } ) }
								/>
								<Button
									isLarge
									className='components-button--blockgallery-remove-background-image'
									type="button"
									isDefault
									label={ __( 'Remove background Image' ) }
									onClick={ () => {
										setAttributes( {
											backgroundImg: '',
											backgroundOverlay: 0,
											backgroundRepeat: 'no-repeat',
											backgroundPosition: '',
											backgroundSize: 'cover',
											hasParallax: false,
										} );

										if ( ! backgroundColor ) {
											setAttributes( {
												backgroundPadding: 0,
												backgroundPaddingMobile: 0,
											} );
										}
									} }
								>
									{ __( 'Remove Image' ) }
								</Button>
							</Fragment>
						) }
					</PanelBody>
				) }
			</Fragment>
		);
	}
}

export default compose( [
	withColors( { backgroundColor : 'background-color', captionColor : 'color' } ),
] )( BackgroundPanel );
