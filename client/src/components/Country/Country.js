export default function Country({ name, img, continent }) {
  return (
    <div>
      <div>{name}</div>
      <img src={img} className="Alfredo"/>
      <p>{continent}</p>
    </div>
  );
}



