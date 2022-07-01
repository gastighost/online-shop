import dbConnect from "../../../lib/dbConnect.js";
import PetChild from "../../../models/PetChild";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const petChildren = await PetChild.find({ parent: id });
      res.status(200).json({
        pet_children: petChildren.map((child) =>
          child.toObject({ getters: true })
        ),
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  if (req.method === "POST") {
    const {
      firstName,
      species,
      age,
      poddyTrained,
      diet,
      imageUrl,
      likes,
      dislikes,
    } = req.body;

    const newPetChild = new PetChild({
      name: firstName,
      parent: id,
      species: species,
      age: Number(age),
      poddy_trained: poddyTrained === "true" ? true : false,
      diet: diet,
      image_url: imageUrl,
      likes: likes,
      dislikes: dislikes,
    });

    try {
      await newPetChild.save();
      console.log("Pet child successfully created via Mongoose!");
      res.status(200).json({
        message: "Pet child successfully created!",
        pet_child: newPetChild,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

  if (req.method === "PATCH") {
    const {
      firstName,
      species,
      age,
      poddyTrained,
      diet,
      imageUrl,
      likes,
      dislikes,
    } = req.body;

    try {
      const petChildForUpdate = await PetChild.findById(id);

      petChildForUpdate.name = firstName;
      petChildForUpdate.species = species;
      petChildForUpdate.age = Number(age);
      petChildForUpdate.poddy_trained = poddyTrained === "true" ? true : false;
      petChildForUpdate.diet = diet;
      petChildForUpdate.image_url = imageUrl;
      petChildForUpdate.likes = likes;
      petChildForUpdate.dislikes = dislikes;

      await petChildForUpdate.save();

      console.log("Pet child successfully updated via Mongoose!");

      res.status(200).json({
        message: "Pet child successfully updated!",
        updated_child: petChildForUpdate,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

  if (req.method === "DELETE") {
    try {
      await PetChild.findByIdAndDelete(id);
      console.log("Pet child successfully deleted via Mongoose!");
      res.status(200).json({ message: "Pet child successfully deleted!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
}
