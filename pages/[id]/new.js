import { useRouter } from "next/router";
import ChildForm from "../../components/child-form/ChildForm";

function NewPetChildPage(props) {
  const router = useRouter();
  const { id } = router.query;

  return <ChildForm petId={id} />;
}

export default NewPetChildPage;

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
