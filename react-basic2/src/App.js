import "./App.css";
import { useState } from "react";

function Header(props) {
  return (
    <header>
      <h1>
        <a
          href={"/"}
          onClick={(e) => {
            e.preventDefault();
            props.onChangeMode();
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
}

function Nav(props) {
  let liArray = [];
  props.topics.map((e) => {
    liArray.push(
      <li key={e.id}>
        <a
          id={e.id}
          href={`/read/${e.id}`}
          onClick={(e) => {
            e.preventDefault();
            props.onChangeMode(e.target.id);
          }}
        >
          {e.title}
        </a>
      </li>
    );
  });

  return (
    <nav>
      <ol>{liArray}</ol>
    </nav>
  );
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      <span>{props.body}</span>
    </article>
  );
}

function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(1);
  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "javascript is ..." },
  ];
  let content = null;

  if (mode === "WELCOME") {
    content = <Article title={"Welcome"} body={"Hello, WEB!"} />;
  } else if (mode === "READ") {
    const result = topics.filter((it) => it.id === parseInt(id))[0];
    content = <Article title={result.title} body={result.body} />;
  }

  return (
    <div>
      <Header
        title={"WEB"}
        onChangeMode={() => {
          setMode("WELCOME");
        }}
      />
      <Nav
        topics={topics}
        onChangeMode={(_id) => {
          setMode("READ");
          setId(_id);
        }}
      />
      {content}
    </div>
  );
}

export default App;
