import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function SignUpController() {
	const { signUp } = useAuth();

	const onSingUp = (signUpData) => {
		if (signUpData.password !== signUpData.passwordConfirmation) {
			return Promise.reject({ message: "As senhas precisam ser iguais" });
		}

		if (signUpData.password.length < 6) {
			return Promise.reject({
				message: "A senha precisa possuir mais que 6 caracteres",
			});
		}

		return signUp(signUpData.email, signUpData.password)
			.catch((error) => {
				if (error.code === "auth/email-already-in-use") {
					return Promise.reject({
						message: "Esse email já está sendo utilizado",
					});
				}
				return Promise.reject({
					message:
						"Não foi possível realizar o cadastro, motivo: " + error.code,
				});
			})
			.then(() => {
				return Promise.resolve("/home");
			});
	};

	return <SignUp onSingUp={onSingUp} />;
}

function SignUp({ onSingUp }) {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmationRef = useRef();

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();

		setError("");
		setLoading(true);

		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		const passwordConfirmation = passwordConfirmationRef.current.value;

		onSingUp({ email, password, passwordConfirmation })
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
							<Form.Group id="password-confirmation">
								<Form.Label>Confirme a sua senha</Form.Label>
								<Form.Control
									type="password"
									autoComplete="new-password"
									ref={passwordConfirmationRef}
									required
								/>
							</Form.Group>
							<Button disabled={loading} className="w-100" type="submit">
								Cadastrar
							</Button>
						</Form>
					</Card.Body>
				</Card>
				<div className="w-100 text-center mt-2">
					<Link to="/">Já possuo uma conta </Link>
				</div>
			</div>
		</Container>
	);
}
