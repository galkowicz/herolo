import React from "react";
import { Button } from 'semantic-ui-react'

const Book = (props) => {
    const {title, author, date, onEditClick} = props;

    return (
        <div className='book'>
            <div className='book-details'>
                <span className='book-details-title'>{title}</span>
                <span className='book-details-author'>{author}</span>
                <span className='book-details-date'>{date}</span>
            </div>
            <div className="book-edit">
                <Button onClick={onEditClick}>Edit</Button>
            </div>
        </div>
    );
};

export default Book;