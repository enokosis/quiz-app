import * as statisticsService from "../../services/statisticsService.js";

const showStats = async ({ render, user }) => {
  const getStats = await statisticsService.getStats(user.id);

  render("statistics.eta", getStats);
};

export { showStats };
