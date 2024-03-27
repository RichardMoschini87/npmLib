import { useState, createContext } from 'react';
import { ZodError, ZodObject } from 'zod';
import { handleZodException } from './HandlerZodErrors';

interface ValidationProps {
    zodObject: ZodObject<any>;
    objectToValidate: any;
    operationId: string;
    childrens: JSX.Element[];
}
export interface ArgContext {
    setObject?: (input: any) => void;
    getObject?: any;
}
/** Context pick errors data after valid form zod error */
export const ZodErrorBox = createContext<ArgContext | null>(null);

/** Component Validation ZodError to manage error form Zod*/
export function ValidationZodComponent<T>({ zodObject, objectToValidate, childrens }: ValidationProps) {
    const [output, setOutput] = useState<T>();

    const validation = () => {
        try {
            zodObject.parse(objectToValidate);
        } catch (error: any) {
            if (error instanceof ZodError) {
                let out = handleZodException(error);
                setOutput(out);
            }
        }
    };

    return (
        <ZodErrorBox.Provider value={{ getObject: output, setObject: setOutput }}>
            <form onSubmit={validation}>
                {childrens.map((child) => {
                    return child;
                })}
            </form>
        </ZodErrorBox.Provider>
    );
}
