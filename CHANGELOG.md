# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2018-05-14

### Added

* Reward property to Unit class ([@RascalTwo][] in [#67][])
* Warrior score next to health in play log ([@RascalTwo][] in [#70][])
* Support for Node 9 and 10 ([@olistic][] in [#81][])
* `--yes` flag to CLI ([@olistic][] in [#93][] and [#98][])

### Changed

* Exclude abilities from play log except warrior's ([@olistic][] in [#83][])
* Rescue ability awards Unit's reward ([@RascalTwo][] in [#86][], [@olistic][]
  in [#90][])
* CLI default answers ([@olistic][] in [#97][])

### Removed

* `--skip` flag from CLI ([@olistic][] in [#93][])

### Fixed

* Path normalization in tests ([@jakehamilton][] in [#77][])

## [0.1.1] - 2018-05-03

### Fixed

* Missing `bin` directory in `@warriorjs/cli` package files

## 0.1.0 - 2018-05-03 [YANKED]

Initial version

[unreleased]: https://github.com/olistic/warriorjs/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/olistic/warriorjs/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/olistic/warriorjs/compare/v0.1.0...v0.1.1
[@olistic]: https://github.com/olistic
[@rascaltwo]: https://github.com/RascalTwo
[@jakehamilton]: https://github.com/jakehamilton
[#67]: https://github.com/olistic/warriorjs/pull/67
[#70]: https://github.com/olistic/warriorjs/pull/70
[#77]: https://github.com/olistic/warriorjs/pull/77
[#81]: https://github.com/olistic/warriorjs/pull/81
[#83]: https://github.com/olistic/warriorjs/pull/83
[#86]: https://github.com/olistic/warriorjs/pull/86
[#90]: https://github.com/olistic/warriorjs/pull/90
[#93]: https://github.com/olistic/warriorjs/pull/93
[#97]: https://github.com/olistic/warriorjs/pull/97
[#98]: https://github.com/olistic/warriorjs/pull/98
