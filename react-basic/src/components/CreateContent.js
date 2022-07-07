import { Component } from "react";

class CreateContent extends Component {
  render() {
    return (
      <article>
        <h2>Create</h2>
        <form
          action={"/create_process"}
          method={"post"}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <p>
            <input type={"text"} name={"title"} placeholder={"title"} />
          </p>
          <p>
            <textarea name={"desc"} placeholder={"description"} />
          </p>
          <input type="submit" />
        </form>
      </article>
    );
  }
}

export default CreateContent;
