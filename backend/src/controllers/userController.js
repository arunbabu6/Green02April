const ClientRequest = require("../models/ClientRequest");
const GrantsAll = require("../models/GrantSchema");
const AdminGrantRequests = require("../models/GrantSchema");
const OnBoardUser = require("../models/OnBoardUser");

/**
 * Creates a new client request.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
const createClientRequest = async (req, res) => {
  const { granterName, username, email, description, requestedAmount } =
    req.body;
  console.log(`granter name -----> ${granterName}`);
  try {
    const newClientRequest = new ClientRequest({
      granterName,
      username,
      email,
      description,
      requestedAmount,
      grantStatus: false,
    });

    const savedClientRequest = await newClientRequest.save();

    res.status(201).json(savedClientRequest);
  } catch (error) {
    console.error("Error creating user request:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Retrieves all grants.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
const getAllGrants = async (req, res) => {
  const allData = await GrantsAll.find();
  res.send(allData);
};

/**
 * Retrieves all client requests.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */

const getAllClientRequest = async (req, res) => {
  const allData = await ClientRequest.find();
  res.send(allData);
};

/**
 * Retrieves client requests for a specific user.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */

const getUserGrantRequest = async (req, res) => {
  const { email } = req.query;
  try {
    const userGrantRequests = await ClientRequest.find({ email: email });
    res.send(userGrantRequests);
  } catch (error) {
    console.error("Error fetching user grant requests:", error);
    res.status(500).send("Internal Server Error");
  }
};

/**
 * Retrieves client requests for a specific user.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */

const OnBoardNewUser = async (req, res) => {
  const { role, username, email, picture } = req.body;
  console.log(`granter name -----> ${role}`);
  const existingUser = await OnBoardUser.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  try {
    const onBoardUser = new OnBoardUser({
      role,
      username,
      email,
      picture,
    });

    const onBoardNewUser = await onBoardUser.save();

    res.status(201).json(onBoardNewUser);
  } catch (error) {
    console.error("Error on boarding the user request:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const AdminDecision = async (req, res) => {
  const { granterName, email, grantStatus } = req.body;
  console.log(grantStatus, ' ', email, ' ', grantStatus);
  try {
    ClientRequest.findOneAndUpdate(
      { granterName: granterName, email: email },
      { $set: { grantStatus: grantStatus } },
      { new: true }
    )
      .then((updatedRequest) => {
        if (updatedRequest) {
          console.log("Updated request:", updatedRequest);
          res.status(201).json(updatedRequest);
        } else {
          console.log("Request not found.");
          res.status(404).json({ error: "Request not found" });
        }
      })
      .catch((error) => {
        console.error("Error updating request:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      });
  } catch (error) {
    console.error("Error on boarding the user request:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createClientRequest,
  getAllGrants,
  getAllClientRequest,
  getUserGrantRequest,
  OnBoardNewUser,
  AdminDecision,
};
