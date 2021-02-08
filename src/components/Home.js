import React from "react";
import { auth } from "./firebase/firebase";
import { NavLink } from "react-router-dom";
import { Button } from "antd";

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Меню</h1>

        <NavLink
          to="/list"
          style={{ width: "100%", "text-decoration": "none" }}
        >
          <Button block size="large" type="primary">
            {" "}
            Список студентов
          </Button>
        </NavLink>

        <NavLink
          to="/Calendar"
          style={{ width: "100%", "text-decoration": "none" }}
        >
          <Button block size="large" type="primary">
            Календарь
          </Button>
        </NavLink>

        <Button type="danger" block size="large" onClick={() => auth.signOut()}>
          Выйти
        </Button>
      </div>
    );
  }
}

export default Home;
