import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Jumbotron, Row} from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';

const clientKey = "sbClientKey"

export default function Release() {

    const [clientName, setClientName]= useState("")
    // const {firestore} = useFirestore()


    useEffect(() => {
        const clientName = localStorage.getItem(clientKey)
        if(!clientName){
            const newName = uuidv4()
            localStorage.setItem(clientKey,newName)
            setClientName(newName)
        } else {
            setClientName(clientName)
        }
    },[])

    useEffect(() => {
        if(clientName) {
            // firestore.collection("clients").doc(clientName).set({}).then(console.log).catch(console.error)
        }
    },[clientName])

    return (
        <Container>
            <Row>
                <Col>
                    <Jumbotron className="text-center">
                        <p>id - {clientName}</p>
                        <Button size="lg" variant="primary">Connect</Button>
                    </Jumbotron>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body className="text-center">
                            <Button  size="lg" variant="primary">Pull</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

    );
}

