import Image from "next/image";

function ChildDetails(props) {
  const { petChild } = props;

  return (
    <div>
      <h1>{petChild.name}</h1>
      <Image
        alt={petChild.name}
        src={petChild.image_url}
        height={200}
        width={200}
      />
      <p>Specie: {petChild.species}</p>
      <p>Age: {petChild.age}</p>
      <p>Poddy Trained: {petChild.poddy_trained ? "Yes" : "No"}</p>
      <p>Likes: {petChild.likes[0]}</p>
    </div>
  );
}

export default ChildDetails;
