import { Component, OnChanges, SimpleChanges, Type, SimpleChange } from '@angular/core';
import { every, pick, some } from 'lodash';
import { ChildComponent } from 'app/comp5/child/child.component';

export type Constructable<T> = new (...args: any[]) => T;
export interface TypedSimpleChange<T>
{
    currentValue: T;
    previousValue: T;
    firstChange: boolean;
}
export type TypedSimpleChanges<C, KS extends keyof C> =
    {
        [K in KS]: TypedSimpleChange<C[K]>;
    }
export type TypedSimpleChangesAny<C, KS extends keyof C> = Partial<TypedSimpleChanges<C, KS>>;

const separator = '###';
const changesKey = Symbol('changes-key');
const changesKeyAll = Symbol('changes-key-all');
const changesKeySome = Symbol('changes-key-some');

export function NgChangeDetector<T extends OnChanges & Component>(): <U extends Constructable<T>>(constructor: U) => U
{
    return function <U extends Constructable<T>>(constructor: U)
    {
        const original: (s: SimpleChanges) => void = constructor.prototype.ngOnChanges;

        constructor.prototype.ngOnChanges = function(this: Component & OnChanges, simpleChanges: SimpleChanges)
        {
            const callbacks: Map<any, any> = Reflect.get(constructor.prototype, changesKey);

            if(callbacks)
            {
                for(const [k, { key, alsoFirst }] of callbacks.entries())
                {
                    if(shouldCallCallback(simpleChanges, k, alsoFirst))
                        this[key].call(this, simpleChanges[k]);
                }
            }

            const callbacksAll: Map<any, any> = Reflect.get(constructor.prototype, changesKeyAll);

            if(callbacksAll)
            {
                for(const [ks, { key, alsoFirst }] of callbacksAll.entries())
                {
                    const keys: string[] = ks.split(separator);
                    if(every(keys, k => shouldCallCallback(simpleChanges, k, alsoFirst)))
                        this[key].call(this, pick(simpleChanges, keys));
                }
            }

            const callbacksSome: Map<any, any> = Reflect.get(constructor.prototype, changesKeySome);

            if(callbacksSome)
            {
                for(const [ks, { key, alsoFirst }] of callbacksSome.entries())
                {
                    const keys: string[] = ks.split(separator);
                    if(some(keys, k => shouldCallCallback(simpleChanges, k, alsoFirst)))
                        this[key].call(this, pick(simpleChanges, keys));
                }
            }

            if(original)
                original.call(this, simpleChanges);
        };

        return constructor;
    };
}

function shouldCallCallback(simpleChanges: SimpleChanges, k: string, alsoFirst: boolean)
{
    return simpleChanges[k] && (alsoFirst || !simpleChanges[k].isFirstChange());
}

export function onChange<T extends Component & OnChanges, K extends keyof T>(_ctor: Constructable<T>, name: K, alsoFirst = true)
{
    return function(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<(this: T, change: TypedSimpleChange<T[K]>) => void>)
    {
        let callbacksMap = Reflect.get(target, changesKey);
        if(!callbacksMap)
            Reflect.set(target, changesKey, callbacksMap = new Map<any, any>());

        callbacksMap.set(name, { key: propertyKey, alsoFirst });

        return descriptor;
    };
}

export function onChangeAll<T extends Component & OnChanges>(_ctor: Constructable<T>, names: (keyof T)[], alsoFirst = true)
{
    return function(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<(this: T, change: TypedSimpleChanges<T, typeof names[number]>) => void>)
    {
        let callbacksMap = Reflect.get(target, changesKeyAll);
        if(!callbacksMap)
            Reflect.set(target, changesKeyAll, callbacksMap = new Map<any, any>());

        callbacksMap.set(names.join(separator), { key: propertyKey, alsoFirst });

        return descriptor;
    };
}

export function onChangeAny<T extends Component & OnChanges>(_ctor: Constructable<T>, names: (keyof T)[], alsoFirst = true)
{
    return function(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<(this: T, change: TypedSimpleChangesAny<T, typeof names[number]>) => void>)
    {
        let callbacksMap = Reflect.get(target, changesKeySome);
        if(!callbacksMap)
            Reflect.set(target, changesKeySome, callbacksMap = new Map<any, any>());

        callbacksMap.set(names.join(separator), { key: propertyKey, alsoFirst });

        return descriptor;
    };
}
