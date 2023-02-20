import axios from "axios";
import React from 'react'
import { Container, Form, Button } from "react-bootstrap";
import { useState } from 'react';

export default function Register() {

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false);

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        // set configurations
        const configuration = {
            method: "post",
            url: "http://localhost:3000/register",
            data: {
                fname,
                lname,
                email,
                password,
            },
        };

        axios(configuration)
            .then((result) => {
                setRegister(true);

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
                <h2 className="text-center">Register</h2>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    {/* first name */}
                    <Form.Group controlId="formRegisterFname">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            type="text"
                            name="fname"
                            value={fname}
                            placeholder="Enter first name"
                            onChange={(e) => setFname(e.target.value)} />
                    </Form.Group>

                    {/* last name */}
                    <Form.Group controlId="formRegisterLname" className="mt-2">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            type="text"
                            name="lname"
                            value={lname}
                            placeholder="Enter last name"
                            onChange={(e) => setLname(e.target.value)} />
                    </Form.Group>

                    {/* email */}
                    <Form.Group controlId="formRegisterEmail" className="mt-2">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    {/* password */}
                    <Form.Group controlId="formRegisterPassword" className="mt-2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    {/* submit button */}
                    <div className="d-grid gap-2 mt-2">
                        <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
                            Submit
                        </Button>
                    </div>

                    <div className="text-center mt-2">
                        <p>Arleady registered? <a href="login">Login</a></p>
                    </div>

                    {/* display success message */}
                    {register ? (
                        <p className="text-success">You Are Registered Successfully</p>
                    ) : ''
                    }
                </Form>
            </Container>
        </>
    )
}