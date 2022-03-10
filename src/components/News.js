import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps ={
      country: "us",
      pageSize: 6,
      category: "general"
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,

  }
   capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
   
  
    constructor (props){
        super(props);
        console.warn("Hello i am constructor from news components")
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
        document.title = this.capitalizeFirstLetter(`${this.props.category} -iNews `)
    }
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cf1a0755d79c4196b5d23968abc6e3de&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        console.log(data)
        let  parseData =await data.json()
        console.log(parseData)
        
        this.setState({articles: parseData.articles,
             totalResults:parseData.totalResults,
             loading: false
            })
    }
    handleNext = async() =>{
        console.log("click was invoked next")
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cf1a0755d79c4196b5d23968abc6e3de&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
           this.setState({loading:true});
            let data = await fetch(url);
            let  parseData =await data.json()
           
            this.setState({
               page: this.state.page + 1,
               articles: parseData.articles,
               loading: false
            })
        }
       
    }
    handlePrevious = async () =>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cf1a0755d79c4196b5d23968abc6e3de&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let  parseData =await data.json()
        this.setState({
           page: this.state.page - 1,
           articles: parseData.articles,
           loading: false
        }) 
        
    }
  render() {
    return (
       
      <div className='container my-3'>
          <h2 className='text-center'>iNews Top Headlines From {this.capitalizeFirstLetter(`${this.props.category}`)}</h2>
          <hr />
          <div className='text-center'>

          {this.state.loading && <Spinner />}
          </div>
          <div className='row'>
                    {
                        !this.state.loading && this.state.articles.map((elements)=>{
                            return   <div className='col-md-4' key={elements.url}>
                                            <NewsItems title={elements.title? elements.title.slice(0,45):""} 
                                            description = {elements.description? elements.description.slice(0,60) :""} 
                                            newsUrl={elements.url}imgUrl={elements.urlToImage}
                                             date={elements.publishedAt} author={elements.author} source={elements.source} />
                                    </div>

                        })
                    }
          </div>
          <div className='contianer d-flex justify-content-between'>
                <button disabled={this.state.page<=1} type="button" className='btn btn btn-dark' onClick={this.handlePrevious}>&larr; Preious</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className='btn btn btn-dark' onClick={this.handleNext}>Next &rarr;</button>

          </div>
          

      </div>
    )
  }
}

export default News