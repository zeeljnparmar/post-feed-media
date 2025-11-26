import { errorResponse } from './error.js';

export const validateFields = (req, res, requiredFields = []) => {
  const missing = [];

  for (const field of requiredFields) {
    if (req.body[field] === undefined || req.body[field] === null || req.body[field] === ""||(field === "userId" && isNaN(req.body[field]))) {
      missing.push(field);
    }
  }

  if (missing.length > 0) {
    errorResponse(res, 400, "Missing required fields Or invalid data", { missing });
    return false;
  }

  return true;
};
