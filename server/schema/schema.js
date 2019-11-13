const graphql = require('graphql');
const lodash = require('lodash');

const{GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt} = graphql;

var data = [
    {name:'a', genre:'Fabtasy',id:'1'},
    {name:'b', genre:'Sci-fi',id:'2'}
];

var data2 = [
    {name:'A!', age:'22', id:'1'},
    {name:'B!', age:'24', id:'2'}
]


const BookType = new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type: GraphQLID},
        name:{type: GraphQLString},
        genre:{type: GraphQLString}
    })
});

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type: GraphQLID},
        name:{type: GraphQLString},
        age:{type: GraphQLInt}
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type: BookType,
            args: {id:{type: GraphQLID}},
            resolve(parent, args){
                //code to get data from source
                return lodash.find(data,{id:args.id});
            }
        },
        author:{
            type: AuthorType,
            args:{id:{type:GraphQLID  }},
            resolve(parent, args){
                return lodash.find(data2,{id:args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query:RootQuery
})