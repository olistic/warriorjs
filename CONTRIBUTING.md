# Contributing to WarriorJS

Hey there! We’re really excited that you are interested in contributing to
WarriorJS. Before submitting your contribution though, please make sure to take
a moment and read through the following guidelines.

## Code of Conduct

Please note that this project has a [Code of Conduct](CODE_OF_CONDUCT.md). It's
important that you review and enforce it.

## Code contributions

Here is a quick guide to doing code contributions to the library.

1.  Find some issue you're interested in, or a feature that you'd like to
    tackle. Also make sure that no one else is already working on it. If it's a
    feature you're requesting, make sure it's aligned with the direction of the
    project by creating an issue and discussing it with the core maintainers. We
    don't want you to be disappointed.

2.  Fork, then clone:
    `git clone https://github.com/YOUR_USERNAME/warriorjs.git`.

3.  Create a branch with a meaningful name for the issue:
    `git checkout -b fix-something`

4.  Make your changes and commit: `git add` and `git commit`.

5.  Make sure that the tests still pass (see below).

6.  Push your branch: `git push -u origin your-branch-name`.

7.  Submit a Pull Request to the upstream warriorjs repository.

8.  Choose a descriptive title and describe your changes briefly.

9.  Wait for a maintainer to review your PR, make changes if it's being
    recommended, and get it merged.

10. Celebrate! :tada:

### This is my first Pull Request, where can I learn how to contribute?

You can take this free course:
[_How to Contribute to an Open Source Project on GitHub_](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github).

### How do I set up the project?

WarriorJS relies on [yarn](https://yarnpkg.com) instead of npm to manage
dependencies.

Run `yarn install` and edit code in the `src/` folder of the corresponding
package(s) in `packages/`. If your contribution is to the docs or the website,
you're looking for the `docs/` or the `website/` directories, respectively.

### How do I verify and test my changes?

To verify your changes, run the following commands:

1.  Install dependencies (you probably already did this): `yarn install`.
2.  Build cross-dependencies: `yarn build`.
3.  Link cross-dependencies: `yarn bootstrap`.
4.  Run tests: `yarn test`.

Steps #2 and #3 above are required because we're using
[Lerna](http://lernajs.io). If you have ideas on how to improve that to make
these steps simpler, please don't hesitate to create an issue or submit a PR.
