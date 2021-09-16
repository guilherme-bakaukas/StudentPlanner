import Calendar from '@fullcalendar/react'
import DayGridPlugin from '@fullcalendar/daygrid'
import InteractionPlugin, {Draggable} from '@fullcalendar/interaction'
import timeGridPlugin from "@fullcalendar/timegrid";
import 'fullcalendar/main.css';
import { useAuth } from '../../context/AuthContext'
import DatabaseManager from '../../services/userServices'

import React, { useState, useEffect,useRef, memo } from 'react'
import MainController from '../InitialPage/Main/Main'
import WaitingItem from './WaitingItem';
import PopupEvent from './PopupEvent';

const headerProps = {
    title: 'Agenda',
    subtitle: 'Organize as datas de suas tarefas e compromissos',
    icon: 'calendar'
}


export default function ScheduleController(){

    const [subjectsCheckbox, setSubjectsCheckbox] = useState([])
    const [waitingEvents, setWaitingEvents] = useState({})
    const [currentEvents, setCurrentEvents] = useState([])
    const { currentUser } = useAuth()
    const databaseManager = new DatabaseManager()

    useEffect(() => {

        databaseManager.getCalendarEvents(currentUser).then(response=>{
            var value = response.val()
            if (value!==null){setCurrentEvents(value)}
        })

        databaseManager.getWaitingEvents(currentUser).then(response => {
            
            var subject_names = []
            var value = response.val()
            if (value!=null){subject_names = Object.getOwnPropertyNames(value)}
    
            var obj = {}
            var subjects_list = []
            subject_names.forEach(name => {
                obj = {
                    "name": name,
                    "selected": false
                }
                subjects_list.push(obj)
            })
            setWaitingEvents(value)
            setSubjectsCheckbox(subjects_list)
        })
      }, [])
    

    return <Schedule subjectsCheckbox={subjectsCheckbox} setSubjectsCheckbox={setSubjectsCheckbox} waitingEvents={waitingEvents} setWaitingEvents ={setWaitingEvents} databaseManager={databaseManager}
    currentEvents={currentEvents} setCurrentEvents={setCurrentEvents} currentUser={currentUser}/>
}

const ExternalEvent = memo(({ event }) => {
  
    let elRef = useRef(null);

    useEffect(() => {
        let draggable = new Draggable(elRef.current, {
            eventData: () => {
            return { ...event, create: true }
        }
    })

    return () => draggable.destroy();
  })

    return (
        <div
        ref={elRef}
        className="fc-event"
        title={event.title}
        data={event.id} 
        id= {event.id}
        subject={event.subject}
        description={event.description}
        >
        <WaitingItem title={event.title} description={event.description} subject={event.subject}/>
        </div>
    )
})

function Schedule( {subjectsCheckbox, setSubjectsCheckbox, waitingEvents, setWaitingEvents, databaseManager, currentEvents, setCurrentEvents, currentUser}){

    const calendarComponentRef = useRef(null)
    const [itemSelected, setItemSelected] = useState({})
    const [waitingList, setWaitingList] = useState([])
    const [clickInfo, setClickInfo] = useState({
        id: 0,
        open: false,
        title: "",
        description: ""
    })

   const handleSubjectsSelected = ()=>{
       
       var subjects = []
       subjectsCheckbox.map(element =>{
            if (element.selected == true){
                waitingEvents[element.name].map(obj=>{
                    subjects.push(obj)
                })
           }
       })
       setWaitingList(subjects)
   }

    const onDelete = ()=>{

        const id_removed = clickInfo.id
        var copy = currentEvents
        copy.map((elem, index)=>{
            if(elem.id == id_removed){
                copy.splice(index, 1)
            }
        })
        setCurrentEvents(copy)

        itemSelected.event.remove()
        
        databaseManager.setCalendarEvents(currentUser, currentEvents)
        databaseManager.setWaitingEvents(currentUser, waitingEvents)
        handleClose()
    }

    const eventClick=(e)=>{
        
        var info = clickInfo
        info.title = e.event.title
        info.description = e.event.extendedProps.description
        info.id = e.event.id
        info.subject = e.event.extendedProps.subject
        info.open = true

        setItemSelected({...e})
        setClickInfo({...info})
    }

    const handleCheckBox=(e)=>{

        var copy = subjectsCheckbox
        copy.map(element =>{
            if (element.name == e.target.id){
                element.selected = e.target.checked
            }
        })
        
        setSubjectsCheckbox(copy)
        
        handleSubjectsSelected()
        }
        

    const handleClose=()=>{
        setItemSelected({})
        var info = clickInfo
        info.open = false
        setClickInfo({...info})
        console.log(clickInfo)
    }

    const handleEventReceive = (eventInfo)=>{
        
        const newEvent = {
          id: eventInfo.draggedEl.getAttribute("id"),
          title: eventInfo.draggedEl.getAttribute("title"),
          description: eventInfo.draggedEl.getAttribute("description"),
          subject: eventInfo.draggedEl.getAttribute("subject"),
          start: eventInfo.date,
          allDay : true
        };
        let calendarApi = calendarComponentRef.current.getApi()
        calendarApi.addEvent({
            newEvent
        })
        
        const start = calendarApi.getEventById(newEvent.id).start
        newEvent.start = start.toISOString()

        currentEvents.push(newEvent)

        var copy = waitingEvents
        
        copy[newEvent.subject].map((ele, index) =>{
            
            if(ele.id == newEvent.id){
                copy[newEvent.subject].splice(index, 1)
            }
        })
        setWaitingEvents(copy)

        databaseManager.setCalendarEvents(currentUser, currentEvents)
        databaseManager.setWaitingEvents(currentUser, waitingEvents)

        handleSubjectsSelected()
      }

      const handleChangeDate = (info) => {
        
        const changeId = info.event._def.publicId
        var copy = currentEvents  
        copy.map(elem => {
            if(elem.id == changeId){
                elem.start = info.event.start.toISOString()
            }
        })
        setCurrentEvents(copy)
        databaseManager.setCalendarEvents(currentUser, currentEvents)
        
      }

        return(

            <MainController {...headerProps}>
    
            <div className="row">
                    <div className="col-9">
                            <Calendar 
                            ref={calendarComponentRef}
                            rerenderDelay={10}            
                            plugins={[DayGridPlugin, timeGridPlugin, InteractionPlugin]}
                            eventDurationEditable={false}
                            editable={true}
                            droppable={true}
                            events={currentEvents}
                            eventClick={eventClick} 
                            eventReceive={handleEventReceive}
                            eventDrop={handleChangeDate}
                            locale = 'pt-br'
                            />
                        
                        <PopupEvent info = {clickInfo} onHide={handleClose} show={clickInfo.open} onDelete={onDelete} />
                        

                    </div>

                    <div className="col-3">
                        <div className='d-flex justify-content-center'><strong>Tarefas não agendadas</strong></div>
                        
                       <div className="d-flex align-content-stretch flex-wrap mt-3">
                        {subjectsCheckbox.map((subject)=>(
                                    
                                    <div className="ml-3">
                                    <input label={subject.name} type='checkbox' id={subject.name} onChange={handleCheckBox} />
                                    <label for={subject.name}>{subject.name}</label>
                                    </div>
                                ))}
                       </div>
      

                        
                        <div id = 'waiting-items' className='d-flex flex-column justify-content-center align-items-center' >
                            {waitingList.map((event) => (
                            <div className="external-events" >
                                <ExternalEvent key={event.id} event={event} />
                            </div>
                            ))}
                        </div>
                    </div>
    
            </div>
        </MainController>
    
        )

}
            