import { Button, Card, Container } from 'react-bootstrap';
import './ListItem.css'

import React from 'react'

export default function ListItemController({ deleteItem, name, description, weight }) {

    const handleDelete = () => {
        deleteItem()
    }

    return <ListItem onDelete={handleDelete} name={name} description={description} weight={weight}/>
}

function ListItem({ onDelete, name, description, weight }) {

    function handleClick(e) {
        e.preventDefault()
        onDelete()
    }

    return (
        <Container className="item">
            <Card>
                <Container className="d-flex">
                    <Card.Text className="font-weight-bold">{name}</Card.Text>
                    <Button className="delButton ml-auto btn btn-danger" onClick={handleClick}>Excluir</Button>
                </Container>
                <Card.Text className="ml-3 mb-3">{description}</Card.Text>
                <Card.Text className="ml-3 mb-3">Peso: {weight}</Card.Text>
            </Card>
        </Container>
    )
}
