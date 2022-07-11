import React, { Component } from "react";
import TOC from "./components/TOC";
import Subject from "./components/Subject";

import "./App.css";
import Control from "./components/Control";
import CreateContent from "./components/CreateContent";
import ReadContent from "./components/ReadContent";
import UpdateContent from "./components/UpdateContent";

class App extends Component {
  constructor(props) {
    // 컴포넌트가 실행 될 때 render() 함수보다 먼저 실행 되면서,
    // 그 컴포넌트를 초기화 싶은 코드는 이(constructor) 안에 작성한다.
    super(props);

    this.max_content_id = 3;
    this.state = {
      // state 값 초기화
      mode: "welcome",
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

  getReadContent() {
    let i = 0;
    while (i < this.state.contents.length) {
      let data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
      }
      i++;
    }
  }

  getContent() {
    let _title,
      _desc,
      _article = null;

    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc} />;
    } else if (this.state.mode === "read") {
      const _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc} />;
    } else if (this.state.mode === "create") {
      _article = (
        <CreateContent
          onSubmit={(_title, _desc) => {
            ++this.max_content_id;

            const _contents = Array.from(this.state.contents);
            _contents.push({
              id: this.max_content_id,
              title: _title,
              desc: _desc,
            });

            this.setState({
              contents: _contents,
              mode: "read",
              selected_content_id: this.max_content_id,
            }); //setState 함수를 사용해서 바로 렌더링 되도록한다.
          }}
        />
      );
    } else if (this.state.mode === "update") {
      const _content = this.getReadContent();
      _article = (
        <UpdateContent
          data={_content}
          onSubmit={(_id, _title, _desc) => {
            const _contents = Array.from(this.state.contents);

            let i = 0;
            while (i < _contents.length) {
              if (_contents[i].id === _id) {
                _contents[i] = { id: _id, title: _title, desc: _desc };
                break;
              }
              i++;
            }

            this.setState({
              contents: _contents,
              mode: "read",
            });
          }}
        />
      );
    }

    return _article;
  }

  render() {
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
            if (_mode === "delete") {
              if (window.confirm("정말 삭제하시겠습니까?")) {
                const _contents = Array.from(this.state.contents);
                let i = 0;
                while (i < _contents.length) {
                  if (_contents[i].id === this.state.selected_content_id) {
                    _contents.splice(i, 1);
                    break;
                  }
                  i++;
                }

                this.setState({
                  mode: "welcome",
                  contents: _contents,
                });
              }
            } else {
              this.setState({
                mode: _mode,
              });
            }
          }}
        />
        {this.getContent()}
      </div>
    );
  }
}

export default App;
