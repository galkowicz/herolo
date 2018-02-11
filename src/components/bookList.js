import React from "react";
import {List, Button} from 'semantic-ui-react'
import Book from './book'

class BookList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {books, onRemoveClick, onEditClick, onAddBook} = this.props;

        return ([
            <div className='list-header' key={1}>
                <span className='list-header__title'>Title</span>
                <span className='list-header__author'>Author</span>
                <span className='list-header__date'>Date</span>
            </div>,
            <List divided relaxed key={2}>
                {books.map((book) => {
                    const {title, author, date} = book;
                    const props = {
                        title,
                        author,
                        date,
                        onEditClick: onEditClick.bind(this, title),
                        onRemoveClick: onRemoveClick.bind(this, title)
                    };

                    return (
                        <List.Item key={title}>
                            <List.Content>
                                <Book{...props}/>
                            </List.Content>
                        </List.Item>)
                })}
            </List>,
            <div className="book-remove" key={3}>
                <Button onClick={onAddBook}>Add Book</Button>
            </div>])
    }
}

export default BookList;