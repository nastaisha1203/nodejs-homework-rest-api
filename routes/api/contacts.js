const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares");

const { schema } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post(
  "/",
  validateBody(schema.addSchema, "missing required name field"),
  ctrl.addContact
);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schema.addSchema, "missing fields"),
  ctrl.updateContact
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schema.favoriteSchema, "missing fields"),
  ctrl.updateContact
);

module.exports = router;
