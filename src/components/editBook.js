import React from "react";
import {Button, Form, Message, Icon} from 'semantic-ui-react';
import {isEmptyString, isValidPastYear, isFormValid, getTitleMessage, isMultipleTitle} from '../utils/validationUtil';
import {ILLEGAL_DATE, EMPTY_STRING} from '../constants/messages';

// DUPLICATE_TITLE, ILLEGAL_DATE, EMPTY_STRING

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
            <Form error className='edit-form center'>
                <div className='form-close' onClick={closeEdit}>
                    <Icon link name='close'/>
                </div>
                <Form.Input onChange={this.handleInputChange}
                            name='title'
                            label='Title'
                            value={title}/>
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
                <Button onClick={this.handleFormSubmit}>Save</Button>
                <Button onClick={closeEdit}>Cancel</Button>
            </Form>)
    }
}

export default EditBook;