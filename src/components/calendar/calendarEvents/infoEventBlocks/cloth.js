import React from "react";

class Cloth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cloth: props.cloth || "",
    };
  }

  render() {
    let cloth;
    if (this.state.cloth === "Парадная") {
      cloth = <span style={{ color: "red" }}>{this.state.cloth}</span>;
    }
    return (
      <>
        {cloth}
      </>
    );
  }
}

export default Cloth;
