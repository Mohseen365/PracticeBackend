const express = require('express');
const planRouter = express.Router();
const {protectRoute, isAuthorised} = require("../helper");

planRouter
  .route('/allPlans')
  .get(allPlans);

planRouter.use(protectRoute);
planRouter
  .route('/plan/:id')
  .get(getPlan);

planRouter.use(isAuthorised(['admin','restaurantowner']));
planRouter
  .route('/crudPlan')
  .post(createPlan)
  .patch(updatePlan)
  .delete(deletePlan)