const getCurrent = async (req, res) => {
  const { email, subscription } = await req.user;

  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = getCurrent;
