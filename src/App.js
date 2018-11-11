import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookCase from './components/BookCase'
import Search from './components/Search'

export default class BooksApp extends React.Component {
  state = {   
    
  }
		
	componentDidMount() {
    	BooksAPI.getAll().then((books) => {
          this.refreshBooks()
          this.setState({books})
        });  
    }

	refreshBooks = (books) => {
    	BooksAPI.getAll().then((list) => {  
    		this.setState({        
          		books: (list)
        	})
        })
    }

	switchShelf = (book, shelf) => {
     BooksAPI.update(book, shelf)
    	.then(resp => {
       		let newBooks = this.state.books.slice(0)
      		const books = newBooks.filter(pickedbooks => pickedbooks.id !== book.id)
            if (books.length) {
           		books[0].shelf = shelf
            }else{
             	newBooks.push(book); 
            }
       		this.setState({books: newBooks})
     	})
   }

	render() {
    	return (
      		<div className="app">
            	<Route exact path='/'
             	 render={(() => (<BookCase books={this.state.books} onRefreshBooks={this.refreshBooks} onSwitchShelf={this.switchShelf}/>))}/>

				<Route exact path='/search'
				 render={(() => (<Search pickedbooks={this.state.books} onSwitchShelf={this.switchShelf}/>))}/>
			</div>
    	)
  	}
}
