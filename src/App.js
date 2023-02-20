import { Routes, Route } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import "./App.css";
// import Account from "./Pages/Account";
import FreeComponent from "./Pages/FreeComponent";
import HomeComponent from "./Pages/HomeComponent";
import ProtectedRoute from "./utils/ProtectedRoutes";
import Register from "./Auth/Register";
import Login from "./Auth/Login";

function App() {
  return (
    <Container>
      <Row>
        <Col className="text-center">
          {/* <h1>TODO List With React Node-JS, Express and MongoDB</h1> */}
          <section id="navigation">
            <a href="/">Login Page</a>
            <a href="/noauth">No-Auth Page</a>
            <a href="/home">My Todo List - Protected</a>
          </section>
        </Col>
      </Row>

      {/* create routes here */}
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/noauth" element={<FreeComponent />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <HomeComponent />
          </ProtectedRoute>
        } />
      </Routes>
    </Container>
  );
}

export default App;