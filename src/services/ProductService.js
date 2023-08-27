import Protected from "../component/partials/Protected";
import * as ReactBootStrap from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Pagination from "react-bootstrap/Pagination";
import { getVariables } from "../api/base";
import swal from "sweetalert";
import axios from "axios";
import { id } from "date-fns/locale";
const InitialValue = { title: "", description: "", price: "", size: "" };
const ProductService = () => {
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState(InitialValue);
  const [variables, setVariables] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showAddConfig, setShowAddConfig] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [content, setContent] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [file, setfile] = useState("");
  const handleCloseAddConfig = () => setShowAddConfig(false);
  const handleShowAddConfig = () => {
    setValues(InitialValue, file);
    setIsEdit(false);
    setShowAddConfig(true);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const variables = await getVariables();
        setVariables(variables);
        setContent(variables);
        setLoading(false);
        console.log(variables);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAPI();
  }, []);
  function handleImage(e) {
    console.log(e.target.files);
    setfile(e.target.files[0]);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
 function submitForm() {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("size", values.size);
    console.log(formData);
    axios
      .post(`http://localhost:8080/api/v1/product/upload`, formData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data",
          "x-rapidapi-host": "file-upload8.p.rapidapi.com",
          "x-rapidapi-key": "your-rapidapi-key-here",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          swal("", "Product Created successfully", "success");
          setShowAddConfig(false);
          window.location.reload(true);
        }
      })
      .catch((err) => console.log(err));
  }

  const handleUpdateVariable = (data) => {
    setIsEdit(true);
    setValues(data);
    setShowAddConfig(true);
  };
  const data = {
    title: values.title,
    description: values.description,
    price: values.price,
    size: values.size,
  };
  const handleUpdate = () => {
    fetch(`http://localhost:8080/api/v1/product/${values.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        window.location.reload(true);
        setShowAddConfig(false);
        if (data.status === 200) {
          swal("", "Product Update successfully", "success");
          console.log(data);
          setVariables(
            variables.map((variable) => {
              if (id === values.id) {
                return {
                  ...variable,
                  title: data.data.title,
                  price: data.data.price,
                  description: data.data.description,
                  size: data.data.size,
                };
              }
              window.location.reload(true);
              setShowAddConfig(false);

              return variable;
            })
          );
        }
      })
      .catch((err) => console.log(err));
  };
  const handleDeleteModal = (variable) => {
    setShowDelete(!showDelete);
    setValues(variable);
  };
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/v1/product/delete/${id}`)
      .then(async (response) => {
        swal("", "variable deleted successfully", "success");
        setShowDelete(false);
        window.location.reload(true);
        setShowAddConfig(false);
        return alert("Delete successful");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePagination = (number) => {
    setLoading(true);
    setPageNumber(number);
    const fetchAPI = async () => {
      try {
        const variables = await getVariables(number);
        setVariables(variables.content);
        setContent(variables);
        setLoading(false);
      } catch (err) {}
    };
    fetchAPI();
  };
  return (
    <Protected>
      <div className="mb-3 text-end">
        <Button
          variant="dark"
          onClick={handleShowAddConfig}
          title="Add Variable"
        >
          <FaPlus />
        </Button>
      </div>
      <ReactBootStrap.Table striped bordered hover>
        <thead>
          <tr className="text-center m-2"  >
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>imageFileName</th>
            <th>Price</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          {loading && <Spinner animation="grow" className="m-3" />}
          {variables &&
            variables.map((variable, index) => (
              <tr className="text-center" key={variable.id}>
                <td>{variable.id}</td>
                <td>{variable.title}</td>
                <td>{variable.description}</td>
                <td>{variable.imageFileName}</td>
                <td>{variable.price}</td>
                <td>{variable.size}</td>
                <td>
                  <Button
                   
                    variant="outline-dark"
                    onClick={(e) => handleUpdateVariable(variable)}
                  >
                    Edit
                  </Button>
                  <Button
                 className="m-2" 
                  variant="danger"
                    onClick={(e) => handleDeleteModal(variable)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </ReactBootStrap.Table>
      <Pagination>
        {content && !content.first ? (
          <Pagination.Item onClick={() => handlePagination(pageNumber - 1)}>
            Prev
          </Pagination.Item>
        ) : (
          ""
        )}

        <Pagination.Item>{pageNumber + 1}</Pagination.Item>
        {content && !content.last ? (
          <Pagination.Item onClick={() => handlePagination(pageNumber + 1)}>
            Next
          </Pagination.Item>
        ) : (
          ""
        )}
      </Pagination>
      <Modal
        show={showAddConfig}
        onHide={handleCloseAddConfig}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {isEdit ? `Update Variable` : "Add Variable"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Action Name</Form.Label>
            <Form.Control
              className="mb-3"
              type="text"
              placeholder="Enter Title"
              value={values.title}
              onChange={handleChange}
              name="title"
            />
            <Form.Control
              className="mb-3"
              type="text"
              placeholder="Enter Price"
              value={values.price}
              onChange={handleChange}
              name="price"
            />
            <Form.Control
              className="mb-3"
              type="text"
              placeholder="Enter size"
              value={values.size}
              onChange={handleChange}
              name="size"
            />
            <Form.Control
              className="mb-3"
              type="text"
              placeholder="Enter Description"
              value={values.description}
              onChange={handleChange}
              name="description"
            />
            <input type="file" onChange={handleImage} name="file" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {isEdit ? (
            <Button variant="dark" onClick={handleUpdate} type="submit">
              Update
            </Button>
          ) : (
            <Button variant="dark" onClick={submitForm} type="submit">
              Add
            </Button>
          )}
          <Button variant="outline-danger" onClick={handleCloseAddConfig}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showDelete}
        onHide={() => setShowDelete(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Variable "{values.id}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you Sure you want to delete variable "{values.id}"
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={() => handleDelete(values.id)}>
            Yes Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Protected>
  );
};

export default ProductService;
