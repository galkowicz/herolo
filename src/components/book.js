import React from "react";
import {Button} from 'semantic-ui-react'

const Book = (props) => {
    const {title, author, date, onEditClick, onRemoveClick} = props;

    return (
        <div className='book'>
            <div className='book-details'>
                <span className='book-details__title'>{title}</span>
                <span className='book-details__author'>{author}</span>
                <span className='book-details__date'>{date}</span>
            </div>
            <div className='book-actions'>
                <div className="book-edit">
                    <Button onClick={onEditClick}>Edit</Button>
                </div>
                <div className="book-remove">
                    <Button onClick={onRemoveClick}>Delete</Button>
                </div>
            </div>
        </div>
    );
};

export default Book;