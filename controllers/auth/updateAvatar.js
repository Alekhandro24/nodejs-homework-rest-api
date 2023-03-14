const Jimp = require("jimp");

const { User } = require("../../models");

const path = require("path");
const fs = require("fs/promises");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload } = req.file;
  const { _id: id } = req.user;

  const avatarImg = await Jimp.read(tempUpload);
  avatarImg.resize(250, 250).quality(85).write(tempUpload);

  const imageName = `${id}.${avatarImg.getExtension()}`;

  try {
    const resultUpload = path.join(avatarsDir, imageName);

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("public", "avatars", imageName);

    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
