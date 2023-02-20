import React, { useEffect, useState, } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("TOKEN");
const userinfo = cookies.get("USER");

export default function HomeComponent() {
    // const [message, setMessage] = useState("");
    const [todos, setTodos] = useState([])
    const [formData, setFormData] = useState()

    const handleForm = e => {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value,
        })
    }

    // logout
    const logout = () => {
        // destroy the cookie
        cookies.remove("TOKEN", { path: "/" });
        cookies.remove("USER", { path: "/" });
        // redirect user to the landing page
        window.location.href = "/";
    }

    // useEffect automatically executes once the page is fully loaded
    useEffect(() => {
        // set configurations for the API call here
        const configuration = {
            method: "get",
            url: `http://localhost:3000/my-todos/${userinfo.id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        // make the API call
        axios(configuration)
            .then((result) => {
                setTodos(result.data.todos)
                // console.log(result.data.todos)
            })
            .catch((error) => {
                error = new Error();
            });
    }, []);

    const todoList = todos.map((todo, index) => {
        const checkTodo = todo.status ? `line-through` : ""
        return (
            <div className="Card" key={index}>
                <div className="Card--text">
                    <h1 className={checkTodo}>{todo.name}</h1>
                    <span className={checkTodo}>{todo.description}</span>
                </div>
                <div className="Card--button">
                    <button
                        onClick={() => updateTodo(todo)}
                        className={todo.status ? `hide-button` : "Card--button__done"}
                    >
                        Complete
                    </button>
                    <button
                        onClick={() => deleteTodo(todo._id)}
                        className="Card--button__delete"
                    >
                        Delete
                    </button>
                </div>
            </div>
        )
    })

    const addTodo = (
        <form className='Form' onSubmit={(e) => saveTodo(e, formData)}>
            <div>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input onChange={handleForm} type='text' id='name' />
                </div>
                <div>
                    <label htmlFor='description'>Description</label>
                    <input onChange={handleForm} type='text' id='description' />
                </div>
            </div>
            <button disabled={formData === undefined ? true : false} >Add Todo</button>
        </form>)

    const updateTodo = (todo) => {
        todo.status = true

        const configuration = {
            method: "put",
            url: `http://localhost:3000/edit-todo/${todo._id}`,
            todo,
            data: {
                todo: todo,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        axios(configuration)
            .then((result) => {
                setTodos(result.data.todos)
            })
            .catch((error) => {
                error = new Error();
            });
    }

    const deleteTodo = (id) => {
        const configuration = {
            method: "post",
            url: `http://localhost:3000/delete-todo/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        axios(configuration)
            .then((result) => {
                setTodos(result.data.todos)
            })
            .catch((error) => {
                error = new Error();
            });
    }

    const saveTodo = (e, formData) => {
        e.preventDefault()

        const configuration = {
            method: "post",
            url: "http://localhost:3000/add-todo",
            data: {
                name: formData.name,
                description: formData.description,
                status: false,
                author: userinfo.id,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        axios(configuration)
            .then((result) => {
                setTodos(result.data.todos)
            })
            .catch((error) => {
                error = new Error();
            });
    }

    return (
        <div className="text-center">
            <h3 className="text-center">My Todo</h3>
            <p>{userinfo.last_name} ({userinfo.email})</p>
            <Button
                type="submit"
                variant="danger"
                onClick={() => logout()}
            >
                Logout
            </Button>

            {addTodo}
            {todos.length > 0 ? todoList : <p>There are no Todo list</p>}

        </div >
    );
}