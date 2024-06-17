import React, { Component } from 'react';
import './Todo.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class Todo extends Component {
    state = {
        input: "",
        items: [],
        showModal: false,
        editIndex: null, // To track the index of the item being edited
    };

    handleChange = event => {
        this.setState({
            input: event.target.value
        });
    };

    storeItems = event => {
        event.preventDefault();
        const { input } = this.state;
        if (input.trim() !== "") {
            this.setState({
                items: [...this.state.items, input],
                input: ""
            });
        }
    };

    deleteItem = key => {
        const updatedItems = this.state.items.filter((item, index) => index !== key);
        this.setState({
            items: updatedItems
        });
    };

    toggleModal = (index = null) => {
        this.setState({
            showModal: !this.state.showModal,
            editIndex: index,
            input: index !== null ? this.state.items[index] : ""
        });
    };

    editItem = () => {
        const { items, editIndex, input } = this.state;
        const updatedItems = items.map((item, index) =>
            index === editIndex ? input : item
        );
        this.setState({
            items: updatedItems,
            showModal: false,
            input: "",
            editIndex: null
        });
    };

    render() {
        const { input, items, showModal } = this.state;

        return (
            <div className='todo-Container'>
                <form className='input-section' onSubmit={this.storeItems}>
                    <h1>Todo App</h1>
                    <input
                        type="text"
                        value={input}
                        onChange={this.handleChange}
                        placeholder='Enter Items'
                    />
                </form>
                <ul>
                    {items.map((data, index) => (
                        <li key={index}>{data}
                            <i className="fa-solid fa-pen-to-square" onClick={() => this.toggleModal(index)}></i>
                            <i className="fa-solid fa-trash" onClick={() => this.deleteItem(index)}></i>
                        </li>
                    ))}
                </ul>

                <Modal className='modal' show={showModal} onHide={this.toggleModal}>
                    <Modal.Header >
                        <Modal.Title className='ModalTitle'>Edit Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input className="input-sctn"
                            type="text"
                            value={input}
                            onChange={this.handleChange}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.toggleModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.editItem}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Todo;
