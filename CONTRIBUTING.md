# Contributing to NimbleFi `onboarding`

The following is a set of guidelines for contributing to NimbleFi, which are hosted in the [NimbleFi Group](https://gitlab.com/nimblefi) on GitLab. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Development Lifecycle

### Getting Started

The development lifecycle starts locally; see  [Local Development Setup](https://gitlab.com/nimblefi/nimble-onboarding-new#local-development-setup)
to get started.

### Testing

Tests should be added for any new behaviors and missed behaviors when refactoring. It is not necessary to, or rather it is technical debt, to add tests for the sole purpose of coverage. Please do not add a test which asserts that a data-object returns a value it's holding via a "getter". Do test that a component returns, or rejects, some combination of values based on inputs.

### Style

Style is personal, but this project attempts to keep a similar code-voice using [TSLint](https://palantir.github.io/tslint/). Branch pipelines are both checked by tests and for lint. Changes to tslint's configuration should _never_ be made within the context of feature development. Further, this project has undergone several iterations of change to its desired style, as such, there may be many files which would not pass the current linting configuration; this is by-design, periodically the codebase may be lint-baselined, but such baselining should __never__ occur within the context of another change/feature.

### Feature Branches

A feature branch is a development branch which is prefixed with `feature-*`
(e.g. `feature-auth-mfa`). Using this naming convention will create an isolated feature application
(
see [app-spots:feature](#app-spots)). When public application testing is required, it is always preferable to use a feature-branch rather than deploying to the dev or staging. While the reasons for this are myriad; the most simple explanation is that your work should not have to affect the work of others. Keep your work isolated, if at all possible, and only deploy to public environments when absolutely necessary.

### Environment Branches

Environment branches (i.e. `env.*`) hold the actual code which is deployed to its corresponding [app-spot](#app-spots). These branches cannot be merged upstream and can only be pushed to from branch's pipeline. While you can pull (
i.e. merge downstream) from such a branch, you __should not__ do so; environment branches have no guarantee as to their contents and necessarily will deviate from `master` widely at any given point in time. They can be used as a reference when understanding differences, for example, between your local checkout and what is deployed and running in staging, but they should not be considered part of the main code trunk, `master` is the __only__ source of truth.

### Manual Deployments

Three environments require manual deployments via pressing a button in the CI pipeline for your branch - `development`, `staging`, and `production`. While it is unlikely that you will need to deploy any of these during development, there are several cases why it may be necessary to push the button.

- `>> development` - feature branches handle this 99% of the time, but some situations require testing on a public and static domain
- `>> staging` - e.g. you have a feature, or group of features, which the business has asked you to make available for demonstration
- `>> production` - your branch has been merged into master and is ready in and of itself for GA

### Pull Requests (Merge Requests)

Pull/Merge Requests (PR) should be small and contain a single feature which, by itself, adds value at the production level. In keeping with this practice, we

1) reduce the complexity of reviewing the code
2) reduce the probability of introducing a bug or causing a regression
3) increase the fidelity between business feature and its corresponding code
4) ensure tests are focused and testing is single purposed and concise

### Definition of Done

Q: I'm "done" with my feature, I'm ready to merge it into `master`... how?

A: Simple-ish... just shy of 10 steps :)...

1. ensure you've written relevant tests: new feature will likely require some automated testing or inclusion in an existing test suite
    - happy path - assert the feature does what it intends
    - negative paths - assert that common, but maybe exceptional, code paths fail elegantly or coerce data
        - for example, a method which accept a parameter that is `nullable` should check that its null and exit early or fail with a readable message
2. ensure your branch is current with `master` (i.e. pull it) and verify its expected behavior in its `feature` app-spot
    - `development` can also be used for testing and verification, but note that `feature` app-spots connect to `development`, so it's unlikely to be necessary
3. create a gitlab [merge request](https://docs.gitlab.com/ee/user/project/merge_requests/) (MR) from your branch into `master`, _ALWAYS_ `master`
    - do not create MRs into branches other than `master`
4. add reviewers to your MR - one from your team, and one repository "maintainer"
5. wait for reviews and make necessary changes when applicable
    - note: if you are a reviewer, it is customary on approval of an MR to put `+1` in a comment to signal the "go ahead"
6. once `+1`s are received from all reviewers, and all tests have passed, _MERGE_ with the MR's `(Merge when pipeline succeeds)` button
7. the MR's pipeline will deploy to `edge`, once complete, ensure the new feature is working on [onboarding-edge](https://onboarding-edge.nimblefi.com)
8. under most conditions, once `edge` is verified, it is desirable to push to `production`, this can be done by pushing the `(>> production)` button in the MR's pipeline
    - note: there may be circumstances where deployment to `production` should be on hold, if unsure, reach out to a repository "maintainer"
9. once in `production`, and verified by the product owner, this feature is `"done done"` (this is the definition of done)

#### App Spots

App Spots are public environments and a versioned public API environment.

| Environment   | Branch            | API/Core     | Location                                | Description                                                   |
|---------------|-------------------|--------------|-----------------------------------------|---------------------------------------------------------------|
| `development` | `env.development` | `dev` v1     | https://onboarding-dev.nimblefi.com     | sanity checking and intra-dev-team demos                      |
| `feature`     | `feature-*`       | `dev` v1     | https://`feature-*`.nimblefi.com        | isolated public feature testing                               |
| `staging`     | `env.staging`     | `staging` v1 | https://onboarding-staging.nimblefi.com | demo, acceptance, and pre-production feature bundled releases |
| `production`  | `env.production`  | `prod` v1    | https://onboarding.nimblefi.com         | general availability                                          |
| `edge`        | `master`          | `prod` v1    | https://onboarding-edge.nimblefi.com    | general availability for pre-production features              |

