Comp.Modal = class extends React.Component {
  constructor(props) {
    super(props)
    this.props.closeModal = this.props.closeModal
  }

  render() {
    return (
      <div className='modal' onClick={this.handleOverlayClick.bind(this)}>
        <div className='modal__close' onClick={this.handleCloseClick.bind(this)}>
          <Comp.Icons.No/>
        </div>
        <div className='modal__wrapper' onClick={this.stopPropagation}>
          <div className='modal__header'>
            {this.props.hint}
          </div>
          <div className='modal__content' id={this.props.contentId}/>
        </div>
      </div>
    )
  }

  handleCloseClick() {
    if (this.props.closeModal) {
      this.props.closeModal()
    }
  }

  handleOverlayClick() {
    if (this.props.closeModal) {
      this.props.closeModal()
    }
  }

  stopPropagation(e) {
    e.stopPropagation()
  }

  componentDidMount() {
    RIPSAW.init()
    RIPSAW.launch()
  }

  componentWillUnmount() {}
}
