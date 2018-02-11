import React, {Component} from 'react';
import './App.css';
import {asyncGetBooks} from './server/serverUtil';
import {getSelectedBook} from '../src/utils/booksListUtil';
import BookList from './components/bookList';
import EditBook from './components/editBook';
import Prompt from './components/promptMessage';

class App extends Component {
    constructor(props) {
        super(props);
        this.handleEditClicked = this.handleEditClicked.bind(this);
        this.handleRemoveBook = this.handleRemoveBook.bind(this);
        this.handleEditClose = this.handleEditClose.bind(this);
        this.handleSaveBook = this.handleSaveBook.bind(this);
        this.handleAddBook = this.handleAddBook.bind(this);
        this.removeBook = this.removeBook.bind(this);
        this.closePrompt = this.closePrompt.bind(this);

        this.state = {books: [], isEditOpen: false, isPromptOpen: false}
    }

    componentDidMount() {
        asyncGetBooks().then((data) => {
            this.setState({books: data.books})
        });
    }

    handleEditClicked(bookTitle) {
        const bookToEdit = getSelectedBook(bookTitle, this.state.books);
        this.setState({isEditOpen: true, bookToEdit, isPromptOpen: false});
    }

    handleEditClose() {
        this.setState({isEditOpen: false});
    }

    handleRemoveBook(bookTitle) {
        this.setState({isPromptOpen: true, bookToRemoveTitle: bookTitle, isEditOpen: false});
    }

    removeBook() {
        const {books, bookToRemoveTitle} = this.state;
        const bookToRemove = getSelectedBook(bookToRemoveTitle, books);
        const bookIndex = books.indexOf(bookToRemove);

        let newState = [...books];
        newState.splice(bookIndex, 1);

        this.setState({books: newState, isPromptOpen: false});
    }

    handleSaveBook(editedBook) {
        const {books, bookToEdit} = this.state;
        let bookIndex = books.indexOf(bookToEdit);

        if (bookIndex === -1) {
            bookIndex = books.length;
        }

        let newState = [...books];
        newState[bookIndex] = editedBook;

        this.setState({books: newState});
    }

    handleAddBook() {
        const bookToEdit = {title: '', author: '', date: ''};
        this.setState({isEditOpen: true, isPromptOpen: false, bookToEdit});
    }

    closePrompt() {
        this.setState({isPromptOpen: false});
    }

    render() {
        const {books, isEditOpen, isPromptOpen, bookToEdit} = this.state;

        if (books.length > 0) {
            return (
                <div className="App">
                    <BookList books={this.state.books}
                              onEditClick={this.handleEditClicked}
                              onAddBook={this.handleAddBook}
                              onRemoveClick={this.handleRemoveBook}/>
                    {isEditOpen && <EditBook bookToEdit={bookToEdit}
                                             onSaveClick={this.handleSaveBook}
                                             closeEdit={this.handleEditClose}/>}
                    {isPromptOpen && <Prompt onNoClick={this.closePrompt}
                                             onYesClick={this.removeBook}/>}
                </div>
            );
        } else {
            return null;
        }

    }
}

export default App;