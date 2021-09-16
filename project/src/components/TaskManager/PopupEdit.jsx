import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Modal, Button, FormGroup, Form } from "react-bootstrap";

export default function PopupEditController({clickInfo, onHide, show, onSave}){

    return(<PopupEdit clickInfo={clickInfo} onHide={onHide} show={show} onSave={onSave}/>)
}

function PopupEdit({clickInfo, onHide, show, onSave}){

    const [taskInfo, setTaskInfo] = useState({...clickInfo})

    useEffect(()=>(
        setTaskInfo({...clickInfo})
    ),[clickInfo])


    function handleChange(e){

        const newInfo = taskInfo

        if(e.target.name == 'weight'){

            var value = e.target.value
            value = value < 0 ? 0: value
            value = value > 10 ? 10 : value
            newInfo[e.target.name] = value

        }else{
            newInfo[e.target.name] = e.target.value
        }
        
        
        setTaskInfo({...newInfo})
    }

    function handleSave(e){
        e.preventDefault()
        if(taskInfo.name==''){
            alert("Por favor insira um título")
            return 
        }
        if(taskInfo.weight==''){
            alert("Por favor insira um peso")
            return
        }
        onSave(taskInfo)
        onHide()
    }

    return (
        <Modal
          onHide={onHide}
          show={show}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            <FormGroup>
                <Form.Label>Título</Form.Label>
                <Form.Control type="text" name="name" className="form-control" value={taskInfo.name} onChange={handleChange}/>
            </FormGroup>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
                <Form.Label>Descrição</Form.Label>
                <Form.Control type="text" name="description" className="form-control" value={taskInfo.description} onChange={handleChange}/>
            </FormGroup>
            <FormGroup>
                <Form.Label>Peso [0-10]</Form.Label>
                <Form.Control type="number" name="weight" className="form-control" value={taskInfo.weight} onChange={handleChange}/>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button className='btn btn-success' onClick={handleSave}>Salvar</Button>
          </Modal.Footer>
        </Modal>
      );
}