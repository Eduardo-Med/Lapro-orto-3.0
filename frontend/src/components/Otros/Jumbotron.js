import React, { Component } from "react";
export default class Jumbotron extends Component {
  constructor(props) {
    super();
    this.state = {
      palabra: []
    };
  }

  componentDidMount() {
    var output = this.props.nombre.split("");
    this.setState({palabra: output},() => {this.animacionLetras();});
  }

  animacionLetras = () => {
    let spans = document.querySelectorAll(".word span");
    spans.forEach((span, idx) => {
      span.addEventListener("click", e => {
        e.target.classList.add("active");
      });
      span.addEventListener("animationend", e => {
        e.target.classList.remove("active");
      });

      // Initial animation
      setTimeout(() => {
        span.classList.add("active");
      }, 750 * (idx + 1));
    });
  };

  render() {
    return (
      <div className="row" style={{height: '100vh'}}>
        <div className="jumbotron card card-image imagen-jumbotron">
          <div className="text-white text-center py-5 px-4">
            <div>
              <h2 className="card-title h1-responsive pt-3 mb-5 font-bold texto">
                Bienvenido a Lapro-Orto
              </h2>
              <div className="word">
                {this.state.palabra.map((palabra, index) => (
                  <span key={index}>{palabra}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
    );
  }
}
