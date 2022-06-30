import mongoose from "mongoose";

/* PetSchema will correspond to a collection in your MongoDB database. */
const PetChildSchema = new mongoose.Schema({
  name: {
    /* The name of this pet */

    type: String,
    required: [true, "Please provide a name for this pet."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  parent: {
    /* The parent of this pet */
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Pet",
  },
  species: {
    /* The species of your pet */
    type: String,
    required: [true, "Please specify the species of your pet."],
    maxlength: [40, "Species specified cannot be more than 40 characters"],
  },
  age: {
    /* Pet's age, if applicable */

    type: Number,
  },
  poddy_trained: {
    /* Boolean poddy_trained value, if applicable */

    type: Boolean,
  },
  diet: {
    /* List of dietary needs, if applicable */

    type: Array,
  },
  image_url: {
    /* Url to pet image */

    required: [true, "Please provide an image url for this pet."],
    type: String,
  },
  likes: {
    /* List of things your pet likes to do */

    type: Array,
  },
  dislikes: {
    /* List of things your pet does not like to do */

    type: Array,
  },
});

export default mongoose.models.PetChild ||
  mongoose.model("PetChild", PetChildSchema);
