// supportController.js

// Simulated support query system
const supportQueries = [];

// Submit query logic
exports.submitQuery = (req, res) => {
  const { userId, issue } = req.body;
  if (!userId || !issue) {
    return res.status(400).json({ message: 'User ID and issue are required.' });
  }

  const query = { userId, issue, status: 'Pending' };
  supportQueries.push(query);

  res.status(201).json({ message: 'Query submitted successfully.', query });
};

// View query status logic
exports.viewQueryStatus = (req, res) => {
  const { userId } = req.params;
  const userQueries = supportQueries.filter(query => query.userId === userId);
  res.status(200).json(userQueries);
};
