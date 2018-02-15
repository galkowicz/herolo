import React from "react";
import {Button, Grid} from 'semantic-ui-react';
import {formatDate} from '../utils/validationUtil';

const Book = (props) => {
    const {title, author, date, onEditClick, onRemoveClick} = props;

    return (
        <div className='book'>
            <Grid container columns={4}>
            {/*<div className='book-details'>*/}
                <Grid.Column><span className='book-details__title'>{title}</span></Grid.Column>
                <Grid.Column><span className='book-details__author'>{author}</span></Grid.Column>
                <Grid.Column><span className='book-details__date'>{formatDate(date)}</span></Grid.Column>
            {/*</div>*/}
                <Grid.Column>
            <div className='book-actions'>
                <div className="book-edit">
                    <Button onClick={onEditClick}>Edit</Button>
                    <Button color='youtube' onClick={onRemoveClick}>Delete</Button>
                </div>
            </div>
                </Grid.Column>
            </Grid>

        </div>
    );
};

export default Book;