export enum Type{
    INT = 0,
    DOUBLE = 1,
    BOOLEAN = 2,
    CHAR = 3,
    STRING = 4,
    NULL = 5,
    VOID = 6,
    RETURN = 7,
    BREAK = 8,
    CONTINUE = 9,
    VECTOR = 10,
    LIST = 11
}

export type Return = {
    value: any;
    type: Type
}