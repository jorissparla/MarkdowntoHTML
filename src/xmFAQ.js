const { request } = require('graphql-request');
const { Remarkable } = require('remarkable');
const md = new Remarkable();
md.set({
  html: true,
  breaks: true
});
const url = 'http://nlbavwixs.infor.com:4000/';
const query = `
query q {
  maintenanceFAQ {
    id
    text
    localizations
    text2
    text3
  }
}
`;

const mutation = `
mutation MUTATION_UPDATE_MAINTENANCE(   $id: ID!,
  $checksrequired: String,
  $solutions: String,
  $defects: String,
  $data_corruption:String,
  $portingset: String,
  $communication:String,
  $checklink: String){
updateMaintenance(input: {
   id: $id,
  
  checksrequired: $checksrequired,
  solutions: $solutions,
  defects: $defects,
  data_corruption: $data_corruption,
  portingset: $portingset,
  communication: $communication,
  checklink: $checklink
}) {
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
  const result = await request(url, query);
  // console.log(result);
  const { maintenanceFAQ } = result;

  // consolelog(id, text);
  console.log(maintenanceFAQ);
  const { id, text: a, localizations: b } = maintenanceFAQ;
  const text = md.render(a);
  const localizations = md.render(b);
  console.log(text, localizations);
  const res = await request(url, mutation, { id, text, localizations });
  console.log(res);
  // const content = result.supportcard.description;
  // const id = result.supportcard.id;
  // // console.log(content);
  // // console.log(md.render(content));
  // const res = await request(url, query);
  // console.log(res.supportcard.description);
}

start();
