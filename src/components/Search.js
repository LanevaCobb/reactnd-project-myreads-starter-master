import React from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Books from './Books'

export default class Search extends React.Component {
	state = {
      	query: "",
      	books: [],
      	results: []
    }

	      
	
	updateQuery = (query) => {
    	this.setState({query:query})
      	if(query) {
          this.updateSearch(query)
        }else{
          this.setState({results: []})
        }
    }
	
	updateSearch = () => {
    	if (this.state.query === "") {
          return this.setState({results: []})
        }
      	
      	BooksAPI.search(this.state.query).then(response => {
          	
        	if (response.error) {
            	return this.setState({results: []})
        	}else if (response.length > 0) {
              	response.forEach(response => {
               		const findBooks = this.props.pickedbooks.filter(book => book.id === response.id)
                    if(findBooks[0]) {
                 		return findBooks[0].shelf = response.shelf
                    }
             	})
             	return this.setState({results : response})
          	}    
   		})
   }
	
	componentWillReceiveProps = (props) => {
    	this.props = props;
      	     
    }
	render() {
		return (	
			<div className="search-books">
            	<div className="search-books-bar">
              		<Link className="close-search" to="/">Close</Link>
              		<div className="search-books-input-wrapper">
                    	<input type="text" placeholder="Search by title or author"
             				onChange={(event) => this.updateQuery(event.target.value)}
							value={this.state.query}/>
					</div>
            	</div>
            	<div className="search-books-results">
              		<ol className="books-grid">
						{this.state.results.map((book,key,shelf) => 
							<Books books={this.state.books} book={book} shelf={shelf} key={book.id}
							onSwitchShelf={this.props.onSwitchShelf}/>)}
					</ol>
            	</div>
         	 </div>
		)
	}
}