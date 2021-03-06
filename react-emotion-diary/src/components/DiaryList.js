import { useState } from "react";

const sortOptionList = [
  { value: "lastest", name: "최신순" },
  { value: "oldest", name: "등록순" },
];

const filterOptionList = [
  { value: "all", name: "모두" },
  { value: "good", name: "좋음" }, //1~3
  { value: "bad", name: "나쁨" }, //4~5
];

// 다이어리 정렬 컴포넌트
const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  // 정렬 기준 state
  const [sortType, setSortType] = useState("lastest");
  const [filter, setFilter] = useState("all");

  // 정렬 순서
  const getProcessedDiaryList = () => {
    const compare = (a, b) => {
      if (sortType === "lastest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(diaryList));

    // const filterdList =

    const sortedList = copyList.sort(compare);

    return sortedList;
  };

  return (
    <div>
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />
      <ControlMenu
        value={filter}
        onChange={setFilter}
        optionList={filterOptionList}
      />
      {getProcessedDiaryList().map((it) => (
        <div key={it.id}>
          {it.content} {it.emotion}
        </div>
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
