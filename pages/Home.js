import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";
import DiaryList from "./../components/DiaryList";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  // 다이어리 게시글을 월에 따라 관리하기 위한 state 선언
  const [data, setData] = useState([diaryList]);

  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  // diaryList가 변화하는 순간과 (수정 및 삭제)
  // curDate가 변화하는 순간에만 diaryList에서 년도와 월에 해당하는 일기만 가져오기
  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0
      ).getTime();

      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [diaryList, curDate]);

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={
          <MyButton
            text={"<"}
            onClick={() => {
              decreaseMonth();
            }}
          />
        }
        rightChild={
          <MyButton
            text={">"}
            onClick={() => {
              increaseMonth();
            }}
          />
        }
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
