import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const New = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(getStringDate(new Date()));

  return (
    <div>
      <MyHeader
        headText={"새 일기 작성"}
        leftChild={<MyButton text={" < "} onClick={() => navigate(-1)} />}
      />

      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input-box">
            <input
              type="date"
              className="input-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default New;
