import React, {useState} from 'react'
import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import DatabaseManager from '../../services/userServices'
import MainController from '../InitialPage/Main/Main'
import { Button, Card, Container  } from 'react-bootstrap'


export default function SubjectsController({data, onSelect}){

    function selectItem(index){
        onSelect(index)
    }

    return (<SubjectsPage data={data} onSelectItem={selectItem}/>)
}

function SubjectsPage({data, onSelectItem}){

    function handleClick(e){
        
        e.preventDefault()
        console.log(e.target.id)
        onSelectItem(e.target.id)
    }


    return(

        <div className="">
        <h1>Disciplinas cadastradas</h1>

        <div className="d-flex flex-column">
            {data!=undefined && data.map((element, index) =>(
                <div className="justify-content-start">
                    <Container className="mt-3 item">
                        
                            <Container className="d-flex">
                                <Card.Text className="font-weight-bold ml-3 mt-3">{element.name}</Card.Text>
                                <Container className="d-flex justify-content-end">
                                    <Button className="delButton  btn btn-primary" id={index} onClick={handleClick}>Ver</Button>
                                </Container>

                            </Container>
                       
                    </Container>
                </div>
            ))}
        </div>

    </div>

    )
}

