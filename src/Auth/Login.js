import axios from "axios";
import React from 'react'
import { Container, Form, Button } from "react-bootstrap";
import { useState } from 'react';
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        // set configurations
        const configuration = {
            method: "post",
            url: "http://localhost:3000/login",
            data: {
                email,
                password,
            },
        }

        // make the API call
        axios(configuration)
            .then((result) => {
                setLogin(true);

                // set the cookie
                cookies.set("TOKEN", result.data.token, {
                    path: "/",
                });

                cookies.set("USER", result.data.user, {
                    path: "/",
                });

                // redirect user to the home page
                window.location.href = "/home";
            })
            .catch((error) => {
                error = new Error();
            });
    }

    return (
        <>
            <Container className="p-3 my-5 d-flex flex-column w-50">
                <h2 className="text-center">Login</h2>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    {/* email */}
                    <Form.Group controlId="formLoginEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email"
                            name="email"
                            value={email}
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    {/* password */}
                    <Form.Group controlId="formLoginPassword" className="mt-2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </Form.Group>

                    {/* submit button */}
                    <div className="d-grid gap-2 mt-2">
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={(e) => handleSubmit(e)}
                        >
                            Submit
                        </Button>
                    </div>

                    <div className="text-center mt-2">
                        <p>Not registered? <a href="register">Register</a></p>
                    </div>

                    {login ? (
                        <p className="text-success">You Are Logged in Successfully</p>
                    ) : (
                        <p className="text-danger">You Are Not Logged in</p>
                    )}
                </Form>
            </Container>
        </>
    )
}