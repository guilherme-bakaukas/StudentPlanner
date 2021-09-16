import React, {useState} from 'react'
import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import DatabaseManager from '../../services/userServices'
import MainController from '../InitialPage/Main/Main'
import { Button, Card, Container, Modal  } from 'react-bootstrap'


export default function SubjectsPageController({data, onDelete, onSelect}){

    function deleteItem(id, name){
        var copy = data
        copy.splice(id, 1)
        console.log(copy)
        onDelete(copy, name)
    }

    function selectItem(index){
        onSelect(index)
    }

    return (<SubjectsPage data={data} onDeleteItem={deleteItem} onSelectItem={selectItem}/>)
}

function SubjectsPage({data, onDeleteItem, onSelectItem}){

    const [delConfirm, setDelConfirm] = useState(false)
    const [delInfo, setDelInfo] = useState({id:0, name:''})

    function handleClick(e){
        
        e.preventDefault()
        console.log(e.target.id)
        onSelectItem(e.target.id)
    }

    function handleDelete(e){
        e.preventDefault()
        setDelConfirm(true)
        setDelInfo({id: e.target.id, name: e.target.name})
    }

    function handleClose(){
        setDelConfirm(false)
        setDelInfo({id: 0, name:''})
    }

    function deleteSubject(){
        handleClose()
        onDeleteItem(delInfo.id, delInfo.name)
    }

    return(

        <div className="">
        <Modal show={delConfirm} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Excluir Disciplina</Modal.Title>
            </Modal.Header>
            <Modal.Body>{`Tem certeza que deseja excluir a disciplina ${delInfo.name} ?`}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={deleteSubject}>
                    Excluir
                </Button>
            </Modal.Footer>
      </Modal>
        <h1>Disciplinas cadastradas</h1>

        <div className="d-flex flex-column">
            {data!=undefined && data.map((element, index) =>(
                <div className="justify-content-start">
                    <Container className="mt-3 item">
                        
                            <Container className="d-flex">
                                <Card.Text className="font-weight-bold ml-3 mt-3">{element.name}</Card.Text>
                                <Container className="d-flex justify-content-end">
                                    <Button className="delButton  btn btn-primary" id={index} onClick={handleClick}>Ver</Button>
                                    <Button className="delButton  btn btn-danger" name={element.name} id={index} onClick={handleDelete}>Excluir</Button>
                                </Container>

                            </Container>
                        
                    </Container>
                </div>
            ))}
            
        </div>

    </div>

    )
}

