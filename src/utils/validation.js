// Function to validate required fields in the request body.

exports.validateFields = (req, res, requiredFields = []) => {
  const missing = [];

  for (const field of requiredFields) {
    if (req.body[field] === undefined || req.body[field] === null || req.body[field] === "") {
      missing.push(field);
    }
  }

  if (missing.length > 0) {
    errorResponse(res, 400, "Missing required fields", { missing });
    return false;  // stops controller execution
  }

  return true;
};
