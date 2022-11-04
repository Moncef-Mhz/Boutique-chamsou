import bcrypt from "bcryptjs";
const data = {
  users: [
    {
      name: "moncef",
      email: "meharzimoncef57@gmail.com",
      password: bcrypt.hashSync("moncef2006"),
      isAdmin: true,
    },
    {
      name: "moncef",
      email: "meharzi@gmail.com",
      password: bcrypt.hashSync("moncef2006"),
      isAdmin: true,
    },
  ],
  product: [
    {
      Name: "replay",
      Slug: "nike replay",
      Categories: "ensemble",
      Image: "/img/ensemble replay.jpg",
      Price: 17000,
      Taille: ["S", "M", "L"],
      Brand: "nike",
      CountInStock: 20,
      Descreption: "ensemble Nike replay",
    },
    {
      Name: "Nike tn black",
      Slug: "Nike tn black",
      Categories: "Shoes",
      Image: "/img/nike tn.jpg",
      Price: 41000,
      Brand: "nike",
      CountInStock: 20,
      Taille: ["41", "42", "43"],
      Descreption:
        "ensemble Nike replay lorem replay loremreplay loremreplay loremreplay loremreplay loremreplay loremreplay lorem",
    },
  ],
};
export default data;
