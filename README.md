# Create Project Card Action

[![CI Status](https://github.com/technote-space/create-project-card-action/workflows/CI/badge.svg)](https://github.com/technote-space/create-project-card-action/actions)
[![codecov](https://codecov.io/gh/technote-space/create-project-card-action/branch/master/graph/badge.svg)](https://codecov.io/gh/technote-space/create-project-card-action)
[![CodeFactor](https://www.codefactor.io/repository/github/technote-space/create-project-card-action/badge)](https://www.codefactor.io/repository/github/technote-space/create-project-card-action)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/technote-space/create-project-card-action/blob/master/LICENSE)

*Read this in other languages: [English](README.md), [日本語](README.ja.md).*

GitHub actions to create project card.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [Usage](#usage)
- [Options](#options)
- [Action event details](#action-event-details)
  - [Target events](#target-events)
- [Example repositories using this Action](#example-repositories-using-this-action)
- [Author](#author)

</details>
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
```

e.g. pr-opened.yml
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
```

## Options
| name | description | default | required | e.g. |
|:---:|:---|:---:|:---:|:---:|
|PROJECT|Project name| |true|`Backlog`|
|COLUMN|Column name| |true|`To do`|
|CHECK_ORG_PROJECT|Whether to check org project.<br>If use this option, full access permission for `admin` is required.<br>Use personal access token instead of `secrets.GITHUB_TOKEN`.|false| |`true`|
|CHECK_USER_PROJECT|Whether to check user project.<br>If use this option, full access permission for `repo` is required.<br>Use personal access token instead of `secrets.GITHUB_TOKEN`.|false| |`true`|
|GITHUB_TOKEN|Access token|`${{github.token}}`|true|`${{secrets.ACCESS_TOKEN}}`|

## Action event details
### Target events
| eventName | action |
|:---:|:---:|
|pull_request, pull_request_target|opened, reopened|
|issues|opened, reopened|

## Example repositories using this Action
- [Release GitHub Actions](https://github.com/technote-space/release-github-actions)
  - [pr-opened.yml](https://github.com/technote-space/release-github-actions/blob/master/.github/workflows/pr-opened.yml)
- [Auto card labeler](https://github.com/technote-space/auto-card-labeler)
  - [pr-opened.yml](https://github.com/technote-space/auto-card-labeler/blob/master/.github/workflows/pr-opened.yml)
- [Assign Author](https://github.com/technote-space/assign-author)
  - [pr-opened.yml](https://github.com/technote-space/assign-author/blob/master/.github/workflows/pr-opened.yml)
- [TOC Generator](https://github.com/technote-space/toc-generator)
  - [pr-opened.yml](https://github.com/technote-space/toc-generator/blob/master/.github/workflows/pr-opened.yml)
- [Package Version Check Action](https://github.com/technote-space/package-version-check-action)
  - [pr-opened.yml](https://github.com/technote-space/package-version-check-action/blob/master/.github/workflows/pr-opened.yml)
- [Get Diff Action](https://github.com/technote-space/get-diff-action)
  - [pr-opened.yml](https://github.com/technote-space/get-diff-action/blob/master/.github/workflows/pr-opened.yml)
- [Create Project Card Action](https://github.com/technote-space/create-project-card-action)
  - [pr-opened.yml](https://github.com/technote-space/create-project-card-action/blob/master/.github/workflows/pr-opened.yml)
- [Get git comment action](https://github.com/technote-space/get-git-comment-action)
  - [pr-opened.yml](https://github.com/technote-space/get-git-comment-action/blob/master/.github/workflows/pr-opened.yml)

## Author
[GitHub (Technote)](https://github.com/technote-space)  
[Blog](https://technote.space)
