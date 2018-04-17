import * as cors from 'cors';
import * as express from 'express';
import { MongoClient } from 'mongodb';

import initializeSchema from './schema';
import * as graphqlHTTP from 'express-graphql';

// import {grap} from 'express-graphql';
// Default port or given one.
export const GRAPHQL_ROUTE = "/graphql";
export const GRAPHIQL_ROUTE = "/graphiql";

export const MONGO_USER = "mrkdb1";
export const MONGO_PASSWORD = encodeURIComponent("XftdWmVEFWPL63piP4OhmtEVjtLSViZRsCCXR4ZgV5dVQVY9AV76XDST8pkmH5H77wt20rSmLSOo8Kpmi2PaPQ==");
export const MONGO_CONNECTION = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@mrkdb1.documents.azure.com:10255/?ssl=true`;
export const MONGO_DB = "bookdb";

interface IMainOptions {
    enableCors: boolean;
    enableGraphiql: boolean;
    env: string;
    port: number;
    verbose?: boolean;
}

/* istanbul ignore next: no need to test verbose print */
function verbosePrint(port: number, enableGraphiql: boolean) {
    console.log(`GraphQL Server is now running on http://localhost:${port}${GRAPHQL_ROUTE}`);
    if (true === enableGraphiql) {
        console.log(`GraphiQL Server is now running on http://localhost:${port}${GRAPHIQL_ROUTE}`);
    }
}

export async function main(options: IMainOptions) {
    const app = express();
    const connection = await MongoClient.connect(MONGO_CONNECTION);
    const db = connection.db(MONGO_DB);

    app.use(cors());

    app.use('/graphql', cors(), graphqlHTTP({
        schema: initializeSchema(db),
        graphiql: true
    }));

    return new Promise((resolve: any, reject: any) => {
        let server = app.listen(options.port, () => {
            /* istanbul ignore if: no need to test verbose print */
            if (options.verbose) {
                verbosePrint(options.port, options.enableGraphiql);
            }

            resolve(server);
        }).on("error", (err: Error) => {
            reject(err);
        });
    });
}

/* istanbul ignore if: main scope */
if (require.main === module) {
    const PORT = parseInt(process.env.PORT || '4000', 10);

    main({
        enableCors: true,
        enableGraphiql: true,
        env: 'dev',
        port: PORT,
        verbose: true,
    });
}