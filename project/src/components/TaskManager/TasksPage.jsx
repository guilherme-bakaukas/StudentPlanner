import React, {useState} from 'react'
import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import DatabaseManager from '../../services/userServices'
import MainController from '../InitialPage/Main/Main'
import { Button, Container, Card, Form } from 'react-bootstrap'
import PopupEditController from './PopupEdit'
import PopupAddController from './PopupAdd'
import './TaskManager.css'


export default function TasksPageController({dataSubject, handleReturn, handleUpdate, handleDelete, handleAdd, handleWeightUpdate, handleGradeUpdate}){
    return (<TasksPage infoSubject={dataSubject} onReturnPage={handleReturn} onUpdate={handleUpdate} onDelete={handleDelete} onPushTask={handleAdd} onUpdateWeight={handleWeightUpdate} onUpdateMinGrade={handleGradeUpdate}/>)
}

function TasksPage({infoSubject, onReturnPage, onUpdate, onDelete, onPushTask, onUpdateWeight, onUpdateMinGrade}){

    const [clickInfo, setClickInfo] = useState({
        open: false,
        info: {},
        index: -1,
        name: ''
    })

    const [addTaskInfo, setAddTaskInfo] = useState({
        open: false,
        name: '',
    })
    
    function returnPage(e){
        console.log(addTaskInfo)
        console.log(clickInfo)
        e.preventDefault()
        onReturnPage()
    }

    function handleAdd(e){
        e.preventDefault()
        var newInfo = addTaskInfo
        newInfo.open = true
        newInfo.name = e.target.name
        setAddTaskInfo({...newInfo})
    }
    

    function handleDelete(e){
        e.preventDefault()
        onDelete(e.target.name, e.target.id)
    }

    function handleEdit(e){
        
        e.preventDefault()
        const eventEdit = infoSubject['tasks'][e.target.name]['list'][e.target.id]
        
        const newInfo = clickInfo
        newInfo.open = true
        newInfo.info = eventEdit
        newInfo.name = e.target.name
        newInfo.index = e.target.id

        setClickInfo({...newInfo})
    }

    function handleUpdateClose(){
        const newInfo = clickInfo
        newInfo.open = false
        newInfo.info = {}
        newInfo.name = ''
        newInfo.index = -1

        setClickInfo({...newInfo})

    }

    function handleSaveChanges(changes){
        onUpdate(changes, clickInfo.index, clickInfo.name)
        
    }

    function saveNewTask(newTask){
        onPushTask(newTask, addTaskInfo.name)
    }

    function handleAddClose(){
        const newInfo = addTaskInfo
        newInfo.open = false
        newInfo.name = ''

        setAddTaskInfo({...newInfo})
    }

    function handleChangeWeight(e){
        console.log(e.target.name)
        onUpdateWeight(e.target.name, e.target.value)
    }

    function updateMingrade(e){
        var value = e.target.value
        value = value < 0 ? 0:value
        value = value > 10 ? 10:value
        
        onUpdateMinGrade(value)
    }

    return(
        <Container className="d-flex justify-content-center">
            <Container className="d-flex flex-column">
                <div>
                    <Button className="d-flex mr-auto btn btn-light" onClick={returnPage}>
                        <i className="fa fa-arrow-left"></i>
                    </Button>
                    <h1 className="d-flex justify-content-center">{infoSubject.name}</h1>
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="input min-grade">Média da matéria</Form.Label>
                        <Form.Control type="number" 
                        name="min-grade" 
                        className="form-control" 
                        value={infoSubject.tasks.min_grade}
                        onChange={e => updateMingrade(e)}/>
                    </Form.Group>
                </div>

                <div className="mt-3 d-flex justify-content-between">
                    <div>
                        <h3 className="d-flex justify-content-center">Atividades</h3>
                        <Form.Group>
                            <Form.Label className="mt-3">Peso total</Form.Label>
                            <Form.Control type="number" name="activities" className="form-control" value={infoSubject['tasks']['activities']['info']['total_weight']} onChange={handleChangeWeight}/>
                        </Form.Group>
                        {infoSubject.tasks['activities']['list']!=undefined && infoSubject.tasks['activities']['list'].map((ele, index)=>(
                                    <Container className="mt-3 item">
                                    
                                        <Container className="d-flex flex-column">
                                            
                                            <Card.Text className="font-weight-bold ml-3 mt-3">{ele.name}</Card.Text>
                                            <Card.Text className="ml-3 mb-3">{ele.description}</Card.Text>
                                            <Card.Text className="ml-3 mb-3">Peso: {ele.weight}</Card.Text>
                                            <Container className='d-flex justify-content-around'>

                                                <Button className="delButton btn btn-warning" name='activities' id={index} onClick={handleEdit}>Editar</Button>
                                                <Button className="delButton  btn btn-danger" name='activities' id={index} onClick={handleDelete}>Excluir</Button>
                                
                                            </Container>
                                        </Container>
                                    
                                </Container>
                        ))}
                        <div className="mt-5 d-flex justify-content-center">
                            <Button className="addButton btn btn-primary" name="activities" onClick={handleAdd}>Adicionar atividade</Button>
                        </div>
                        
                    </div>
                    <div>
                        <h3 className="d-flex justify-content-center">Trabalhos</h3>
                        <Form.Group>
                            <Form.Label className="mt-3">Peso total</Form.Label>
                            <Form.Control type="number" name="projects" className="form-control" value={infoSubject['tasks']['projects']['info']['total_weight']} onChange={handleChangeWeight}/>
                        </Form.Group>
                        {infoSubject.tasks['projects']['list']!=undefined && infoSubject.tasks['projects']['list'].map((ele, index)=>(
                                    <Container className="mt-3 item">
                                    
                                        <Container className="d-flex flex-column">
                                            
                                            <Card.Text className="font-weight-bold ml-3 mt-3">{ele.name}</Card.Text>
                                            <Card.Text className="ml-3 mb-3">{ele.description}</Card.Text>
                                            <Card.Text className="ml-3 mb-3">Peso: {ele.weight}</Card.Text>
                                            <Container className='d-flex justify-content-around'>

                                                <Button className="delButton btn btn-warning" name='projects' id={index} onClick={handleEdit}>Editar</Button>
                                                <Button className="delButton  btn btn-danger" name='projects' id={index} onClick={handleDelete}>Excluir</Button>

                                            </Container>
                                        </Container>
                                    
                                </Container>
                        ))}
                        <div className="mt-5 d-flex justify-content-center">
                            <Button className="addButton btn btn-primary" name="projects" onClick={handleAdd}>Adicionar trabalho</Button>
                        </div>
                        
                    </div>
                    <div>
                        <h3 className="d-flex justify-content-center">Provas</h3>
                        <Form.Group>
                            <Form.Label className="mt-3">Peso total</Form.Label>
                            <Form.Control type="number" name="tests" className="form-control" value={infoSubject['tasks']['tests']['info']['total_weight']} onChange={handleChangeWeight}/>
                        </Form.Group>
                        {infoSubject.tasks['tests']['list']!=undefined && infoSubject.tasks['tests']['list'].map((ele, index)=>(
                                    <Container className="mt-3 item">
                                    
                                        <Container className="d-flex flex-column">
                                            
                                            <Card.Text className="font-weight-bold ml-3 mt-3">{ele.name}</Card.Text>
                                            <Card.Text className="ml-3 mb-3">{ele.description}</Card.Text>
                                            <Card.Text className="ml-3 mb-3">Peso: {ele.weight}</Card.Text>
                                            <Container className='d-flex justify-content-around'>

                                                <Button className="delButton btn btn-warning" name='tests' id={index} onClick={handleEdit}>Editar</Button>
                                                <Button className="delButton  btn btn-danger" name='tests' id={index} onClick={handleDelete}>Excluir</Button>

                                            </Container>
                                        </Container>
                                    
                                </Container>
                        ))}
                        <div className="mt-5 d-flex justify-content-center">
                            <Button className=" addButton btn btn-primary" name="tests" onClick={handleAdd}>Adicionar prova</Button>
                        </div>
                        
                    </div>
                    
                </div>
            </Container>

            <PopupEditController clickInfo = {clickInfo['info']} onHide={handleUpdateClose} show={clickInfo.open} onSave={handleSaveChanges}/>
            <PopupAddController onHide={handleAddClose} popupInfo={addTaskInfo} onSave={saveNewTask}/>
        
        </Container>
        

    )
}