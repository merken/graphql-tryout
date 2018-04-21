import { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from 'graphql';
import { Db } from 'mongodb';

let initializeSchema = (db: Db) => {
    let store = {};
    let storeType = new GraphQLObjectType({
        name: 'Store',
        fields: () => ({
            books: {
                type: new GraphQLList(bookType),
                resolve: () => db.collection('books').find({}).toArray()
            }
        })
    });

    let bookType = new GraphQLObjectType({
        name: 'Book',
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
                store: {
                    type: storeType,
                    resolve: () => store
                }
            })
        })
    });

    return schema;
};

export default initializeSchema;