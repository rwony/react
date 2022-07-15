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

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const title = e.target.title.value;
            const body = e.target.body.value;

            props.onCreate(title, body);
          }}
        >
          <div>
            <input
              type={"text"}
              name={"title"}
              placeholder={"제목을 입력해주세요"}
            />
          </div>
          <div>
            <textarea
              name={"body"}
              placeholder={"내용을 입력해주세요"}
            ></textarea>
          </div>
          <div>
            <input type={"submit"} value={"Create"} />
          </div>
        </form>
      </div>
    </article>
  );
}

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);

  return (
    <article>
      <h2>Update</h2>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const title = e.target.title.value;
            const body = e.target.body.value;
            props.onUpdate(title, body);
          }}
        >
          <div>
            <input
              type={"text"}
              name={"title"}
              placeholder={"제목을 입력해주세요"}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div>
            <textarea
              name={"body"}
              placeholder={"내용을 입력해주세요"}
              value={body}
              onChange={(e) => {
                setBody(e.target.body);
              }}
            />
          </div>
          <div>
            <input type={"submit"} value={"Update"} />
          </div>
        </form>
      </div>
    </article>
  );
}

function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(1);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "javascript is ..." },
  ]);

  let content = null;
  let contextControl = null;

  if (mode === "WELCOME") {
    content = <Article title={"Welcome"} body={"Hello, WEB!"} />;
  } else if (mode === "READ") {
    const result = topics.filter((it) => it.id === parseInt(id))[0];
    content = <Article title={result.title} body={result.body} />;
    contextControl = (
      <>
        <li>
          <a
            href={`/update/${id}`}
            onClick={(e) => {
              e.preventDefault();
              setMode("UPDATE");
            }}
          >
            Update
          </a>
        </li>
        <li>
          <button
            onClick={(e) => {
              if (window.confirm("삭제하시겠습니까?")) {
                const newTopics = [];
                topics.map((e) => {
                  if (e.id !== parseInt(id)) {
                    newTopics.push(e);
                  }
                });

                setTopics(newTopics);
                setMode("WELCOME");
              }
            }}
          >
            Delete
          </button>
        </li>
      </>
    );
  } else if (mode === "CREATE") {
    content = (
      <Create
        onCreate={(_title, _body) => {
          const newTopic = { id: nextId, title: _title, body: _body };
          const newTopics = [...topics];
          newTopics.push(newTopic);
          setTopics(newTopics);
          setId(nextId);
          setNextId(nextId + 1);
          setMode("READ");
        }}
      />
    );
  } else if (mode === "UPDATE") {
    const result = topics.filter((it) => it.id === parseInt(id))[0];
    content = (
      <Update
        title={result.title}
        body={result.body}
        onUpdate={(_title, _body) => {
          const updatedTopic = { id: parseInt(id), title: _title, body: _body };
          const newTopic = [...topics];

          newTopic.map((e, i) => {
            if (e.id === result.id) {
              newTopic[i] = updatedTopic;
            }
          });

          setTopics(newTopic);
          setMode("READ");
        }}
      />
    );
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
      <div>
        <ul>
          <li>
            <a
              href={"/create"}
              onClick={(e) => {
                e.preventDefault();
                setMode("CREATE");
              }}
            >
              Create
            </a>
          </li>
          {contextControl}
        </ul>
      </div>
    </div>
  );
}

export default App;
