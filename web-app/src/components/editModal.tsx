import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { EditModalProps } from "../interface";


const EditModal: React.FC<EditModalProps> = ({
  showModal,
  setShowModal,
  selectedData,
  handleSave,
  handleUpdate,
  setSelectedDataCallback,
}) => {
  const [formErrors, setFormErrors] = useState({
    name: "",
    isbn: "",
    author: "",
  });

  const isEdit = selectedData?._id ? true : false;

  const validateForm = () => {
    let isValid = true;
    const errors = {
      name: "",
      isbn: "",
      author: "",
    };

    // Validate Name
    if (!selectedData?.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    // Validate ISBN
    if (!selectedData?.isbn.trim()) {
      errors.isbn = "ISBN is required";
      isValid = false;
    }

    // Validate Publication Year
    if (!selectedData?.author) {
      errors.author = "Publication Year is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleFormSubmit = () => {
    if (validateForm()) {
      if (isEdit) {
        handleUpdate();
      } else {
        handleSave();
      }
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? "Edit Book" : "Add Book"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={selectedData?.name || ""}
            onChange={(e) =>
              setSelectedDataCallback({
                ...selectedData,
                name: e.target.value,
              })
            }
            isInvalid={!!formErrors.name}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formAge">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            value={selectedData?.isbn || ""}
            onChange={(e) =>
              setSelectedDataCallback({
                ...selectedData,
                isbn: e.target.value,
              })
            }
            isInvalid={!!formErrors.isbn}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.isbn}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            value={JSON.stringify(selectedData?.author)}
            onChange={(e) =>
              setSelectedDataCallback({
                ...selectedData,
                author: e.target.value,
              })
            }
            isInvalid={!!formErrors.author}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.author}
          </Form.Control.Feedback>
        </Form.Group>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleFormSubmit}>
          {isEdit ? "Update Changes" : "Save Changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
