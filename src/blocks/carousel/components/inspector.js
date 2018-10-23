/**
 * Internal dependencies
 */
import { blockName } from '../'
import ResponsiveTabsControl from '../../../components/responsive-tabs-control';
import autoPlayOptions from '../../../utils/autoplay-options';
import SizeControl from '../../../components/size-control';
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
		this.setRadiusTo = this.setRadiusTo.bind( this );
		this.setHeightTo = this.setHeightTo.bind( this );
		this.setAutoPlaySpeedTo = this.setAutoPlaySpeedTo.bind( this );
	}

	componentDidUpdate( prevProps ) {
		if ( this.props.attributes.gutter <= 0 ) {
			this.props.setAttributes( {
				radius: 0,
			} );
		}

		if ( this.props.attributes.gridSize == 'xlrg' && prevProps.attributes.align == undefined ) {
			this.props.setAttributes( {
				gutter: 0,
				gutterMobile: 0,
			} );
		}
	}

	setRadiusTo( value ) {
		this.props.setAttributes( { radius: value } );
	}

	setSizeControl( value ) {
		this.props.setAttributes( { gridSize: value } );
	}

	setHeightTo( value ) {
		this.props.setAttributes( { height: value } );
	}

	setAutoPlaySpeedTo( value ) {
		this.props.setAttributes( { autoPlaySpeed: value } );
	}

	render() {

		const {
			attributes,
			setAttributes,
			isSelected,
		} = this.props;

		const {
			align,
			gridSize,
			gutter,
			height,
			images,
			radius,
			autoPlay,
			pageDots,
			autoPlaySpeed,
			draggable,
			prevNextButtons,
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
							{ gridSize != null && ( align == 'wide' || align == 'full' ) &&
								<ResponsiveTabsControl { ...this.props }
									label={ __( 'Gutter' ) }
									max={ 20 }
								/>
							}
							{ gridSize != 'xlrg' && ! align &&
								<ResponsiveTabsControl { ...this.props }
									label={ __( 'Gutter' ) }
									max={ 20 }
								/>
							}
							<RangeControl
								label={ __( 'Height in pixels' ) }
								value={ height }
								onChange={ this.setHeightTo }
								min={ 200 }
								max={ 1000 }
								step={ 1 }
							/>
							{ gutter > 0 && <RangeControl
								label={ __( 'Rounded Corners' ) }
								value={ radius }
								onChange={ this.setRadiusTo }
								min={ 0 }
								max={ 20 }
								step={ 1 }
							/> }
						</PanelBody>
						<PanelBody title={ __( 'Slider Settings' ) } initialOpen={ false }>
							<ToggleControl
								label={ __( 'Autoplay' ) }
								checked={ !! autoPlay }
								onChange={ () => setAttributes( {  autoPlay: ! autoPlay } ) }
								help={ __( 'Automatically advance to the next gallery item after a set duration.' ) }
							/>
							{ autoPlay && <SelectControl
								label={ __( 'Autoplay Speed' ) }
								value={ autoPlaySpeed }
								onChange={ this.setAutoPlaySpeedTo }
								options={ autoPlayOptions }
								className='components-blockgallery-inspector__autoplayspeed-select'
							/> }
							<ToggleControl
								label={ __( 'Draggable' ) }
								checked={ !! draggable }
								onChange={ () => setAttributes( {  draggable: ! draggable } ) }
								help={ __( 'Enable dragging & flicking on desktop and mobile devices.' ) }
							/>
							<ToggleControl
								label={ __( 'Arrow Navigation' ) }
								checked={ !! prevNextButtons }
								onChange={ () => setAttributes( {  prevNextButtons: ! prevNextButtons } ) }
							/>
							<ToggleControl
								label={ __( 'Dot Navigation' ) }
								checked={ !! pageDots }
								onChange={ () => setAttributes( {  pageDots: ! pageDots } ) }
							/>
						</PanelBody>
						<BackgroundPanel { ...this.props } />
					</InspectorControls>
				</Fragment>
			)
		)
	}
};

export default Inspector;
