import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

function App() {
  const [data, setData] = useState([]); // 일기 데이터 초기값
  const dataId = useRef(0); // 아이디 고유 값

  // API를 이용하여 dummyData 가져오기 : async를 사용하여 promise를 반환하는 비동기 함수로 사용
  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  // 새로운 일기를 추가하는 함수
  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };

    dataId.current++; // id 값 증가

    // 함수형 업데이트 : setState 같은 상태 함수에 함수를 전달하는 것을 라고 한다.
    // 이렇게 함수형 업데이트를 사용하면, useCallback 함수의 2번째 인자인 Dependency array를 비워도
    // 최신 state를 인자로 참고할 수 있게 되면서 depth(2번째 인자인 Dependency array)를 비울 수 있게 된다.
    setData((data) => [newItem, ...data]);
  }, []);

  // 일기를 삭제하는 함수
  const onRemove = useCallback((targetId) => {
    setData((data) => data.filter((it) => it.id !== targetId));
  }, []);

  // 일기 수정 완료 함수
  const onEdit = useCallback((targetId, newContent) => {
    setData((data) =>
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  }, []);

  // 감정 점수에 따른 데이터 카운트 함수
  // useMemo를 사용하면 함수를 받아서 값을 넘기기 때문에, 아래에서 함수 호출이 아닌 값을 넣는다.
  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;

    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis; // getDiaryAnalysis() X

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 : {goodCount}</div>
      <div>기분 나쁜 일기 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList diaryList={data} onEdit={onEdit} onRemove={onRemove} />
    </div>
  );
}

export default App;
