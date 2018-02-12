import React from "react";
import {List, Button, Grid} from 'semantic-ui-react'
import Book from './book'
import {formatTitle} from '../utils/booksListUtil';

class BookList extends React.Component {
    render() {
        const {books, onRemoveClick, onEditClick, onAddBook} = this.props;

        return ([
            <Grid container columns={4} key={1}>
                <Grid.Column><span className='list-header__title'>Title</span></Grid.Column>
                <Grid.Column><span className='list-header__author'>Author</span></Grid.Column>
                <Grid.Column><span className='list-header__date'>Date</span></Grid.Column>
            </Grid>,
            <List divided relaxed key={2}>
                {books.map((book) => {
                    const {title, author, date} = book;
                    const props = {
                        title: formatTitle(title),
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
                <Button color='facebook' onClick={onAddBook}>Add Book</Button>
            </div>])
    }
}

export default BookList;