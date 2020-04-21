import { SimpleChanges, OnChanges, Component, SimpleChange } from '@angular/core';

export type Constructable<T> = new (...args: any[]) => T;
export interface TypedSimpleChange<T>
{
    currentValue: T;
    previousValue: T;
    firstChange: boolean;
}
const key = Symbol('changes-key');

export function NgChangeDetector<T extends OnChanges & Component>(): <U extends Constructable<T>>(constructor: U) => U
{
    return function <U extends Constructable<T>>(constructor: U)
    {
        const original: (s: SimpleChanges) => void = constructor.prototype.ngOnChanges;

        constructor.prototype.ngOnChanges = function (this: Component & OnChanges, simpleChanges: SimpleChanges)
        {
            const callbacks: Map<any, any> = Reflect.get(constructor.prototype, key);

            if (callbacks)
            {
                // tslint:disable-next-line:forin
                for (const k in simpleChanges)
                {
                    const ks = k as keyof typeof this;
                    const { key: k2, alsoFirst } = callbacks.get(ks);
                    if (k2 && this[k2] && typeof this[k2] === 'function' && (alsoFirst || !simpleChanges[k].isFirstChange()))
                        this[k2].call(this, simpleChanges[k]);
                }
            }

            if (original)
                original.call(this, simpleChanges);
        };

        return constructor;
    };
}

// tslint:disable-next-line:max-line-length
export function onInputChange<T extends Component & OnChanges, K extends keyof T>(name: K, alsoFirst = true)
{
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<(c: TypedSimpleChange<T[K]>) => void>)
    {
        let cb = Reflect.get(target, key);
        if (!cb)
            Reflect.set(target, key, cb = new Map<any, any>());
        cb.set(name, { key: propertyKey, alsoFirst });

        return descriptor;
    };
}
