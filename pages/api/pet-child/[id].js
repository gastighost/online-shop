import dbConnect from "../../../lib/dbConnect.js";
import PetChild from "../../../models/PetChild";

export default async function handler(req, res) {
  await dbConnect();

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

    const { id } = req.query;

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
}
