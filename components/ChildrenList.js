import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

function ChildrenList(props) {
  const { petId } = props;
  const { data, error } = useSWR(`/api/pet-child/${petId}`, fetcher);

  if (error) {
    return <div>No Data</div>;
  }

  if (!data) {
    <div>Data Loading</div>;
  }

  return (
    <div>
      {data?.pet_children.map((child) => {
        return (
          <div key={child.id}>
            <h3>Name: {child.name}</h3>
            <p>Specie: {child.species}</p>
            <p>Age: {child.age}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ChildrenList;
