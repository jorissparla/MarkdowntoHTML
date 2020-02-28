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
mutation u ($id:ID!, $text: String, $localizations: String) {
  updateMaintenanceFAQ(input: {id:$id, text:$text, localizations:$localizations}) {
    id
    text
    localizations
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
