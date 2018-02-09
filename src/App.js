import React, {Component} from 'react';
import './App.css';
import {asyncGetBooks} from './server/serverUtil';
import BookList from './components/bookList';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {books: []}
    }

    componentDidMount() {
        asyncGetBooks().then((data) => {
            this.setState({books: data.books})
        });
    }

    render() {
        const books = this.state.books;

        if (books.length > 0) {
            return (
                <div className="App">
                    <BookList books={this.state.books}/>
                </div>
            );
        } else {
            return null;
        }

    }
}

export default App;
