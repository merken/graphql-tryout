import { debug } from 'util';
import { Component } from 'react';
import * as React from 'react';
import { graphql, QueryRenderer } from 'react-relay';

import { Main } from './components/main';
import environment from './environment';
import * as ReactDOM from 'react-dom';
import { installRelayDevTools } from 'relay-devtools';

//installRelayDevTools();

const root = document.getElementById('root');

const query = graphql`
	query srcQuery {
		store { 
            books {
                _id
                title
                author
            }
		}
	}
`;

const variables = {};

ReactDOM.render(
    <QueryRenderer
        environment={environment}
        query={query}
        variables={variables}
        render={({ error, props }) => {
            debugger
            if (error) {
                return <div>{error.message}</div>;
            } else if (props) {
                return <Main store={props.store} />;
            }
            return <div>Loading</div>;
        }} />,
    root
);