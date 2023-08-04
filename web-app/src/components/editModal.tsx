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
    publicationYear: "",
    genre: "",
  });

  const isEdit = selectedData?._id ? true : false;

  const validateForm = () => {
    let isValid = true;
    const errors = {
      name: "",
      isbn: "",
      publicationYear: "",
      genre: "",
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
    if (!selectedData?.publicationYear) {
      errors.publicationYear = "Publication Year is required";
      isValid = false;
    }

    // Validate Genre
    if (!selectedData?.genre.trim()) {
      errors.genre = "Genre is required";
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
          <Form.Label>Publication Year</Form.Label>
          <Form.Control
            type="number"
            value={selectedData?.publicationYear || 1900}
            onChange={(e) =>
              setSelectedDataCallback({
                ...selectedData,
                publicationYear: e.target.value,
              })
            }
            isInvalid={!!formErrors.publicationYear}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.publicationYear}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formGenre">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            type="text"
            value={selectedData?.genre || ""}
            onChange={(e) =>
              setSelectedDataCallback({
                ...selectedData,
                genre: e.target.value,
              })
            }
            isInvalid={!!formErrors.genre}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.genre}
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
