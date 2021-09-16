import React from 'react'
import { Card, Container } from 'react-bootstrap';

export default function WaitingItem(props) {
    return (
        <Container className="mt-3 rounded d-flex align-items-center">
            <Card className="bg-primary text-white">
                <Container className="d-flex justify-content-center">
                    <Card.Text className="font-weight-bold">{props.title}</Card.Text>
                </Container>
                <Card.Text className="d-flex justify-content-center">{props.description}</Card.Text>
                <Card.Text className="d-flex justify-content-center">{props.subject}</Card.Text>
            </Card>
        </Container>

    )

}