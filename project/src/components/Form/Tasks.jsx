import React, { useState } from 'react'
import { Form , Button, Card, Alert, Container, FormGroup } from "react-bootstrap";
import ListItemController from './FormItems/ListItem'
import AddItemController from './FormItems/AddItem'
import './Form.css'
import { useEffect } from 'react';

export default function TasksController( { data, onUpdate, onClear}) {

    const name = data.info.name
    var taskName = ''
    if (data.info.name == "Atividades"){taskName = "atividade"}
    if (data.info.name == "Trabalhos"){taskName = "trabalho"}
    if (data.info.name == "Provas"){taskName = "prova"}
    
    const [list, setList] = useState(data.list)
    const [number, setNumber] = useState(0)
    const [totalWeight, setTotalWeight] = useState(data.info.total_weight)
    const [sameWeight, setSameWeight] = useState(false)

    useEffect(()=>{
        setNumber(0)
        setList([])
        setSameWeight(false)
        setTotalWeight(0)
    },[onClear])

    function update( {listValue, totalWeightValue}) {
        var newProps = {}
        newProps["list"] = listValue
        newProps["info"] = {}
        newProps["info"]["name"] = name
        newProps["info"]["total_weight"] = totalWeightValue
        onUpdate(newProps)
    }

    const deleteItem = (index) => {
        var listCopy = [].concat(list)

        listCopy.splice(index,1)
        setList(listCopy)

        update({listValue:listCopy, totalWeightValue: totalWeight})
    }

    const addItem = async (element) => {
        var listCopy = [].concat(list)
        listCopy.push(element)
        setList(listCopy)
        update({listValue: listCopy, totalWeightValue: totalWeight})
        return Promise.resolve()
    }

    const check = () => {
        var listCopy = [].concat(list)
        const weight = number === 0 ? 0 : (10/number).toFixed(2)
        
        for (var i = 0; i<listCopy.lenght;i++){
            listCopy.pop()
        }

        for (var i = 0; i<number; i++){
            const element = { weight: weight, name: `${taskName} ${i+1}`, grade: 0}
            listCopy[i] = element
        }

        setList(listCopy)
        setSameWeight(true)

        update({listValue: listCopy, totalWeightValue: totalWeight})
    }

    const uncheck = () => {

       var listCopy = []
       setSameWeight(false)
       setList(listCopy)
        update({listValue:listCopy, totalWeightValue: totalWeight})
    }

    const onControlChanged = (e) => {

        var value = e.target.value

            
        value = value < 0 ? 0: value

        if (e.target.name === "total_weight" ){
            value = value > 10 ? 10 : value
            setTotalWeight(value)
            update( { listValue: list, totalWeightValue: value })

        } else {

            if(value%1 !== 0){
                alert("Por favor coloque um número inteiro")
                value = 0
            }

            setNumber(value)
        }       
    }

    const viewData = { name, list, number, totalWeight, sameWeight, taskName}

    const param = {deleteItem, addItem, check, uncheck, onControlChanged, viewData}

    return <Tasks param = {param} />
}

function Tasks({ param }) {
  
    function onDelete(id) {
        param.deleteItem(id)
    }

    function notChecked() {
        param.uncheck()
    }

    function isChecked() {
        param.check()
    }

    function handleCheckBox(e) {
        if (e.target.checked === true){
            isChecked()
        }
        else{
            notChecked()
        }
    }

    function handleChange(e) {
        param.onControlChanged(e)
    }

    return(
        <Container className="box w-100 p-3">
              <Form className="form-group">
                <Form.Label size="lg"> <h2>{param.viewData.name}</h2> </Form.Label>
                <FormGroup>
                    <Form.Label>Peso do total [0-10]</Form.Label>
                    <Form.Control data-testid="total_weight_label" type="number" name="total_weight" className="form-control" value={param.viewData.totalWeight} onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Form.Label className="mt-3">{`Adicione o numero de ${param.viewData.taskName}s`}</Form.Label>
                    <Form.Control type="number" name="number" className="form-control" value={param.viewData.number} onChange={handleChange}/>
                    { param.viewData.number < 1 ? <div></div> : 
                        <FormGroup className="form-check" className="mb-3">
                            <Form.Check 
                                class="form-check-input" 
                                type="checkbox" 
                                value="" 
                                name="same_weight"
                                label={ param.viewData.name + " possuem o mesmo peso"}
                                checked={param.viewData.sameWeight} 
                                onChange={handleCheckBox}> 
                            </Form.Check>
                        </FormGroup>
                    }
                </FormGroup>
                <div className="list">
                    { param.viewData.sameWeight || param.viewData.number < 1 ? <div></div>:<AddItemController onSubmit={param.addItem} name={param.viewData.taskName}/> }
                    { 
                      param.viewData.list.map((elem, index) =>  index < param.viewData.number ? <ListItemController name={elem.name} description={elem.description} weight={elem.weight} deleteItem={()=> onDelete(index)}/> : <div></div> )
                    }
                </div>
            </Form>  
        </Container>
    )
}