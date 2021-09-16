import React, {useState, useEffect} from 'react'
import DatabaseManager from '../../services/userServices'
import { useAuth } from '../../context/AuthContext'
import Main from '../InitialPage/Main/Main'
import SubjectsController from './Subjects'
import TaskGradesController from './TaskGrades'

const headerProps = {
    title: 'Gerenciamento de notas',
    subtitle: 'Adicione e visualize suas notas e seu desempenho',
    icon: 'graduation-cap',
    helpWeight: true
}

export default function GradesManagerController() {
    
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

        })
    }, [])
    
    return <GradesManager currentUser={currentUser} databaseManager={databaseManager} currentTasks={currentTasks} setCurrentTasks={setCurrentTasks} selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject}/>
}

function GradesManager({currentUser, databaseManager, currentTasks, setCurrentTasks, selectedSubject, setSelectedSubject}){

    function handleSelect(index){
        
        setSelectedSubject({index: index,  isSelected: true})

        var newInfo = currentTasks
        const newGrade = calculateGrade(newInfo['info'][index]['tasks'])

        newInfo['info'][index]['tasks']['grade'] = (newGrade/100).toFixed(2)
        setCurrentTasks({...newInfo})

    }

    function handleReturnPage(){
        setSelectedSubject({index: -1, isSelected: false})
    }

    function calculateGrade(newInfo){

        var newGrade = 0
        var taskGrade = 0

        if (newInfo['activities']['list'] !=undefined){
            newInfo['activities']['list'].map((ele, index)=>{
                taskGrade = ele.grade != undefined ? ele.grade*ele.weight*newInfo['activities']['info']['total_weight']:0
                newGrade+=taskGrade
            })
        }

        if (newInfo['projects']['list'] !=undefined){
            newInfo['projects']['list'].map((ele)=>{
                taskGrade = ele.grade != undefined ? ele.grade*ele.weight*newInfo['projects']['info']['total_weight']:0
                newGrade+=taskGrade
            })
             
        }
        
        if (newInfo['tests']['list'] !=undefined){
            newInfo['tests']['list'].map((ele)=>{
                taskGrade = ele.grade != undefined ? ele.grade*ele.weight*newInfo['tests']['info']['total_weight']:0
                newGrade+=taskGrade
            })
        }        

        return newGrade

    }

    function handleUpdate(value, index, name){
        var newInfo = currentTasks
        newInfo['info'][selectedSubject.index]['tasks'][name]['list'][index]['grade'] = value
        console.log(newInfo['info'][selectedSubject.index]['tasks'][name]['list'][index])
        console.log(selectedSubject)
        
        const newGrade = calculateGrade(newInfo['info'][selectedSubject.index]['tasks'])

        newInfo['info'][selectedSubject.index]['tasks']['grade'] = (newGrade/100).toFixed(2)
        setCurrentTasks({...newInfo})

        databaseManager.updateUserGrades(currentUser, newInfo['info'][selectedSubject.index]['name'], (newGrade/100).toFixed(2), name, newInfo['info'][selectedSubject.index]['tasks'][name]['list'] )

    }

    return (
        <Main {...headerProps}>
            {!selectedSubject.isSelected && <SubjectsController data={currentTasks['info']} onSelect={handleSelect}/>}
            {selectedSubject.isSelected && selectedSubject.index!=-1 && <TaskGradesController dataSubject={currentTasks['info'][selectedSubject.index]} handleReturn={handleReturnPage} handleUpdate={handleUpdate}/>}
        </Main>
    )
}
