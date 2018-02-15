import React from "react";
import {Button, Form, Message, Icon, Modal} from 'semantic-ui-react';
import {
    isEmptyString,
    isValidPastYear,
    getTitleMessage,
    isTitleValid
} from '../utils/validationUtil';
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

        let newState = Object.assign({}, this.state.inputs);
        newState[inputName] = value;

        this.setState({inputs: newState, titleValid: true});
    }

    handleFormSubmit() {
        const {inputs} = this.state;
        const {onSaveClick, closeEdit, books, bookToEdit} = this.props;
        const isNewBook = !bookToEdit.title;

        const titleValid = isTitleValid(inputs.title, books, isNewBook);
        const authorValid = !isEmptyString(inputs.author);
        const dateValid = isValidPastYear(inputs.date);

        this.setState({titleValid, dateValid, authorValid});

        if (titleValid && authorValid && dateValid) {
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
                                type='date'
                                value={date}/>
                    {!dateValid && <Message
                        error
                        header='Invalid Date'
                        content={ILLEGAL_DATE}/>}
                    <div className='edit-actions'>
                        <Button type="button" className='inverted-btn' onClick={this.handleFormSubmit}>Save</Button>
                        <Button type="button" className='inverted-btn' onClick={closeEdit}>Cancel</Button>
                    </div>
                </Form>
            </Modal>)
    }
}

export default EditBook;