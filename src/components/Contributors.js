import React, { useEffect, useState } from "react";
import { Octokit } from "@octokit/rest";

import { Grid, Avatar, Link, Typography } from "@material-ui/core";

const octokit = new Octokit();

const Contributors = () => {
  let repos = ["spells-fyi", "spells-subgraph"];
  const [state, setState] = useState({
    contributors: [],
  });
  useEffect(() => {
    fetchContributors();
  }, []);

  const fetchContributors = async () => {
    await repos.map((repo) => {
      octokit.repos
        .listContributors({
          owner: "blocklytics",
          repo,
        })
        .then((result) =>
          setState({
            contributors: result.data,
          })
        );
    });
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6" align="center">
          Contributors
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container direction="row" justify="center" spacing={2}>
          {state.contributors.map((contributor, index) => (
            <Grid item key={index}>
              <Link
                href={contributor.html_url}
                rel="noopener"
                rel="noreferrer"
                target="_blank"
              >
                <Avatar src={contributor.avatar_url} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Contributors;
