# @mundophrase/cli

Manage [MundoPhrase][] from the command-line.

* [Installation][]
* [Usage][]
  * [Global options][]
  * [Commands][]
    * [get][]
* [Development][]
  * [Environment][]
  * [Testing][]
    * [Linting][]
    * [Auditing][]
    * [Unit tests][]
  * [Releasing][]

---

## Installation
[Installation]: #installation

Install `@mundophrase/cli` through [npm][]:

```sh
$ npm install --save-dev @mundophrase/cli
```

## Usage
[Usage]: #usage

The `mundophrase` command is available from the command-line:

```sh
$ mundophrase --help
```

### Global options
[Global options]: #global-options

A few global options are available to all commands, these are:

* `a`, `api-key`, `apiKey`

The _API Key_ for your _Project_ on [MundoPhrase][].
Please keep this value safe, it is highly discouraged to store this value in
version-control.

It is also possible to specify this value through the `MUNDOPHRASE_API_KEY`
environment variable.

### Commands
[Commands]: #commands

#### get
[get]: #get

Get a list of localization for a specified language, in a specified format. The
result of this command will save the result to file.

##### Options

* `f`, `format`

The file format to be saved. Valid options are `android`, `ios`, `java`, `json`,
`net` and `net_txt`. Default `json`. The format chosen will determine the
extension(s) of the saved file(s).

| format    | extension     |
| --------- | ------------- |
| `android` | `.xml`        |
| `ios`     | `.strings`    |
| `java`    | `.properties` |
| `json`    | `.json`       |
| `net`     | `.resx`       |
| `net_txt` | `.restxt`     |

* `l`, `language`

The IETF language/locale code(s) to request and save to file, each language
requested this way will be saved to a file named `{language}.{extension}` where
`extension` can be found in the table above.

* `o`, `output-directory`, `outputDirectory`

The directory in which to save the resulting file(s) relative to where the
script is being run. Valid directory name may begin with or without the trailing
`./`.

##### Example

```sh
$ mundophrase get -a APIKEY -f android -l af-ZA -l en-US -o src/i18n
```

---

## Development
[Development]: #development

### Environment
[environment]: #environment
[Environment]: #environment

For convenience, a development [environment][] is included in the form of a
`Dockerfile` and a `docker-compose.yml` file. To set it up you need to:

Copy the `.env.sample` file to `.env` and fill in the values (if required):

```sh
$ cp .env.sample .env
```

Build the container (`app`):

```sh
$ docker-compose build
```

### Testing
[Testing]: #testing

All tests can be run with the command:

```sh
$ docker-compose run --rm app npm test
```

or without _Docker_:

```sh
$ npm test
```

_If you choose this option you will have to `npm install` locally first._

#### Linting
[Linting]: #linting

[Linting][] is run through [eslint][] with [eslint-config-airbnb-base][] as
configuration. To run the linter you can use:

```sh
$ docker-compose run --rm app npm run test:lint
```

or without _Docker_:

```sh
$ npm run test:lint
```

#### Auditing
[auditing]: #auditing
[Auditing]: #auditing

[Auditing][] is done through the [npm audit][] command with some options
applied. To run [auditing][] with default options applied you can use the
command:

```sh
$ docker-compose run --rm app npm run test:vulnerabilities
```

or without _Docker_:

```sh
$ npm run test:vulnerabilities
```

#### Unit tests
[unit tests]: #unit-tests
[Unit tests]: #unit-tests

Unit tests are run through [Jest][]. When adding new functionality, please add
tests. To run the [unit tests][] you can use the following command:

```sh
$ docker-compose run --rm app npm run test:scripts
```

or without _Docker_:

```sh
$ npm run test:scripts
```

### Releasing
[release]: #releasing
[Releasing]: #releasing

We use [semantic-release][] to [release][] `@mundophrase/cli`. Any merge to the
`master` branch will trigger a release automatically. Please read the the
[semantic-release][] documentation to see how commit messages should be
formatted.

---

[eslint]: https://eslint.org/
[eslint-config-airbnb-base]: https://www.npmjs.com/package/eslint-config-airbnb-base
[Jest]: https://jestjs.io/
[MundoPhrase]: https://www.mundophrase.com
[npm]: https://www.npmjs.com/
[npm audit]: https://docs.npmjs.com/cli/audit
[semantic-release]: https://github.com/semantic-release/semantic-release/
