import React, {useState} from 'react'
import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import DatabaseManager from '../../services/userServices'
import MainController from '../InitialPage/Main/Main'
import { Button  } from 'react-bootstrap'
import SubjectsPageController from './SubjectsPage'
import { BrowserRouter } from 'react-router-dom'
import TasksPageController from './TasksPage'
import { Switch, Route, Redirect } from "react-router";

const headerProps = {
    title: 'Gerenciador de tarefas',
    subtitle: 'Organize suas tarefas da maneira como quiser',
    icon: 'edit',
    helpWeight: true
}

export default function TaskManagerController(){

    const { currentUser } = useAuth()
    const databaseManager = new DatabaseManager()
    const [currentTasks, setCurrentTasks] = useState({})
    const [selectedSubject, setSelectedSubject] = useState({index: -1, isSelected: false})

    useEffect(()=>{

        databaseManager.getUserSubjects(currentUser).then(response => {
            
            var value = response.val()
            var subject_names = []
            if (value!=null){subject_names = Object.getOwnPropertyNames(value)}
            
            var tasks = {info: []}

            subject_names.map( subject =>{
                tasks['info'].push({
                    name: subject,
                    tasks: value[subject]
                }
            )
            })

            setCurrentTasks(tasks)
            console.log(tasks)

            

        })
    }, [])

    return (<TaskManager currentUser={currentUser} databaseManager={databaseManager} currentTasks={currentTasks} setCurrentTasks={setCurrentTasks} selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject}/>)
}

function TaskManager({currentUser, databaseManager, currentTasks, setCurrentTasks, selectedSubject, setSelectedSubject}){

    function handleDeleteSubject(newData, name){
        setCurrentTasks({info: newData})
        console.log(currentTasks)
        // exibir mensagem de confirmação e deletar do banco de dados
        databaseManager.deleteUserSubject(currentUser, name)
    }

    function handleSelect(index){
        setSelectedSubject({index: index,  isSelected: true})
    }

    function handleReturnPage(){
        setSelectedSubject({index: -1, isSelected: false})
    }

    function handleUpdateTask(taskChanged, index, name){
        const previousName = currentTasks['info'][selectedSubject.index]['tasks'][name]['list'][index].name
        var newInfo = currentTasks
        newInfo['info'][selectedSubject.index]['tasks'][name]['list'][index] = taskChanged
        setCurrentTasks({...newInfo})
        console.log(previousName)
        databaseManager.updateUserTask(currentUser, currentTasks['info'][selectedSubject.index], previousName, taskChanged)
    }

    function handleDeleteTask(name, index){
        const previousName = currentTasks['info'][selectedSubject.index]['tasks'][name]['list'][index].name
        var newInfo = currentTasks
        newInfo['info'][selectedSubject.index]['tasks'][name]['list'].splice(index, 1)
        setCurrentTasks({...newInfo})
        console.log(previousName)
        databaseManager.deleteUserTask(currentUser, currentTasks['info'][selectedSubject.index], previousName)
    }

    function handleAddTask(newTask, name){
        console.log(currentTasks)
        var newInfo = currentTasks
        if (newInfo['info'][selectedSubject.index]['tasks'][name]['list'] == undefined){
            const newInfo = currentTasks
            var obj = {
                list: [],
            }
            newInfo['info'][selectedSubject.index]['tasks'][name] = Object.assign(newInfo['info'][selectedSubject.index]['tasks'][name], obj)
            console.log(newInfo)
            setCurrentTasks({...newInfo})
        }
        newInfo['info'][selectedSubject.index]['tasks'][name]['list'].push(newTask)
        setCurrentTasks({...newInfo})
        databaseManager.addUserTask(currentUser, currentTasks['info'][selectedSubject.index], newTask)
    }

    function handleWeightChange(name, value){
        var newInfo = currentTasks
        newInfo['info'][selectedSubject.index]['tasks'][name]['info']['total_weight'] = value
        setCurrentTasks({...newInfo})

        console.log(name, value)
        databaseManager.updateTotalWeight(currentUser, newInfo['info'][selectedSubject.index]['name'], name, value)
    }

    function handleGradeChange(newMinGrade){
        var newInfo = currentTasks
        newInfo['info'][selectedSubject.index]['tasks']['min_grade'] = newMinGrade
        setCurrentTasks({...newInfo})

        databaseManager.updateMinGrade(currentUser, currentTasks['info'][selectedSubject.index]['name'], newMinGrade)
    }

    return(
        <MainController {...headerProps}>
            {!selectedSubject.isSelected && <SubjectsPageController data={currentTasks['info']} onDelete={handleDeleteSubject} onSelect={handleSelect}/>}
            {selectedSubject.isSelected && selectedSubject.index!=-1 && <TasksPageController dataSubject={currentTasks['info'][selectedSubject.index]} handleReturn={handleReturnPage} handleUpdate={handleUpdateTask} handleDelete={handleDeleteTask} handleAdd={handleAddTask} handleWeightUpdate={handleWeightChange} handleGradeUpdate={handleGradeChange}/>}
        </MainController>
    )
}