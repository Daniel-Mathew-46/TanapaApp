const generateChars = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let change = "";
  const charactersLength = characters.length;
  for (let i = 0; i < 5; i++) {
    change += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return change;
};

export default generateChars;
