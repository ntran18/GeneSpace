"use client"

import Modal from 'react-modal';
import propTypes from 'prop-types';
import { useState} from 'react';

const DynamicInputModal = ({ isOpen, onClose, handleNewInput, setIsCancelled, selectedGenes }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleAddGene = () => {
        handleNewInput(inputValue);
        setInputValue('');
    };

    const handleFinishSelection = () => {
        setInputValue('');
        onClose();
    };

    const handleInputKeyDown = (event) => {
        if (event.key === 'Enter') {
            // Prevent form submission on Enter key press
            event.preventDefault();
            handleAddGene();
        }
    };

    const handleCancel = () => {
        setIsCancelled(true);
        onClose();
    };

    return (
        <Modal isOpen={isOpen}>
            <div>
                <h2>Type Genes</h2>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                />
                <button onClick={handleAddGene}>Add Gene</button>

                <div>
                    <p>Selected Genes:</p>
                    <ul>
                        {selectedGenes.map((gene, index) => (
                            // <li key={index}>{gene}</li>
                            <div className='selected_gene'>{gene}</div>
                        ))}
                    </ul>
                </div>

                <div>
                    <button onClick={handleFinishSelection}>Finish Selection</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </Modal>
    );
};

DynamicInputModal.propTypes = {
    isOpen: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired,
    handleNewInput: propTypes.func.isRequired,
    setIsCancelled: propTypes.func.isRequired,
    selectedGenes: propTypes.array.isRequired,
};

export default DynamicInputModal;
