// type PropsOf<Q, T> = { [P in keyof T]: T[P] extends Q ? P : never }[keyof T];
// type ArrayFields<T> = PropsOf<Array<any>, T>;
// type ComplexFields<T> = PropsOf<object, T> & Exclude<keyof T, ArrayFields<T>>;
// type SimpleFields<T> = Exclude<keyof T, ComplexFields<T>> & Exclude<keyof T, ArrayFields<T>>;

// interface FormDefinition<T>
// {
//     initialValue: T;
//     validator?: ValidatorFn;
// }

// type FormArrayDefinition<T> = T extends Array<infer U> ?
//     FormArrayDefinition<U> :
//     Omit<FormDefinition<T[]>, 'initialValue'> & { items: FormGroupDefinition<T>[] };

// type FormGroupDefinition<T> = {
//     [K in SimpleFields<T>]: FormDefinition<T[K]>
// } & {
//         [K in ComplexFields<T>]: FormGroupDefinition<T[K]>
//     } & {
//         [K in ArrayFields<T>]: T[K] extends Array<infer U> ?
//         U extends object ?
//         FormArrayDefinition<U> :
//         FormDefinition<U[]> :
//         never
//     };

// interface IA
// {
//     s: string;
//     n: number;
//     x: {
//         s: string;
//         n: number;
//     };
//     ns: { a: string }[];
//     xs: number[];
// }

// const g: FormGroupDefinition<IA> = {
//     n: { initialValue: 0 },
//     s: { initialValue: '' },
//     x: {
//         s: { initialValue: '' },
//         n: { initialValue: 0 }
//     },
//     ns: {
//         items: [
//             { a: { initialValue: '10' } }
//         ]
//     },
//     xs: {
//         initialValue: [1, 2, 3]
//     }
// };
