import React, { Component, useState } from 'react'
import { Container, Form as BootstrapForm, FormGroup, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import DatabaseManager from '../../services/userServices'
import MainController from '../InitialPage/Main/Main'
import TasksController from './Tasks'
import './Form.css'

const headerProps = {
    title: 'Matérias',
    subtitle: 'Adicione provas, atividades e trabalhos da nova matéria',
    icon: 'list-alt',
    helpWeight: true
}

const initialState = {
    subject_name: "",
    grade: 0,
    activities:{
        info:{
            name: "Atividades",   
            total_weight: 0
        },
        list:[],
    },
    projects:{
        info:{
            name: "Trabalhos",   
            total_weight: 0
        },
        list:[],
    },
    tests: {
        info:{
            name: "Provas",   
            total_weight: 0
        },
        list:[],
    }
}

export default function FormController() {

    const { currentUser } = useAuth()
    const databaseManager = new DatabaseManager()

    const [minGrade, setMinGrade] = useState(5)
    const [subject, setSubject] = useState('')
    const [activities, setActivities] = useState(initialState.activities)
    const [projects, setProjects] = useState(initialState.projects)
    const [tests, setTests] = useState(initialState.tests)
    const [clearTask, setClearTask] = useState(0)

    const updateSubject = (subjectName) => {
        setSubject(subjectName)
    }

    const onSave = () => {
        
        databaseManager.getLastId(currentUser).then(response=>{

                var waiting_events = []
                
                console.log(response.val())

                var lastId = response.val()===null ? 0 : response.val().lastId

                activities.list.map(elem =>{
                    waiting_events.push({
                        id: lastId++,
                        title: elem.name,
                        subject: subject,
                        description: elem.description===undefined ? '':elem.description
                    })
                })
                projects.list.map(elem =>{
                    waiting_events.push({
                        id: lastId++,
                        title: elem.name,
                        subject: subject,
                        description: elem.description===undefined ? '':elem.description
                    })
                })
                tests.list.map(elem =>{
                    waiting_events.push({
                        id: lastId++,
                        title: elem.name,
                        subject: subject,
                        description: elem.description===undefined ? '':elem.description 
                    })
                })
                console.log(waiting_events)
                databaseManager.setWaitingEventsSubject(currentUser, waiting_events, subject)
                databaseManager.setLastId(currentUser, lastId)
            })

        var subjectData = {}

        subjectData["min_grade"] = minGrade
        subjectData["subject_name"] = subject
        subjectData["activities"] = activities
        subjectData["projects"] = projects
        subjectData["tests"] = tests
        subjectData["grade"] = 0
        
        setClearTask(1)
        setSubject('')
        setMinGrade(5)
        return databaseManager.createSubjectOnUser(subjectData, currentUser)
    }

    const onClear = () => {
        setSubject('')
        setActivities({
            info:{
                name: "Atividades",   
                total_weight: 0
            },
            list:[],
        })
        setProjects({
            info:{
                name: "Trabalhos",   
                total_weight: 0
            },
            list:[],
        })
        setTests({
            info:{
                name: "Provas",   
                total_weight: 0
            },
            list:[],
        })
        console.log(activities)
        setClearTask(1)
    }

    const onActivities = (act) => {
        setActivities(act)
    }

    const onProjects = (proj) => {
        setProjects(proj)
    }

    const onTests = (tst) => {
        setTests(tst)
    }

    const updateGrade = (grade) =>{
        var value = grade
        value = value < 0 ? 0:value
        value = value > 10 ? 10:value
        
        setMinGrade(value)
    }
    
    return <Form activities={activities} projects={projects} tests={tests} subject={subject} minGrade = {minGrade} updateGrade={updateGrade} updateSubject={updateSubject} onActivities={onActivities} onProjects={onProjects} onTests={onTests} onSave={onSave} onClear={onClear} clearTask={clearTask}/>
}

function Form( { activities, projects, tests, subject, minGrade, updateGrade, updateSubject, onActivities, onProjects, onTests, onSave, onClear, clearTask}) {

    const [subjectSaved, setSubjectSaved] = useState(false)

    function updateField(e) {
        updateSubject(e.target.value)
    }

    function save(e){
        onSave()
        .then(value=>{
            setSubjectSaved(true)
        })
        .catch(error => {
        })
    }

    function updateActivities(element) {
        onActivities(element)
    }

    function updateTests(element) {
        onTests(element)
    }

    function updateProjects(element) {
        onProjects(element)
    }

    function clear(e) {
        onClear()
    }

    function updateMingrade(e){
        updateGrade(e.target.value)
    }

    return(
        <MainController {...headerProps}>
            <Container className="d-flex justify-content-center">
                <BootstrapForm className="forms">
                    <BootstrapForm.Label className><h1>Disciplinas</h1></BootstrapForm.Label>
                    <FormGroup className="form-group">
                        <BootstrapForm.Label htmlFor="input subject">Adicione a disciplina desejada</BootstrapForm.Label>
                        <BootstrapForm.Control type="text"
                        name="subject_name"
                        className="form-control" 
                        placeholder="Nome da materia"
                        value={subject}
                        onChange={e => updateField(e)}/>
                    </FormGroup>
                    <FormGroup className="form-group">
                        <BootstrapForm.Label htmlFor="input min-grade">Média da matéria</BootstrapForm.Label>
                        <BootstrapForm.Control type="number" 
                        name="min-grade" 
                        className="form-control" 
                        value={minGrade}
                        onChange={e => updateMingrade(e)}/>
                    </FormGroup>


                    <FormGroup className="d-flex justify-content-between">
                        <TasksController  data={activities} onUpdate={updateActivities} onClear={clearTask}/>
                        <TasksController  data={projects} onUpdate={updateProjects} onClear={clearTask}/>
                        <TasksController  data={tests} onUpdate={updateTests} onClear={clearTask}/>
                    </FormGroup>

                    <FormGroup className="row mt-5">
                        <Container className="col-12">
                            <Button className="btn btn-primary"
                                onClick={e => save(e)}>
                                Salvar
                            </Button>

                            <Button className="btn btn-secondary ml-2"
                                onClick={e => clear(e)}>
                                Cancelar
                            </Button>
                        </Container>
                    </FormGroup>
                    { subjectSaved==true && <Alert key="alerta sucesso" variant="success">
                        Disciplina cadastrada com sucesso!
                    </Alert>}
                </BootstrapForm>
            </Container>
        </MainController>
    )
}