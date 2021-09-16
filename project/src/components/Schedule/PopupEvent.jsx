import React, {useState} from 'react';
import { Modal, Button } from "react-bootstrap";

export default function PopupEvent(props){

  const [delConfirm, setDelConfirm] = useState(false)

  function openDelConfirmation(){
    setDelConfirm(true)
  }

  function handleClose(){
    setDelConfirm(false)
  }

  function deleteSubject(){
    handleClose()
    props.onDelete()
  }

    return (
      <div>
        <Modal
          show = {props.show}
          onHide = {props.onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {props.info.title} - {props.info.subject}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {props.info.description}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button className='btn btn-danger' onClick={openDelConfirmation}>Excluir</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={delConfirm} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Excluir Disciplina</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Tem certeza que deseja excluir o evento ${props.info.title} do calendário?
        Não será possível adicioná-la novamente`}</Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
                Cancelar
            </Button>
            <Button variant="danger" onClick={deleteSubject}>
                Excluir
            </Button>
        </Modal.Footer>
        </Modal>
      </div>
        

      );
}