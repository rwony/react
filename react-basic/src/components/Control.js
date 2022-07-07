import { Component } from "react";

class Control extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <a
              href="/create"
              onClick={(e) => {
                e.preventDefault();
                this.props.onChangeMode("create");
              }}
            >
              CREATE
            </a>
          </li>
          <li>
            <a
              href="/update"
              onClick={(e) => {
                e.preventDefault();
                this.props.onChangeMode("update");
              }}
            >
              UPDATE
            </a>
          </li>
          <li>
            <input
              type="button"
              value={"delete"}
              onClick={(e) => {
                e.preventDefault();
                this.props.onChangeMode("delete");
              }}
            />
          </li>
        </ul>
      </div>
    );
  }
}

export default Control;
