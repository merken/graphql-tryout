/**
 * @flow
 * @relayHash 8eaefa04026b3cff09d03682adf97940
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type srcQueryVariables = {| |};
export type srcQueryResponse = {|
  +store: ?{|
    +books: ?$ReadOnlyArray<?{|
      +_id: ?string,
      +title: ?string,
      +author: ?string,
    |}>,
  |},
|};
*/


/*
query srcQuery {
  store {
    books {
      _id
      title
      author
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "store",
    "storageKey": null,
    "args": null,
    "concreteType": "Store",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "books",
        "storageKey": null,
        "args": null,
        "concreteType": "Book",
        "plural": true,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "_id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "title",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "author",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "srcQuery",
  "id": null,
  "text": "query srcQuery {\n  store {\n    books {\n      _id\n      title\n      author\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "srcQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": v0
  },
  "operation": {
    "kind": "Operation",
    "name": "srcQuery",
    "argumentDefinitions": [],
    "selections": v0
  }
};
})();
(node/*: any*/).hash = '1cfacc23864ccab524ede04aed3a3631';
module.exports = node;
