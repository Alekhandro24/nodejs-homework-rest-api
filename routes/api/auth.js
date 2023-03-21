const express = require("express");

const { auth, upload, validation, ctrlWrapper } = require("../../middlewares");

const { auth: ctrl } = require("../../controllers");

const {
  joiRegisterSchema,
  joiLoginSchema,
  updateSubscriptionSchema,
  verifyEmailSchema,
} = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/",
  auth,
  validation(updateSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

router.get("/verify/:verificationToken", auth, ctrlWrapper(ctrl.verify));

router.post(
  "/verify/:verificationToken",
  auth,
  validation(verifyEmailSchema),
  ctrlWrapper(ctrl.resendEmail)
);

module.exports = router;
