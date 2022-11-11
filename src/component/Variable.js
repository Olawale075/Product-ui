import Layout from "./partials/Layout";
import * as ReactBootStrap from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { getVariables } from "../api/base";
import swal from 'sweetalert';

const InitialValue = {actionName : '', id : null}

const Variable = () => {
    const [loading, setLoading] = useState(true)
    const [values, setValues] = useState(InitialValue)
    const [variables, setVariables] = useState(null);
    const [showDelete, setShowDelete] = useState(false)
    const [showAddConfig, setShowAddConfig] = useState(false);
    const [isEdit, setIsEdit] = useState(false)
    const handleCloseAddConfig = () => setShowAddConfig(false);
    const handleShowAddConfig = () => {
      setValues(InitialValue)
      setIsEdit(false)
      setShowAddConfig(true)
    };


  useEffect(() => {
    const fetchAPI = async () => {
        try{
            const variables = await getVariables()
            setVariables(variables)
            setLoading(false)
        }catch(err) {

        }
    }
    fetchAPI();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleAddVariable = () => {
    fetch(`http://146.70.88.25:8082/api/v1/sms/variable`, {
        method: "POST",
        body: JSON.stringify({actionName : values.actionName}),
        headers: {
          "Access-Control-Allow-Origin": "*",
          accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
            if(data.status === 201){
                setShowAddConfig(false)
                swal("Variable Created", data.message, "success");
                setVariables([...variables, data.data])
            }
        })
        .catch((err) => console.log(err));
    setValues(InitialValue)
  }
  const handleUpdateVariable = data => {
    setIsEdit(true)
    setValues(data)
    setShowAddConfig(true)
  }
  const handleUpdate = () => {
    fetch(`http://146.70.88.25:8082/api/v1/sms/variable/${values.id}`, {
      method: "PUT",
      body: JSON.stringify({actionName : values.actionName}),
      headers: {
        "Access-Control-Allow-Origin": "*",
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          setShowAddConfig(false)
          swal("", data.message, "success");

          setVariables(variables.map(variable => {
            if (variable.id === values.id){
              return {...variable,actionName : data.data.actionName}
            }
            return variable
          }))
        }
      })
      .catch((err) => console.log(err));
  }
  const handleDeleteModal = (data) => {
    setShowDelete(true)
    setValues(data)
    
  }
  const handleDelete = () => {
    fetch(`http://146.70.88.25:8082/api/v1/sms/variable/${values.id}`, {method : 'DELETE'})
          .then((res) => res.json())
          .then((data) => {
            setShowDelete(false)
            setVariables(variables.filter(variable => {
                return variable.id !== values.id
            }))
            swal("", 'variable deleted successfully', "success");
          })
          .catch((err) => console.log(err));
  }
  return (
    <Layout>
      <div className="mb-3 text-end">
        <Button variant="dark" onClick={handleShowAddConfig} title="Add Variable">
            <FaPlus />
        </Button>
      </div>
      <ReactBootStrap.Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Action Name</th>
              <th>Func</th>
            </tr>
          </thead>
          <tbody>
            {loading && <Spinner animation="grow" className="m-3"/>}
            {
                variables && variables.map((variable, index) => (
                <tr className="text-center" key={variable.id}>
                    <td>{index+1}</td>
                    <td>{variable.actionName}</td>
                    <td>
                        <Button className='mx-2' variant="outline-dark" onClick={e => handleUpdateVariable(variable)}>Edit</Button> 
                        <Button variant="dark" onClick={e => handleDeleteModal(variable)}>Delete</Button>
                    </td>
                </tr>
                ))
            }
          </tbody>
        </ReactBootStrap.Table> 
      <Modal
        show={showAddConfig}
        onHide={handleCloseAddConfig}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? `Update Variable` : 'Add Variable'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Action Name</Form.Label>
            <Form.Control type="text" placeholder="" value={values.actionName} onChange={handleChange} name='actionName'/>
        </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {isEdit ? 
          <Button variant="dark" onClick={handleUpdate} type="submit">
            Update
          </Button> : 
          <Button variant="dark" onClick={handleAddVariable} type="submit">
          Add
        </Button>
          
          }
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
          <Modal.Title>Delete Variable "{values.actionName}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you Sure you want to delete variable "{values.actionName}"
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>Yes Delete</Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Variable;
