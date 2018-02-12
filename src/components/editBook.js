import React from "react";
import {Button, Form, Message, Icon, Modal} from 'semantic-ui-react';
import {isEmptyString, isValidPastYear, isFormValid, getTitleMessage, isMultipleTitle} from '../utils/validationUtil';
import {formatTitle} from '../utils/booksListUtil';
import {ILLEGAL_DATE, EMPTY_STRING} from '../constants/messages';

class EditBook extends React.Component {
    constructor(props) {
        super(props);
        const {title, author, date} = props.bookToEdit;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {
            titleValid: true, authorValid: true, dateValid: true,
            inputs: {title, author, date}
        };
    }

    handleInputChange(event) {
        const inputName = event.target.name;
        const value = event.target.value;

        let newState = Object.assign({}, this.state);
        newState.inputs[inputName] = value;
        const titleValid = !isEmptyString(newState.inputs.title) && !isMultipleTitle(newState.inputs.title, this.props.books);

        this.setState({newState, titleValid});
    }

    handleFormSubmit() {
        const {inputs} = this.state;
        const {onSaveClick, closeEdit, books} = this.props;
        const titleValid = !isEmptyString(inputs.title) && !isMultipleTitle(inputs.title, books);
        const authorValid = !isEmptyString(inputs.author);
        const dateValid = isValidPastYear(inputs.date);

        this.setState({titleValid, dateValid, authorValid});

        if (isFormValid(inputs, books)) {
            onSaveClick(inputs);
            closeEdit()
        }
    }

    render() {
        const {titleValid, authorValid, dateValid, inputs} = this.state;
        const {closeEdit, books} = this.props;
        const {title, author, date} = inputs;

        return (
            <Modal open={true} size='tiny'>
                <Form error className='edit-form nice-blue'>
                    <div className='right-floating' onClick={closeEdit}>
                        <Icon link name='close'/>
                    </div>
                    <Form.Input onChange={this.handleInputChange}
                                name='title'
                                label='Title'
                                value={formatTitle(title)}/>
                    {!titleValid && <Message
                        error
                        header='Invalid Title'
                        content={getTitleMessage(title, books)}/>}
                    <Form.Input onChange={this.handleInputChange}
                                name='author'
                                label='Author'
                                value={author}/>
                    {!authorValid && <Message
                        error
                        header='Invalid Author'
                        content={EMPTY_STRING}/>}
                    <Form.Input onChange={this.handleInputChange}
                                name='date'
                                label='Date'
                                value={date}/>
                    {!dateValid && <Message
                        error
                        header='Invalid Date'
                        content={ILLEGAL_DATE}/>}
                    <div className='edit-actions'>
                        <Button className='inverted-btn' onClick={this.handleFormSubmit}>Save</Button>
                        <Button className='inverted-btn' onClick={closeEdit}>Cancel</Button>
                    </div>
                </Form>
            </Modal>)
    }
}

export default EditBook;