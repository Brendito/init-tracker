import React, { Component } from "react";
import RouteManager from "../../utils/RouteManager";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEdit,
  faTimes,
  faCopy,
  faPlusSquare,
  faPlus,
  faMinus,
  faSearch,
  faThumbtack,
  faDiceD20,
  faShieldAlt,
  faHeartbeat,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import NavigationBar from "../NavigationBar";
require("typeface-noto-sans");
require("typeface-libre-baskerville");

library.add(
  faCheckCircle,
  faEdit,
  faTimes,
  faCopy,
  faPlusSquare,
  faPlus,
  faMinus,
  faSearch,
  faThumbtack,
  faDiceD20,
  faShieldAlt,
  faHeartbeat
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar />
        <RouteManager />
      </div>
    );
  }
}

export default App;
