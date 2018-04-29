# Drug API

A RESTful API used to manage drug stock levels.

## Setup

* Download this source code into a working directory.

* Install the requirements using yarn:

```
$ yarn install
```

This will install the required packages for using Drug API.

### Server Setup

* Install [PostgreSQL](https://www.postgresql.org/) if not already installed.

* Create a database:

```
$ echo "CREATE DATABASE drug;" | psql
```

* Set up the database and seed with example data:

```
$ yarn migrate
```

* Run the server:

```
$ yarn start
```

Visit [localhost:3000](http://localhost:3000) to see the running API!

## Available Methods

### GET api/drug

Use this to get all available drug info.

### GET api/drug/{drug name}

Use this to get info on one specific drug.

### POST api/drug/

Use this to add one drug to the database.

### PATCH api/drug/{drug name}

Use this to alter the properties of one drug.

### DELETE api/drug/{drug name}

Use this to delete one drug from the database.

## Contributing

All contributions are welcome: bug fixes, data contributions, recommendations.

Please see the [issues on GitHub](https://github.com/a-ogilvie/drug-api/issues) before you submit a pull request or raise an issue, as someone else may have already submitted it.

To contribute to this repository:

* [Fork the project to your own GitHub profile](https://help.github.com/articles/fork-a-repo/)

* Download the project using git clone:

```
git clone https://github.com/<YOUR_USERNAME>/drug-api.git
```

* Create a new branch with a descriptive name:

```
git checkout -b my_new_branch
```

* Write some code, fix something, and add a test to prove that it works. **No pull requests will be merged if the tests don't pass, or if new tests aren't written for new features.**

* Commit your code and push it to GitHub

* [Open a new pull request](https://help.github.com/articles/creating-a-pull-request/) and describe the changes you have made.

* Your changes will be accepted after review.
