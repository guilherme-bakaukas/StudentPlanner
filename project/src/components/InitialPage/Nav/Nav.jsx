import "./Nav.css";
import React from "react";
import { Link } from "react-router-dom";


export default function Nav() {
	return (
		<aside className="menu-area">
			<nav className="menu">
				<Link to="/">
					<i className="fa fa-home"></i> Início
				</Link>
				<Link to="/subject-form">
					<i className="fa fa-plus"></i> Adicionar matérias
				</Link>
				<Link to="/schedule">
					<i className="fa fa-calendar"></i> Agenda
				</Link>
				<Link to="/task-manager">
					<i className="fa fa-edit"></i> Editar matérias
				</Link>
				<Link to="/grades">
					<i className="fa fa-graduation-cap"></i> Notas
				</Link>

			</nav>
		</aside>
	);
}
