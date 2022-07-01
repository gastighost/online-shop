import Link from "next/link";
import { useState } from "react";
import ChildUpdateForm from "../../../components/child-form/ChildUpdateForm";
import ChildDetails from "../../../components/ChildDetails";

import dbConnect from "../../../lib/dbConnect";
import PetChild from "../../../models/PetChild";

function PetChildPage(props) {
  const { id, petChild, petChildId } = props;
  const [isEditing, setIsEditing] = useState(false);

  function editModeOn() {
    setIsEditing(true);
  }

  function editModeOff() {
    setIsEditing(false);
  }

  return (
    <div>
      {!isEditing && <ChildDetails petChild={petChild} />}
      {isEditing && (
        <ChildUpdateForm
          petId={id}
          petChildId={petChildId}
          petChild={petChild}
          editModeOff={editModeOff}
        />
      )}
      {!isEditing && <button onClick={editModeOn}>Edit</button>}
      <Link href={`/${id}`}>Back</Link>
    </div>
  );
}

export default PetChildPage;

export async function getServerSideProps(context) {
  const { id, petChildId } = context.params;

  await dbConnect();
  const petChild = await PetChild.findById(petChildId).lean();

  petChild._id = petChild._id.toString();
  petChild.parent = petChild.parent.toString();

  return {
    props: {
      petChild,
      id,
      petChildId,
    }, // will be passed to the page component as props
  };
}
