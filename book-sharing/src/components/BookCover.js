import React from 'react'

class BookCover extends React.Component {
  static defaultProps = {
    maxWidth: 140,
  }
  state = {
    image: null,
  }
  componentDidMount() {
    const { thumbnail } = this.props
    let link = thumbnail

    if (link.indexOf('&edge=curl') > 0)
      link = link.replace('&edge=curl', '')

    const image = new Image()

    image.onload = () => {
      if (!this.__isUnmounted)
        this.setState({ image })
    }

    image.src = link
  }

  componentWillUnmount() {
    this.__isUnmounted = true
  }

  render() {
    const { image } = this.state
    const { title, maxWidth } = this.props

    let style = {}

    let children

    if (image) {
      if (image.width > maxWidth) {
        style.width = maxWidth
        style.height = Math.floor((maxWidth / image.width) * image.height)
      } else {
        style.width = image.width
        style.height = image.height
      }

      style.backgroundImage = `url("${image.src}")`
    } else {
      style.width = maxWidth
      style.height = Math.round(style.width * 1.33)
      children = (
        <div className="book-cover-title">{title}</div>
      )
    }

    return (
      <div className="book-cover" style={style}>
        {children}
      </div>
    )
  }
}

export default BookCover
