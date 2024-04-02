const express = require("express");
const {
  createClientRequest,
  getAllGrants,
  getAllClientRequest,
  getUserGrantRequest,
  OnBoardNewUser,
  AdminDecision,
} = require("../controllers/userController");

const router = express.Router();

/**
 * Route to create a new client request.
 * @name POST /api/user-requests
 * @function
 * @memberof module:routes/clientRequestRoutes
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Next middleware function.
 */
router.post("/user-requests", createClientRequest);

/**
 * Route to get all grants.
 * @name GET /api/getGrants
 * @function
 * @memberof module:routes/clientRequestRoutes
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Next middleware function.
 */
router.get("/getGrants", getAllGrants);

/**
 * Route to get all grants.
 * @name GET /api/getGrants
 * @function
 * @memberof module:routes/clientRequestRoutes
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Next middleware function.
 */
router.get("/admin-client-requests", getAllClientRequest);

/**
 * Route to get all grants.
 * @name GET /api/user requests
 * @function
 * @memberof module:routes/getUserRequests
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Next middleware function.
 */
router.get("/get-user-requests", getUserGrantRequest);

/**
 * Route to get all grants.
 * @name POST /api/user requests
 * @function
 * @memberof module:routes/getUserRequests
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Next middleware function.
 */
router.post("/save-new-user", OnBoardNewUser);

/**
 * Route to get all grants.
 * @name POST /api/user requests
 * @function
 * @memberof module:routes/adminDecision
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Next middleware function.
 */
router.post("/admin-decision", AdminDecision);

module.exports = router;
