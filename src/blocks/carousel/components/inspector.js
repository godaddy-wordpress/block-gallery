/**
 * Internal dependencies
 */
import { title } from '../'
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
		this.getAutoPlayHelp = this.getAutoPlayHelp.bind( this );
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

	getAutoPlayHelp( checked ) {
		// Retrieve the height value and divide it to display full seconds.
		const speed = this.props.attributes.autoPlaySpeed / 1000;

		return checked ? sprintf( __( 'Automatically advancing to the next gallery item after %s seconds.' ), speed ) : __( 'Automatically advance to the next gallery item after a set duration.' );
	}

	getDraggableHelp( checked ) {
		return checked ? __( 'Dragging & flicking enabled on desktop and mobile devices.' ) : __( 'Enable dragging & flicking on desktop and mobile devices.' );
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
						<PanelBody title={ sprintf( __( '%s Settings' ), title ) }>
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
								help={ this.getAutoPlayHelp }
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
								help={ this.getDraggableHelp }
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
