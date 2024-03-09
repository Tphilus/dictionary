import noDataImg from "../assets/urban-no-data-found.png";

export default function NoData() {
  return (
    <div className=" m-auto">
      <img src={noDataImg} alt="img" />
    </div>
  );
}
