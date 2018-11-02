/**
 * External dependencies
 */
import classnames from 'classnames';
import filter from 'lodash/filter';

/**
 * Internal dependencies
 */
import GalleryImage from '../../../components/gallery-image';
import GalleryPlaceholder from '../../../components/gallery-placeholder';
import GalleryDropZone from '../../../components/gallery-dropzone';
import GalleryUpload from '../../../components/gallery-upload';
import Inspector from './inspector';
import { BackgroundStyles } from '../../../components/background/';
import { title, icon } from '../'
import { GlobalClasses, GlobalToolbar } from '../../../components/global/';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { withSelect } = wp.data;
const { withNotices } = wp.components;
const { withColors } = wp.editor;

/**
 * Block edit function
 */
class Edit extends Component {
	constructor() {
		super( ...arguments );

		this.onSelectImage = this.onSelectImage.bind( this );
		this.onRemoveImage = this.onRemoveImage.bind( this );
		this.setImageAttributes = this.setImageAttributes.bind( this );

		this.state = {
			selectedImage: null,
		};
	}

	componentDidMount() {

		// This block does not support caption style.
		this.props.setAttributes( {
			captionStyle: undefined,
		} );

		if ( this.props.wideControlsEnabled == true && ! this.props.attributes.align  ) {
			this.props.setAttributes( {
				align: 'full',
				fullwidth: true
			} );
		}
	}

	componentDidUpdate( prevProps ) {
		// Deselect images when deselecting the block
		if ( ! this.props.isSelected && prevProps.isSelected ) {
			this.setState( {
				selectedImage: null,
				captionSelected: false,
			} );
		}

		// Turn off the Fullwidth toggle, if align is switched off of full.
		if ( this.props.attributes.align != 'full' && this.props.attributes.fullwidth  ) {
			this.props.setAttributes( {
				fullwidth: 'full',
			} );
		}
	}

	onSelectImage( index ) {
		return () => {
			if ( this.state.selectedImage !== index ) {
				this.setState( {
					selectedImage: index,
				} );
			}
		};
	}

	onRemoveImage( index ) {
		return () => {
			const images = filter( this.props.attributes.images, ( img, i ) => index !== i );
			this.setState( { selectedImage: null } );
			this.props.setAttributes( {
				images,
			} );
		};
	}

	setImageAttributes( index, attributes ) {
		const { attributes: { images }, setAttributes } = this.props;
		if ( ! images[ index ] ) {
			return;
		}
		setAttributes( {
			images: [
				...images.slice( 0, index ),
				{
					...images[ index ],
					...attributes,
				},
				...images.slice( index + 1 ),
			],
		} );
	}

	render() {
		const {
			attributes,
			backgroundColor,
			captionColor,
			className,
			isSelected,
			noticeOperations,
			noticeUI,
			setAttributes,
		} = this.props;

		const {
			align,
			fullwidth,
			gutter,
			gutterMobile,
			images,
			linkTo,
			shadow,
		} = attributes;

		const dropZone = (
			<GalleryDropZone
				{ ...this.props }
				label={ sprintf( __( 'Drop to add to the %s gallery' ), title.toLowerCase() ) }
			/>
		);

		const wrapperClasses = classnames(
			className,
			...GlobalClasses( attributes ), {
				'has-fullwidth-images': fullwidth,
				[ `align${ align }` ] : align,
				[ `has-margin` ] : gutter > 0,
				[ `has-margin-bottom-${ gutter }` ] : gutter > 0,
				[ `has-margin-bottom-mobile-${ gutterMobile }` ] : gutterMobile > 0,
			}
		);

		const wrapperStyles = {
			...BackgroundStyles( attributes ),
			backgroundColor: backgroundColor.color,
			color: captionColor.color,
		};

		if ( images.length === 0 ) {
			return (
				<GalleryPlaceholder
					{ ...this.props }
					label={ sprintf( __( '%s Gallery' ), title ) }
					icon={ icon }
				/>
			);
		}

		return (
			<Fragment>
				<GlobalToolbar
					{ ...this.props }
				/>
				<Inspector
					{ ...this.props }
				/>
				{ noticeUI }
				<div className={ className }>
					<ul className={ wrapperClasses } style={ wrapperStyles }>
						{ dropZone }
						{ images.map( ( img, index ) => (
							<li className="blockgallery--item" key={ img.id || img.url }>
								<GalleryImage
									url={ img.url }
									alt={ img.alt }
									id={ img.id }
									gutter={ gutter }
									gutterMobile={ gutterMobile }
									marginBottom={ true }
									shadow={ shadow }
									isSelected={ isSelected && this.state.selectedImage === index }
									onRemove={ this.onRemoveImage( index ) }
									onSelect={ this.onSelectImage( index ) }
									setAttributes={ ( attrs ) => this.setImageAttributes( index, attrs ) }
									caption={ img.caption }
									supportsCaption={ true }
								/>
							</li>
						) ) }
						{ isSelected && (
							<GalleryUpload { ...this.props }
								gutter={ gutter }
								gutterMobile={ gutterMobile }
								marginBottom={ true }
							/>
						) }
					</ul>
				</div>
			</Fragment>
		);
	}
}

export default compose( [
	withSelect( ( select ) => ( {
		editorSidebarOpened: select( 'core/edit-post' ).isEditorSidebarOpened(),
		pluginSidebarOpened: select( 'core/edit-post' ).isPluginSidebarOpened(),
		publishSidebarOpened: select( 'core/edit-post' ).isPublishSidebarOpened(),
		wideControlsEnabled: select( 'core/editor' ).getEditorSettings().alignWide,
	} ) ),
	withColors( { backgroundColor : 'background-color', captionColor : 'color' } ),
	withNotices,
] )( Edit );
