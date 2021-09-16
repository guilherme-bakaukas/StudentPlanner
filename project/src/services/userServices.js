import { ResponsiveEmbed } from 'react-bootstrap'
import { database } from '../firebase'

export default class DatabaseManager {

    constructor(props) {
        this.usersRefName = "Users"
        this.database = database
    }

    createUserIfNeeded(user) {

        const usersRef = database.ref(this.usersRefName)

        return usersRef.equalTo(user.uid).on('value', snapshot => {
            const fetchedUser = snapshot.val()

            if (fetchedUser == null) {
                return usersRef.set(user.uid)
            }
        })
    }

    createSubjectOnUser(subject, user) {

        const userRef = database.ref(this.usersRefName).child(user["uid"]).child("Subjects").child(subject.subject_name)

        var subjectWithoutName = subject
        delete subjectWithoutName["subject_name"]

        return userRef.set(subjectWithoutName)
    }

    getUserSubjects(user) {

        const userRef = database.ref(this.usersRefName).child(user["uid"]).child("Subjects")

        return userRef.once('value', snapshot => {
            return snapshot.val()
        })
    }


    getCalendarEvents(user){
        
        const userRef = database.ref(this.usersRefName).child(user["uid"]).child("Schedule")

        return userRef.once('value', snapshot => {
            return snapshot.val()
        })
    }

    setCalendarEvents(user, events) {
        
        const userRef = database.ref(this.usersRefName).child(user["uid"]).child("Schedule")

        return userRef.set(events)
    }

    getSubjectOfWaitingEvents(user, subject){
        const userWaitingListRef = database.ref(this.usersRefName).child(user["uid"]).child("WaitingEvents").child(subject)
        
        return userWaitingListRef.once('value', snapshot => {
            return snapshot.val()
        })
    }

    setSubjectOfWaitingEvents(user, subject, events){
        const userWaitingListRef = database.ref(this.usersRefName).child(user["uid"]).child("WaitingEvents").child(subject)
        return userWaitingListRef.set(events)
    }

    

    getWaitingEvents(user){
        
        const userRef = database.ref(this.usersRefName).child(user["uid"]).child("WaitingEvents")

        return userRef.once('value', snapshot => {
            return snapshot.val()
        })
    }
    
    setWaitingEvents(user, waitingEvents) {
        const userRef = database.ref(this.usersRefName).child(user["uid"]).child("WaitingEvents")

        return userRef.set(waitingEvents)
    }

    setWaitingEventsSubject(user, waitingEvents, subject) {
        
        const userRef = database.ref(this.usersRefName).child(user["uid"]).child("WaitingEvents").child(subject)

        return userRef.set(waitingEvents)
    }

    getLastId(user){
        
        const userRef = database.ref(this.usersRefName).child(user["uid"]).child("LastID")

        return userRef.once('value', snapshot => {
            return snapshot.val()
        })
    }

    setLastId(user, lastId){
        
        const userRef = database.ref(this.usersRefName).child(user["uid"]).child("LastID")
        
        return userRef.set({
            lastId: lastId
        })
    }
//currentUser, newInfo['info'][selectedSubject.index]['name'], (newGrade/100).toFixed(2), name, index, value
    updateUserGrades(user, subjectName, newTotalGrade, name, newInfo){
        const userTotalGradeRef = database.ref(this.usersRefName).child(user["uid"]).child("Subjects").child(subjectName).child('grade')
        userTotalGradeRef.set(newTotalGrade)
        const userTypeTaskRef = database.ref(this.usersRefName).child(user["uid"]).child("Subjects").child(subjectName).child(name).child('list')

        return userTypeTaskRef.set(newInfo)
    }


    deleteUserSubject(user, subject){
        const userSubjectsRef = database.ref(this.usersRefName).child(user["uid"]).child("Subjects").child(subject)
        userSubjectsRef.remove()
        
        this.getCalendarEvents(user).then(response =>{  
            var events = response.val()
            if (events != null){
                console.log(events)
                function filterBySubject(elem){
                    console.log(elem)
                    console.log(elem.subject)
                    console.log(elem.subject !== subject)
                    return (elem.subject !== subject)
                }
                events = events.filter(filterBySubject)
                console.log(events)
    
                this.setCalendarEvents(user, events)
            }

        })

        const userWaitingListRef = database.ref(this.usersRefName).child(user["uid"]).child("WaitingEvents").child(subject)
        return userWaitingListRef.remove()
    }

    updateUserTask(user, subjectChanged, previousName, taskInfo){

        this.getCalendarEvents(user).then(response =>{  
            var events = response.val()
            console.log(events)
            if (events != null){
                events.map(ele =>{
                    if (ele.subject == subjectChanged['name'] && ele.title == previousName){
                        ele.title = taskInfo.name
                        ele.description = taskInfo.description == undefined ? '':taskInfo.description
                    }
                })
    
                this.setCalendarEvents(user, events)
            }

        })

        this.getSubjectOfWaitingEvents(user, subjectChanged['name']).then(response=>{
            var events = response.val()
            if (events != null){
                events.map(ele=>{
                    if (ele.subject == subjectChanged['name'] && ele.title == previousName){
                        ele.title = taskInfo.name
                        ele.description = taskInfo.description == undefined ? '':taskInfo.description
                    }
                })
    
                this.setSubjectOfWaitingEvents(user, subjectChanged['name'], events)
            }

        })


        console.log(subjectChanged)
        const userSubjectsRef = database.ref(this.usersRefName).child(user["uid"]).child("Subjects").child(subjectChanged['name'])
        return userSubjectsRef.set(subjectChanged['tasks'])
    }

    deleteUserTask(user, subjectChanged, previousName){

        this.getCalendarEvents(user).then(response =>{  
            var events = response.val()
            console.log(events)
            if (events != null){
                function filterByTask(elem){
                    var condition = ((elem.subject == subjectChanged['name']) && (elem.title == previousName))
                    console.log(condition)
                    return (!condition)
                }
                events = events.filter(filterByTask)
                console.log(events)
    
                this.setCalendarEvents(user, events)
            }
        })

        this.getSubjectOfWaitingEvents(user, subjectChanged['name']).then(response=>{
            var events = response.val()
            if (events != null){
                function filterByTask(elem){
                    var condition = ((elem.subject == subjectChanged['name']) && (elem.title == previousName))
                    console.log(condition)
                    return (!condition)
                }
                events = events.filter(filterByTask)
                console.log(events)
    
                this.setSubjectOfWaitingEvents(user, subjectChanged['name'], events)
            }

        })


        const userSubjectsRef = database.ref(this.usersRefName).child(user["uid"]).child("Subjects").child(subjectChanged['name'])
        return userSubjectsRef.set(subjectChanged['tasks'])
    }

    addUserTask(user, subjectChanged , newTask){

        this.getLastId(user).then(response=>{
            const lastId = response.val().lastId
            console.log(lastId)

            this.getSubjectOfWaitingEvents(user, subjectChanged['name']).then(res=>{
                var events = res.val()
                if (events == null){
                    events = []
                }
                events.push({
                    description: newTask.description == undefined ? '':newTask.description,
                    subject:subjectChanged['name'],
                    id: lastId,
                    title: newTask.name
                })
                this.setSubjectOfWaitingEvents(user, subjectChanged['name'], events)
            })
            this.setLastId(user, lastId+1)

        })

        const userSubjectsRef = database.ref(this.usersRefName).child(user["uid"]).child("Subjects").child(subjectChanged['name'])
        return userSubjectsRef.set(subjectChanged['tasks'])
    }

    updateTotalWeight(user, subjectName ,name, value){
        const userWeightSubjectRef = database.ref(this.usersRefName).child(user["uid"]).child("Subjects").child(subjectName).child(name).child('info').child('total_weight')
        return userWeightSubjectRef.set(value)
    }
    
    updateMinGrade(user, subjectName, value){
        const userMinGradeRef = database.ref(this.usersRefName).child(user["uid"]).child("Subjects").child(subjectName).child('min_grade')
        return userMinGradeRef.set(value)
    }

}
