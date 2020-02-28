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
query SUPPORT_CARDS {
  supportcards {
    id
    description
  }
}

`;
const mutation = `
mutation MODIFY_SUPPORT_CARD($id: ID, $description: String) {
  modifySupportCard(input: { id: $id, description: $description }) {
    supportcard {
      id
      title
      description
    }
  }
}


`;

async function start() {
  const result = await request(url, queryAll);
  // console.log(result);
  const { supportcards } = result;

  supportcards.map(async ({ id, description: content }) => {
    console.log(id, content);
    const description = md.render(content);
    await request(url, mutation, { id, description });
  });
  // const content = result.supportcard.description;
  // const id = result.supportcard.id;
  // // console.log(content);
  // // console.log(md.render(content));
  // const res = await request(url, query);
  // console.log(res.supportcard.description);
}

start();
