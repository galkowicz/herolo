import React from "react";
import {Button, Icon, Modal, Header, Divider} from 'semantic-ui-react'

const Prompt = (props) => {
    const {onYesClick, onNoClick} = props;

    return (
        <Modal open={true} size='tiny'>
            <Modal.Content className='nice-blue'>
                <div className='right-floating' onClick={onNoClick}>
                    <Icon link name='close'/>
                </div>
                <Header className='prompt-message-title'>Are sure you want to delete the book?</Header>
                <Divider hidden />
                <Button.Group className='prompt-message-actions'>
                    <Button onClick={onYesClick} negative>Yes</Button>
                    <Button.Or/>
                    <Button onClick={onNoClick} positive>No</Button>
                </Button.Group>
            </Modal.Content>
        </Modal>
    );
};

export default Prompt;