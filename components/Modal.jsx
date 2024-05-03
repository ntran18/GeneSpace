import Modal from "react-modal";
import propTypes from "prop-types";
import { useState } from "react";

const DynamicInputModal = ({
    isOpen,
    onClose,
    handleNewInput,
    setIsCancelled,
    selectedGenes,
}) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleAddGene = () => {
        handleNewInput(inputValue);
        setInputValue("");
    };

    const handleFinishSelection = () => {
        setInputValue("");
        onClose();
    };

    const handleInputKeyDown = (event) => {
        if (event.key === "Enter") {
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
        <Modal isOpen={isOpen} className="modal">
            <div className="modal-container">
                <h2>Type Genes</h2>
                <div className="input-container">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                        className="input-field"
                    />
                    <button onClick={handleAddGene} className="button">
                        Add Gene
                    </button>
                </div>

                <div className="selected-genes-container">
                    <p>Selected Genes:</p>
                    <ul>
                        {selectedGenes.map((gene, index) => (
                            <div key={index} className="selected-gene">
                                {gene.toUpperCase()}
                            </div>
                        ))}
                    </ul>
                </div>

                <div className="button-container">
                    <button onClick={handleCancel} className="cancel-button">
                        Cancel
                    </button>
                    <button
                        onClick={handleFinishSelection}
                        className="finish-button"
                    >
                        Finish Selection
                    </button>
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
