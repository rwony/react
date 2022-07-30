const DiaryItem = ({ id, emotion, content, date } ) => {
  return <div className="DiaryItem">
    <div className={["emotion_img_wrapper", `emotion_img_wrapper_${emotion}`]}>
      <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} alt="emotion_image" />
    </div>
    <div>
        
    </div>
    <div></div>
  </div>;
}

export default DiaryItem;
