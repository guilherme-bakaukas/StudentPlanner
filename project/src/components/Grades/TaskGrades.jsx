import React, {useState} from 'react'
import { useEffect } from 'react'
import { Button, Container, Card, Form, ProgressBar} from 'react-bootstrap'


export default function TaskGradesController({dataSubject, handleReturn, handleUpdate}){
    return (<TaskGrades infoSubject={dataSubject} onReturnPage={handleReturn} onUpdate={handleUpdate}/>)
}

function TaskGrades({infoSubject, onReturnPage, onUpdate}){

    
    function returnPage(e){
    
        e.preventDefault()
        onReturnPage()
    }

    function handleChange(e){
        
        var value = e.target.value
        value = value < 0 ? 0: value
        value = value > 10 ? 10 : value
        //alterar o elemento e calcular a nota
        const index = e.target.id
        const name = e.target.name
        onUpdate(value, index, name)
    }

    return(
        <Container className="d-flex justify-content-center">
            <Container className="d-flex flex-column">
                <div>
                    <Button className="d-flex mr-auto btn btn-light" onClick={returnPage}>
                        <i className="fa fa-arrow-left"></i>
                    </Button>
                    <h1 className="d-flex justify-content-center">{infoSubject.name}</h1>

                    <h3 className="d-flex justify-content-center">Nota final: {infoSubject.tasks.grade}</h3>
                    {infoSubject.tasks.grade >= infoSubject.tasks.min_grade && <ProgressBar variant="success" now={infoSubject.tasks.grade*10} />}
                    {infoSubject.tasks.grade < infoSubject.tasks.min_grade && <ProgressBar variant="danger" now={infoSubject.tasks.grade*10} />}
                </div>

                <div className="mt-3 d-flex justify-content-between">
                    <div>
                        <h3 className="d-flex justify-content-center">Atividades</h3>
                        <h5 className="d-flex justify-content-center">Peso total: {infoSubject.tasks['activities']['info']['total_weight']}</h5>
                        {infoSubject.tasks['activities']['list']!=undefined && infoSubject.tasks['activities']['list'].map((ele, index)=>(
                                    <Container className="mt-3 item">
                                    
                                        <Container className="d-flex flex-column">
                                            
                                            <Card.Text className="font-weight-bold ml-3 mt-3">{ele.name}</Card.Text>
                                            <Card.Text className="ml-3 mb-3">{ele.description}</Card.Text>
                                            <Card.Text className="ml-3 mb-3">Peso: {ele.weight}</Card.Text>
                                            <Container className='d-flex justify-content-around'>
                                            <Form.Group controlId={index}>
                                                <Form.Label className="mt-3">Nota</Form.Label>
                                                <Form.Control type="number" name="activities" className="form-control" value={ele.grade} onChange={handleChange}/>
                                            </Form.Group>
                                 
                                            </Container>
                                        </Container>
                                    
                                </Container>
                        ))}
                        
                    </div>
                    <div>
                        <h3 className="d-flex justify-content-center">Trabalhos</h3>
                        <h5 className="d-flex justify-content-center">Peso total: {infoSubject.tasks['projects']['info']['total_weight']}</h5>
                        {infoSubject.tasks['projects']['list']!=undefined && infoSubject.tasks['projects']['list'].map((ele, index)=>(
                                    <Container className="mt-3 item">
                                    
                                        <Container className="d-flex flex-column">
                                            
                                            <Card.Text className="font-weight-bold ml-3 mt-3">{ele.name}</Card.Text>
                                            <Card.Text className="ml-3 mb-3">{ele.description}</Card.Text>
                                            <Card.Text className="ml-3 mb-3">Peso: {ele.weight}</Card.Text>
                                            <Container className='d-flex justify-content-around'>

                                            <Form.Group controlId={index}>
                                                <Form.Label className="mt-3">Nota</Form.Label>
                                                <Form.Control type="number" name="projects" className="form-control" value={ele.grade} onChange={handleChange}/>
                                            </Form.Group>

                                            </Container>
                                        </Container>
                                    
                                </Container>
                        ))}

                        
                    </div>
                    <div>
                        <h3 className="d-flex justify-content-center">Provas</h3>
                        <h5 className="d-flex justify-content-center">Peso total: {infoSubject.tasks['tests']['info']['total_weight']}</h5>
                        {infoSubject.tasks['tests']['list']!=undefined && infoSubject.tasks['tests']['list'].map((ele, index)=>(
                                    <Container className="mt-3 item">
                                    
                                        <Container className="d-flex flex-column">
                                            
                                            <Card.Text className="font-weight-bold ml-3 mt-3">{ele.name}</Card.Text>
                                            <Card.Text className="ml-3 mb-3">{ele.description}</Card.Text>
                                            <Card.Text className="ml-3 mb-3">Peso: {ele.weight}</Card.Text>
                                            <Container className='d-flex justify-content-around'>

                                            <Form.Group controlId={index}>
                                                <Form.Label className="mt-3">Nota</Form.Label>
                                                <Form.Control type="number" name="tests" className="form-control"  value={ele.grade} onChange={handleChange}/>
                                            </Form.Group>

                                            </Container>
                                        </Container>
                                    
                                </Container>
                        ))}

                        
                    </div>
                    
                </div>
            </Container>
        
        </Container>
        

    )
}
