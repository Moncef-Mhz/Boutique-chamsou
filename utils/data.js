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
      email: "moncef2006@gmail.com",
      password: bcrypt.hashSync("moncef2006"),
      isAdmin: false,
    },
    {
      name: "imad",
      email: "user@gmail.com",
      password: bcrypt.hashSync("imad"),
      isAdmin: false,
    },
  ],
  product: [
    {
      Name: "replay",
      Slug: "nike replay",
      Categories: "ensemble",
      Image: "/img/ensemble replay.jpg",
      Price: "17000",
      Taille: ["S", "M", "L"],
      Brand: "nike",
      CountInStock: 20,
      Descreption: "ensemble Nike replay",
    },
    {
      Name: "replay",
      Slug: "nike air max",
      Categories: "ensemble",
      Image: "/img/ensemble replay.jpg",
      Price: "17000",
      Taille: ["S", "M", "L"],
      Brand: "nike",
      CountInStock: 20,
      Descreption: "ensemble Nike replay",
    },
    {
      Name: "replay",
      Slug: "nike",
      Categories: "ensemble",
      Image: "/img/ensemble replay.jpg",
      Price: "17000",
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
      Price: "41000",
      Brand: "nike",
      CountInStock: 20,
      Descreption:
        "ensemble Nike replay lorem replay loremreplay loremreplay loremreplay loremreplay loremreplay loremreplay lorem",
    },
    {
      Name: "Nike tn black",
      Slug: "Nike tn ",
      Categories: "Shoes",
      Image: "/img/nike tn.jpg",
      Price: "41000",
      Taille: ["40", "41", "42", "43", "44"],
      Brand: "nike",
      CountInStock: 20,
      Descreption:
        "ensemble Nike replay lorem replay loremreplay loremreplay loremreplay loremreplay loremreplay loremreplay lorem",
    },
  ],
};
export default data;
