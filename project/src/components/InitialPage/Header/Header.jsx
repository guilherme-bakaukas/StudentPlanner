import './Header.css'
import { OverlayTrigger, Popover, Button  } from 'react-bootstrap'
import React from 'react'

export default function Header(props) {
    return (
        <header className="d-flex">
                <div className="header mr-auto p-3">
                    <h1 className="mt-3">
                        <i className= {`fa fa-${props.icon}`}></i>
                         {` ${props.title}`}
                    </h1>
                    <p className="lead text-muted">{props.subtitle}</p>
                    {props.helpWeight == true &&     
                    <OverlayTrigger
                        trigger="click"
                        key="right"
                        placement="right"
                        overlay={
                            <Popover id={`popover-positioned-right`}>
                            <Popover.Title as="h3">Informações sobre os pesos</Popover.Title>
                            <Popover.Content>
                                <p>O sistema de pesos do nosso sistema funciona da seguinte maneira:</p>
                                <p>Os pesos totais correspondem aos valores adicionados a sua nota final caso você tenha atingido nota máxima em todas as tarefas, sejam elas atividades, trabalhos ou provas.</p>
                                <p>Já os pesos de cada tarefa são relativos.</p>
                                <strong>Por exemplo: </strong>
                                <p>Vamos supor que você tenha apenas 2 provas de mesmo peso, e o total de provas possui peso 4 na nota final.</p>
                                <p>No sistema, você deve colocar 2 provas com peso 5 e o peso total das provas com valor 4</p>
                                <p>Assim, caso você tire nota 5 em uma e nota 10 em outra, você terá uma nota 7,5 em provas e, como elas tem peso total equivalente a 4, sua nota final seria 3</p>
                            </Popover.Content>
                            </Popover>
                        }
                        >
                        <Button variant="secondary">Informações sobre os pesos</Button>
                    </OverlayTrigger>}
                </div>
                <aside className='user-area ml-auto p-5'>
                    <i className = {`fa fa-user`}></i>
                </aside>
        </header>
    )
}