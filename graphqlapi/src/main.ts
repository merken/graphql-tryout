import * as express from 'express';
import * as bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
//import {Schema} from './schema';
import * as cors from 'cors';

// Default port or given one.
export const GRAPHQL_ROUTE = "/graphql";
export const GRAPHIQL_ROUTE = "/graphiql";

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

export class TestConnector {
    public get testString() {
        return "it works from connector as well!";
    }
}

export function main(options: IMainOptions) {
    let app = express();

    if (true === options.enableCors) {
        app.use(GRAPHQL_ROUTE, cors());
    }

    let testConnector = new TestConnector();
    app.use(GRAPHQL_ROUTE, bodyParser.json(), graphqlExpress({
        context: {
            testConnector,
            //TODO add connnectors
        },
         schema: null,
    }));

    if (true === options.enableGraphiql) {
        app.use(GRAPHIQL_ROUTE, graphiqlExpress({ endpointURL: GRAPHQL_ROUTE }));
    }

    return new Promise((resolve:any, reject:any) => {
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
    const PORT = parseInt(process.env.PORT || '3000', 10);

    // Either to export GraphiQL (Debug Interface) or not.
    const NODE_ENV = process.env.NODE_ENV !== "production" ? "dev" : "production";

    const EXPORT_GRAPHIQL = NODE_ENV !== "production";

    // Enable cors (cross-origin HTTP request) or not.
    const ENABLE_CORS = NODE_ENV !== "production";

    main({
        enableCors: ENABLE_CORS,
        enableGraphiql: EXPORT_GRAPHIQL,
        env: NODE_ENV,
        port: PORT,
        verbose: true,
    });
}