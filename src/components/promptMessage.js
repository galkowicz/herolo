import React from "react";
import {Button, Icon} from 'semantic-ui-react'

const Prompt = (props) => {
    const {onYesClick, onNoClick} = props;

    return (
        <div className='prompt-message center'>
            <div className='form-close' onClick={onNoClick}>
                <Icon link name='close'/>
            </div>
            <div className='prompt-message-title'>Are sure you want to delete the book?</div>
            <Button.Group>
                <Button onClick={onYesClick} negative>Yes</Button>
                <Button.Or />
                <Button onClick={onNoClick} positive>No</Button>
            </Button.Group>
        </div>
    );
};

export default Prompt;