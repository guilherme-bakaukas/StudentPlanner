import React from "react";
import Main from "./Main/Main";


export default function InitialPage() {
	return (
		<Main
			icon="home"
			title="Inicio"
			subtitle="Sistema de planejamento de estudos"
		>
			<div className="display-4">Bem vindo!</div>
			<hr />
			<p className="mb-0">
				Sistema desenvolvido para ajudar você a se organizar com os estudos!
			</p>
		</Main>
	)
}
