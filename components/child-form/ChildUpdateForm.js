import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Fragment } from "react";

function ChildUpdateForm(props) {
  const { petId, petChild, petChildId, editModeOff } = props;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: petChild.name,
      species: petChild.species,
      age: petChild.age,
      poddyTrained: petChild.poddy_trained,
      diet: petChild.diet,
      imageUrl: petChild.image_url,
      likes: petChild.likes,
      dislikes: petChild.dislikes,
    },
  });

  async function onSubmit(data) {
    const response = await axios.patch(`/api/pet-child/${petChildId}`, data);
    reset();
    editModeOff();
    router.push(`/${petId}/${petChildId}`);
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input {...register("firstName", { required: true })} />
        {errors.firstName?.type === "required" && "First name is required"}

        <label>Species</label>
        <input {...register("species", { required: true })} />
        {errors.species?.type === "required" && "Species is required"}

        <label>Age</label>
        <input {...register("age", { required: true })} />
        {errors.age?.type === "required" && "Age is required"}

        <label>Poddy Trained</label>
        <input {...register("poddyTrained")} type="checkbox" value="true" />

        <label>Diet</label>
        <input {...register("diet", { required: true })} />
        {errors.diet?.type === "required" && "Diet is required"}

        <label>Image image_url</label>
        <input {...register("imageUrl", { required: true })} />
        {errors.imageUrl?.type === "required" && "Image Url is required"}

        <label>Likes</label>
        <input {...register("likes", { required: true })} />
        {errors.likes?.type === "required" && "Likes are required"}

        <label>Dislikes</label>
        <input {...register("dislikes", { required: true })} />
        {errors.dislikes?.type === "required" && "Dislikes are required"}

        <button type="submit">Edit Child</button>
      </form>
      <button onClick={editModeOff}>Cancel Edit</button>
    </Fragment>
  );
}

export default ChildUpdateForm;
