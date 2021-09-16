import React, { useState, useRef } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import './AddItem.css';

export default function AddItemController({ onSubmit, initialName }) {

    const onSubmitWrapper = ( { nameRef, descriptionRef, weightRef }) => {

        const element = {
            name: nameRef.current.value,
            description: descriptionRef.current.value,
			weight: weightRef.current.value,
            grade: 0
		}

        
        return onSubmit(element)
    }

    const formatNumber = (number) => {
        const re = /^[0-9]*$/

        var value = number

        if (number !== '' && re.test(number)) {
            value = value < 0 ? 0 : value
            value = value > 10 ? 10 : value
        } else {
            value = 0
        }

        return Promise.resolve(value)
    }


	return <AddItem onSubmit={onSubmitWrapper} formatNumber={formatNumber} initialName={initialName} />;
}

function AddItem({ onSubmit, formatNumber, initialName }) {
    
	const nameRef = useRef('')
	const descriptionRef = useRef()
	const weightRef = useRef(0)
    const [loading, setLoading] = useState(false)

	function resetState() {
        nameRef.current.value = ''
        descriptionRef.current.value = ''
        weightRef.current.value = 0
        setLoading(false)
	}

    function add() {
		onSubmit( { nameRef, descriptionRef, weightRef } )
        .then( () => {
            resetState();
        })
	}

	function handleSubmit(e) {
        setLoading(true)
        add()
	}

    function onNumberChange(e) {
       formatNumber(e.target.value)
       .then(value => {
           e.target.value = value
       })
    }

	return (
        <Card className='add_item'>
            <Card.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control placeholder='Nome da atividade' ref={nameRef} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control placeholder='Descrição da atividade' ref={descriptionRef} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Peso [0 - 10]</Form.Label>
                        <Form.Control type= 'number' defaultValue='0' onChange={onNumberChange} ref={weightRef} required />
                    </Form.Group>
                    <Button disabled={loading} className='w-35' onClick={handleSubmit}>Adicionar</Button>
                </Form>
            </Card.Body>
        </Card>
	)
}
