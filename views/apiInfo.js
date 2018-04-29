module.exports = [
  {
    name: "GET api/drug",
    body: "Use this to get all available drug info."
  },
  {
    name: "GET api/drug/{drug name}",
    body: "Use this to get info on one specific drug."
  },
  {
    id: 3,
    name: "POST api/drug/",
    body: "Use this to add one drug to the database."
  },
  {
    id: 4,
    name: "PATCH api/drug/{drug name}",
    body: "Use this to alter the properties of one drug."
  },
  {
    id: 4,
    name: "DELETE api/drug/{drug name}",
    body: "Use this to delete one drug from the database."
  }
];
