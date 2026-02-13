'use strict';

const { Router } = require('express');
const ctrl       = require('../controllers/team.controller');

const router = Router();

router.get('/', ctrl.getTeamInfo);       // Team name + member count + member list
router.get('/members', ctrl.getTeamMembers); // Just the members array

module.exports = router;
