# Create Project Card Action

[![CI Status](https://github.com/technote-space/create-project-card-action/workflows/CI/badge.svg)](https://github.com/technote-space/create-project-card-action/actions)
[![codecov](https://codecov.io/gh/technote-space/create-project-card-action/branch/master/graph/badge.svg)](https://codecov.io/gh/technote-space/create-project-card-action)
[![CodeFactor](https://www.codefactor.io/repository/github/technote-space/create-project-card-action/badge)](https://www.codefactor.io/repository/github/technote-space/create-project-card-action)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/technote-space/create-project-card-action/blob/master/LICENSE)

GitHub actions to create project card.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Usage](#usage)
- [Action event details](#action-event-details)
  - [Target events](#target-events)
- [Author](#author)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Usage
e.g. issue_opened.yml
```yaml
on:
  issues:
    types: [opened]
name: Issue opened
jobs:
  assign:
    name: Assign issues to project
    runs-on: ubuntu-latest
    steps:
      - name: Assign issues to project
        uses: technote-space/create-project-card-action@v1
        with:
          PROJECT: Backlog
          COLUMN: To do
          repo-token: ${{ secrets.GITHUB_TOKEN }}
```

e.g. pr_opened.yml
```yaml
on:
  pull_request:
    types: [opened]
name: Pull Request opened
jobs:
  assignToProject:
    name: Assign PullRequest to Project
    runs-on: ubuntu-latest
    steps:
      - name: Assign PullRequest to Project
        uses: technote-space/create-project-card-action@v1
        with:
          PROJECT: Backlog
          COLUMN: To do
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Options
### PROJECT
Project name.  

### COLUMN
Column name.  

### CHECK_ORG_PROJECT
Whether to check org project.  
If use this option, full access permission for admin is required.  
Use personal access token instead of `secrets.GITHUB_TOKEN`.  
default: `false`

### CHECK_USER_PROJECT
Whether to check user project.  
If use this option, full access permission for repo is required.  
Use personal access token instead of `secrets.GITHUB_TOKEN`.  
default: `false`

## Action event details
### Target events
| eventName | action |
|:---:|:---:|
|pull_request|opened|
|issues|opened|

## Author
[GitHub (Technote)](https://github.com/technote-space)  
[Blog](https://technote.space)
