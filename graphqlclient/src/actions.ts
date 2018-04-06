export interface Action {
    type: string,
    payload: any
}

export const ActionTypes = {
    BOOKS_RECEIVED: "BOOKS_RECEIVED"
};