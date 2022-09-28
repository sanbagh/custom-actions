const core = require("@actions/core");
const github = require("@actions/github");

const run = async () => {
  try {
    const token = core.getInput("token");
    const title = core.getInput("title");
    const body = core.getInput("body");
    const assignees = core.getInput("assignees");

    const octokit = new github.GitHub(token);
    const response = await octokit.issue.create({
      ...github.context.repo,
      title,
      body,
      assignees: assignees ? assignees.split("\n") : undefined,
    });
    
    core.setOutput('issue', JSON.stringify(response.data));
  } catch (ex) {
    core.setFailed(ex.message);
  }
};

run();
