const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

async function resizeAvatar(avatarURL) {
  const image = await Jimp.read(avatarURL);

  image.resize(250, 250);

  await image.writeAsync(avatarURL);
}

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tmpUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  resizeAvatar(avatarURL);
  res.json({ avatarURL });
};

module.exports = updateAvatar;
