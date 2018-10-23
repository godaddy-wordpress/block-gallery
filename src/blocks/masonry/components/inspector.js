/**
 * Internal dependencies
 */
import { blockName } from '../'
import ResponsiveTabsControl from '../../../components/responsive-tabs-control';
import linkOptions from '../../../utils/link-options';
import captionOptions from '../../../utils/caption-options';
import SizeControl from '../../../components/size-control';
import { LightboxControl } from '../../../components/lightbox';
import { BackgroundPanel } from '../../../components/background';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, RangeControl, ToggleControl, SelectControl } = wp.components;

/**
 * Inspector controls
 */
class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
		this.setSizeControl = this.setSizeControl.bind( this );
		this.setLinkTo = this.setLinkTo.bind( this );
		this.setRadiusTo = this.setRadiusTo.bind( this );
		this.setCaptionStyleTo = this.setCaptionStyleTo.bind( this );
	}

	componentDidUpdate( prevProps ) {
		if ( this.props.attributes.gutter <= 0 ) {
			this.props.setAttributes( {
				radius: 0,
			} );
		}
	}

	setLinkTo( value ) {
		this.props.setAttributes( { linkTo: value } );
	}

	setRadiusTo( value ) {
		this.props.setAttributes( { radius: value } );
	}

	setSizeControl( value ) {
		this.props.setAttributes( { gridSize: value } );
	}

	setCaptionStyleTo( value ) {
		this.props.setAttributes( { captionStyle: value } );
	}

	render() {

		const {
			attributes,
			setAttributes,
			isSelected,
		} = this.props;

		const {
			align,
			captionStyle,
			gridSize,
			gutter,
			images,
			lightbox,
			linkTo,
			radius,
		} = attributes;

		return (
			isSelected && (
				<Fragment>
					<InspectorControls>
						<PanelBody title={ sprintf( __( '%s Settings' ), blockName ) }>
							<SizeControl { ...this.props }
								type={ 'grid' }
								onChange={ this.setSizeControl }
								value={ gridSize }
								resetValue={ 'xlrg' }
							/>
							<ResponsiveTabsControl { ...this.props }/>
							{ gutter > 0 && <RangeControl
								label={ __( 'Rounded Corners' ) }
								aria-label={ __( 'Add rounded corners to the gallery items.' ) }
								value={ radius }
								onChange={ this.setRadiusTo }
								min={ 0 }
								max={ 20 }
								step={ 1 }
							/> }
							<LightboxControl { ...this.props } />
							{ ! lightbox && <SelectControl
								label={ __( 'Link To' ) }
								value={ linkTo }
								onChange={ this.setLinkTo }
								options={ linkOptions }
							/> }
							<SelectControl
								label={ __( 'Caption style' ) }
								value={ captionStyle }
								onChange={ this.setCaptionStyleTo }
								options={ captionOptions }
							/>
						</PanelBody>
						<BackgroundPanel { ...this.props }
							hasCaption={ true }
						/>
					</InspectorControls>
				</Fragment>
			)
		)
	}
};

export default Inspector;
