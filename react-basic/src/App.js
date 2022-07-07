import React, { Component } from "react";
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import Subject from "./components/Subject";

import "./App.css";
import Control from "./components/Control";
import CreateContent from "./components/CreateContent";

class App extends Component {
  constructor(props) {
    // 컴포넌트가 실행 될 때 render() 함수보다 먼저 실행 되면서,
    // 그 컴포넌트를 초기화 싶은 코드는 이(constructor) 안에 작성한다.
    super(props);

    // state 값 초기화
    this.state = {
      mode: "create",
      selected_content_id: 2,
      subject: { title: "WEB", sub: "World Wide Web!" },
      welcome: { title: "Welcome", desc: "Hello, React!" },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is Hyper Text Markup Language." },
        { id: 2, title: "CSS", desc: "CSS is for design." },
        { id: 3, title: "JavaScript", desc: "JavaScript is for interactive." },
      ],
    };
  }

  render() {
    let _title,
      _desc,
      _article = null;

    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc} />;
    } else if (this.state.mode === "read") {
      let i = 0;
      while (i < this.state.contents.length) {
        let data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i++;
        _article = <ReadContent title={_title} desc={_desc} />;
      }
    } else if (this.state.mode === "create") {
      _article = <CreateContent />;
    }

    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={(e) => {
            this.setState({ mode: "welcome", selected_content_id: 0 });
          }}
        />
        <TOC
          data={this.state.contents}
          onChangePage={(id) => {
            this.setState({ mode: "read", selected_content_id: parseInt(id) });
          }}
        />
        <Control
          onChangeMode={(_mode) => {
            this.setState({
              mode: _mode,
            });
          }}
        />
        {_article}
      </div>
    );
  }
}

export default App;
