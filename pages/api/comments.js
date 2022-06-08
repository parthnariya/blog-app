import { GraphQLClient, gql } from 'graphql-request';
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
export default async function comments(request, response) {
    // console.log("hello",request.body)
  const client = new GraphQLClient((graphqlAPI),{
      headers : {
          authorization : `Bearer ${process.env.GRAPHCMS_TOKEN}`
      }
  })
  const query = gql`
  mutation CreateComment($name  :String!,$email :String! , $comment : String!,$slug:String! ){
      createComment(data : {name : $name, email : $email, comment : $comment , post :{connect :{slug : $slug}}}){
          id
      }
  }
  `
  try{
    const result = await client.request(query,request.body)
    console.log(result)
    return response.status(200).send(result);
  }catch (error){
    console.log(error)
    return response.status(200).send(error);
  } 
}
