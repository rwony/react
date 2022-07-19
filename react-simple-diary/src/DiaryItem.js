import { useState } from "react";

const DiaryItem = ({
  onRemove,
  id,
  author,
  content,
  emotion,
  created_date,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정 점수 : {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea />
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      <button onClick={toggleIsEdit}>수정</button>
      <button onClick={handleRemove}>삭제</button>
    </div>
  );
};

export default DiaryItem;
