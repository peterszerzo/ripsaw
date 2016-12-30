// This modal component does not handle its own active state. This is stored on the parent, which either renders the modal or doesn't.

Comp.Modal = class extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='modal' onClick={this.handleOverlayClick.bind(this)}>
				<div className='modal__close' onClick={this.handleCloseClick.bind(this)}>
					<Comp.Icons.No />
				</div>
				<div className='modal__wrapper' onClick={this.stopPropagation.bind(this)}>
					<div className='modal__header'>
						{ this.props.hint }
					</div>
					<div className='modal__content' id={ this.props.contentId }>
					</div>
				</div>
			</div>
		);
	}

	handleCloseClick() {
		if (this.props.closeModal) {
			this.props.closeModal();
		}
	}

	handleOverlayClick() {
		if (this.props.closeModal) {
			this.props.closeModal();
		}
	}

	stopPropagation(e) {
		e.stopPropagation();
	}

}