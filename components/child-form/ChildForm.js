import { useForm } from "react-hook-form";
import axios from "axios";

function ChildForm(props) {
  const { petId } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit(data) {
    const response = await axios.post(`/api/pet-child/${petId}`, data);
    console.log(response.data);
    reset();
  }

  return (
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

      <button type="submit">Create Child</button>
    </form>
  );
}

export default ChildForm;
