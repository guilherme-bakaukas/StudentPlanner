import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LoginController() {
	const { login } = useAuth();

	const onLogin = async (loginData) => {
		return login(loginData.email, loginData.password)
			.then(() => {
				return Promise.resolve("/home");
			})
			.catch((error) => {
				if (
					error.code == "auth/wrong-password" ||
					error.code == "auth/user-not-found"
				) {
					return Promise.reject({ message: "Email e/ou senha inválidos" });
				}

				return Promise.reject({
					message: "Não foi possível inciar a sessão, código:" + error.code,
				});
			});
	};

	return <Login onLogin={onLogin} />;
}

function Login({ onLogin }) {
	const emailRef = useRef();
	const passwordRef = useRef();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();

		setError("");

		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		setLoading(true);

		onLogin({ email, password })
			.then((destination) => {
				window.location.href = destination;
			})
			.catch((err) => {
				setError(err.message);
			})
			.finally(() => {
				setLoading(false);
			});
	}

	return (
		<Container
			className="d-flex align-items-center justify-content-center"
			style={{ minHeight: "100vh" }}
		>
			<div className="w-100" style={{ maxWidth: "400px" }}>
				<Card>
					<Card.Body>
						<h2 className="text-center mb-4">Student Planner</h2>
						{error && <Alert variant="danger">{error}</Alert>}
						<Form onSubmit={handleSubmit}>
							<Form.Group id="email">
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="email"
									autoComplete="email"
									ref={emailRef}
									required
								/>
							</Form.Group>
							<Form.Group id="password">
								<Form.Label>Senha</Form.Label>
								<Form.Control
									type="password"
									autoComplete="new-password"
									ref={passwordRef}
									required
								/>
							</Form.Group>
							<Button disabled={loading} className="w-100" type="submit">
								Entrar
							</Button>
						</Form>
					</Card.Body>
				</Card>
				<div className="w-100 text-center mt-2">
					Não possui uma conta?<Link to="/signup">Cadastrar</Link>
				</div>
			</div>
		</Container>
	);
}
