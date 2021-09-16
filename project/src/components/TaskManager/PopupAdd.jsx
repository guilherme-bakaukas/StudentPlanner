import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Modal, Button, FormGroup, Form } from "react-bootstrap";

export default function PopupAddController({onHide, popupInfo, onSave}){

    return(<PopupAdd onHide={onHide} popupInfo={popupInfo} onSave={onSave}/>)
}

function PopupAdd({onHide, popupInfo, onSave}){

    const [taskInfo, setTaskInfo] = useState({
        name: '',
        description:'',
        weight: 0,
        grade: 0
    })

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
          show={popupInfo.open}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                {popupInfo.name == 'activities' && <p className="">Nova atividade</p>}
                {popupInfo.name == 'projects' && <p>Novo trabalho</p>}
                {popupInfo.name == 'tests' && <p>Nova prova</p>}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <FormGroup>
                <Form.Label>Título</Form.Label>
                <Form.Control type="text" name="name" className="form-control" value={taskInfo.name} onChange={handleChange}/>
            </FormGroup>
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
            <Button className='btn btn-success' onClick={handleSave}>Adicionar</Button>
          </Modal.Footer>
        </Modal>
      );
}