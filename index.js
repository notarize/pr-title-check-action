const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const inputs = {
      token: core.getInput('repo-token', {required: true}),
    }
    const title = github.context.payload.pull_request.title;


    core.info(title);
    const storybook = title.includes('STORYBOOK');
    if (storybook) {
      core.warning("PR is storybook, all good"); 
      return;
    }

    core.info(title);
    const matches = title.match(/(\w+-\d+)/)
    if (!(matches)) {
      core.warning("Jira ticket not in PR title");
      core.setFailed();
      return;
    }
    const jiraTicketKey = matches[0];
    core.info(`Jira Ticket Key: ${jiraTicketKey}`);
  }
  catch (error) {
    core.error(error);
    core.setFailed(error.message);
  }
}

run()