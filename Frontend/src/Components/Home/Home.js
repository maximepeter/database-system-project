import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import Alerts from "../Alerts/Alerts";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    axios
      .get("http://localhost:8080/getAllFlights")
      .then((response) => {
        // handle success
        let result = response.data.map((elt, index) => {
          return (
            <tr key={index}>
              <th scope="row">{index}</th>
              <td>
                {elt.date_depart.split("T")[0] + " à " + elt.heure_depart}
              </td>
              <td>
                {elt.date_arrivee.split("T")[0] + " à " + elt.heure_arrivee}
              </td>
              <td>{elt.prix + " €"}</td>
            </tr>
          );
        });
        this.setState({
          result: result,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
        this.setState({
          result: null,
        });
      });
  }

  render() {
    let table;

    if (this.state.result === "") {
      table = this.state.result;
    } else if (this.state.result === null) {
      table = (
        <Alerts
          type="danger"
          content="Aucun résultat, vérifier votre connection"
        />
      );
    } else {
      table = (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Départ</th>
              <th scope="col">Arrivée</th>
              <th scope="col">Prix</th>
            </tr>
          </thead>
          <tbody>{this.state.result}</tbody>
        </table>
      );
    }

    return (
      <div className="main">
        <h1>Bienvenue sur la page d'accueil</h1>
        <div>Contenu page d'accueil</div>
        <div className="col">
          <img
            src="https://cdn.onlinewebfonts.com/svg/img_246830.png"
            alt="home"
            width="200px"
            style={{ margin: "20px" }}
          />
        </div>
        <div className="container">
          <div className="row justify-content-md-center" id="test">
            <div className="col">
              <button className="btn btn-primary" onClick={this.handleClick}>
                Query
              </button>
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className="col">
              <button
                className="btn btn-primary"
                onClick={() => {
                  this.props.history.push("/flightsearch");
                }}
              >
                Flight Search
              </button>
            </div>
          </div>
        </div>
        <div className="result">{table}</div>
      </div>
    );
  }
}

export default Home;
