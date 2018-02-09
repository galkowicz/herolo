import React from "react";
import {List} from 'semantic-ui-react'
import Book from './book'

class BookList extends React.Component {
    constructor(props) {
        super(props);
    }

    static handleBookEditClicked(title) {
        console.log(title);
    }

    render() {
        const {books} = this.props;

        return (<List divided relaxed>
            {books.map((book) => {
                const {title, author, date} = book;
                const props = {
                    title,
                    author,
                    date,
                    onEditClick: BookList.handleBookEditClicked.bind(this, title)
                };

                return (
                    <List.Item key={title}>
                        <List.Content>
                            <Book{...props}/>
                        </List.Content>
                    </List.Item>)
            })}
        </List>)
    }
}

export default BookList;