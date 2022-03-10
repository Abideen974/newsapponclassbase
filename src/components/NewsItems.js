import React, { Component } from 'react'

export class NewsItems extends Component {
  render() {
      let {title , description ,imgUrl, newsUrl,date ,author, source} = this.props;
    return (
      <div className='my-3'>
             <div className="card">
              <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"style={{left:'90%', zIndex:'1'}}>
                    {source.name}
                </span>
                <img src={!imgUrl?"https://images.nintendolife.com/9a89ef5581c7d/1280x720.jpg" :imgUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By {!author?"Unknown": author} on: {new Date(date).toGMTString()}</small></p>
                    <p className='cart-text'><small className='text-info'>This app developed by Abideen</small></p>


                    <a href={newsUrl} target="_blank"className="btn btn-sm btn-dark">Read More</a>
                </div>
        </div>
      </div>
    )
  }
}

export default NewsItems