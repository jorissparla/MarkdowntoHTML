const { request } = require('graphql-request');
const { Remarkable } = require('remarkable');
const md = new Remarkable();
md.set({
  html: true,
  breaks: true
});
const url = 'http://nlbavwixs.infor.com:4000/';
const query = `
{
  supportcard(id:"1FE8E42A-5786-4006-8A3C-3610E7762BB3") {
    id
    title
    description
  }
}
`;
const queryAll = `
query ALL_MAINTENANCE{
  allMaintenance {
    id
    version
    checksrequired
    solutions
    defects
    data_corruption
    portingset
    communication
    checklink
  }
}

`;
const mutation = `
mutation MUTATION_UPDATE_MAINTENANCE(
  $id: ID!
  $checksrequired: String
  $solutions: String
  $defects: String
  $data_corruption: String
  $portingset: String
  $communication: String
  $checklink: String
) {
  updateMaintenance(
    input: {
      id: $id
      checksrequired: $checksrequired
      solutions: $solutions
      defects: $defects
      data_corruption: $data_corruption
      portingset: $portingset
      communication: $communication
      checklink: $checklink
    }
  ) {
    id
    version
    checksrequired
    solutions
    defects
    data_corruption
    portingset
    communication
    checklink
  }
}

`;

async function start() {
  const result = await request(url, queryAll);
  // console.log(result);
  const { allMaintenance } = result;

  allMaintenance.map(
    async ({
      id,
      checksrequired: cr,
      solutions: sol,
      defects: def,
      data_corruption: dc,
      portingset: ps,
      communication: com,
      checklink: cl
    }) => {
      const checksrequired = md.render(cr);
      const solutions = md.render(sol);
      const defects = md.render(def);
      const portingset = md.render(ps);
      const data_corruption = md.render(dc);
      const communication = md.render(com);
      const checklink = md.render(cl);
      console.log(
        id,
        checksrequired,
        solutions,
        defects,
        data_corruption,
        portingset,
        communication,
        checklink
      );
      const res = await request(url, mutation, {
        id,
        checksrequired,
        solutions,
        defects,
        data_corruption,
        portingset,
        communication,
        checklink
      });
      console.log(res);
    }
  );
  // const content = result.supportcard.description;
  // const id = result.supportcard.id;
  // // console.log(content);
  // // console.log(md.render(content));
  // const res = await request(url, query);
  // console.log(res.supportcard.description);
}

start();
