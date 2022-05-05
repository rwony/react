import { useState } from "react";

const DiaryEditor = () => {
  const [author, setAuthor] = useState("");

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input value={author} />
      </div>
    </div>
  );
};

export default DiaryEditor;
