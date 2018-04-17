import { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from 'graphql';
import { Db } from 'mongodb';

let initializeSchema = (db: Db) => {
    let bookType = new GraphQLObjectType({
        name: 'Books',
        fields: () => ({
            _id: { type: GraphQLString },
            title: { type: GraphQLString },
            author: { type: GraphQLString }
        })
    });

    let schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: () => ({
                books: {
                    type: new GraphQLList(bookType),
                    resolve: () => db.collection('books').find({}).toArray()
                }
            })
        })
    });

    return schema;
};

export default initializeSchema;