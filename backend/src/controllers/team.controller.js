'use strict';

const teamService = require('../services/team.service');

exports.getTeamInfo = async (req, res, next) => {
  try {
    const data = await teamService.getTeamInfo();
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

exports.getTeamMembers = async (req, res, next) => {
  try {
    const data = await teamService.getTeamMembers();
    res.json({ success: true, data });
  } catch (err) { next(err); }
};
