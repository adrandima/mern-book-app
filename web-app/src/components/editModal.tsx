import React, { useState } from "react";
import { Modal, Form, Button, Dropdown } from "react-bootstrap";
import { IAuthor, IBook } from "../interface/book";
export interface EditModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  selectedData: IBook | null;
  authors: IAuthor[];
  handleUpdate: () => void;
  handleSave: () => void;
  setSelectedDataCallback: (value: any) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  showModal,
  setShowModal,
  selectedData,
  authors,
  handleSave,
  handleUpdate,
  setSelectedDataCallback,
}) => {
  const [selectedBookAuthor, setdBookAuthor] = useState("");

  const [formErrors, setFormErrors] = useState({
    name: "",
    isbn: "",
    author: "",
  });
  const [selectedValue, setSelectedValue] = useState<number>(1);
  const isEdit = selectedData?._id ? true : false;

  const validateForm = () => {
    let isValid = true;
    const errors = {
      name: "",
      isbn: "",
      author: "",
    };

    // Validate Name
    if (!selectedData?.name || !selectedData?.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    // Validate ISBN
    if (
      !selectedData?.isbn ||
      !(selectedData?.isbn && selectedData?.isbn.trim())
    ) {
      errors.isbn = "ISBN is required";
      isValid = false;
    }

    // Validate author
    if (!selectedData?.author || !selectedBookAuthor) {
      errors.author = "Author Name is required";
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

  const handleRadioChange = (value: number) => {
    setSelectedValue(value);
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
          <table>
            <tbody>
              {!isEdit && (
                <tr>
                  <td>
                    <input
                      type="radio"
                      value={1}
                      checked={selectedValue === 1}
                      onChange={() => handleRadioChange(1)}
                    />
                  </td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="secondary">
                        {!!selectedBookAuthor
                          ? selectedBookAuthor
                          : "Select an author"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {authors.map((author) => (
                          <Dropdown.Item
                            key={author._id}
                            onClick={() => {
                              setSelectedDataCallback({
                                ...selectedData,
                                author: author,
                              });
                              setdBookAuthor(
                                `${author.first_name} ${author.last_name}`
                              );
                            }}
                            disabled={isEdit || selectedValue === 2}
                          >
                            {`${author.first_name} ${author.last_name}`}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              )}
              <tr>
                <td>
                  <input
                    type="radio"
                    value={2}
                    checked={selectedValue === 2}
                    onChange={() => handleRadioChange(2)}
                    style={{ marginRight: "20px" }}
                  />
                </td>
                <td style={{ display: "flex" }}>
                  <Form.Control
                    type="text"
                    style={{ marginRight: "10px" }}
                    value={
                      (selectedData?.author &&
                        selectedData?.author.first_name) ||
                      ""
                    }
                    onChange={(e) =>
                      setSelectedDataCallback({
                        ...selectedData,
                        author: {
                          ...selectedData?.author,
                          first_name: e.target.value,
                        },
                      })
                    }
                    isInvalid={!!formErrors.isbn}
                    disabled={isEdit || selectedValue === 1}
                  />

                  <Form.Control
                    type="text"
                    style={{ marginRight: "10px" }}
                    value={
                      (selectedData?.author &&
                        selectedData?.author.last_name) ||
                      ""
                    }
                    onChange={(e) =>
                      setSelectedDataCallback({
                        ...selectedData,
                        author: {
                          ...selectedData?.author,
                          last_name: e.target.value,
                        },
                      })
                    }
                    isInvalid={!!formErrors.isbn}
                    disabled={isEdit || selectedValue === 1}
                  />
                </td>
              </tr>
            </tbody>
          </table>

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
