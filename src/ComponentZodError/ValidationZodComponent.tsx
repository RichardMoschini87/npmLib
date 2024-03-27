import { useState, createContext, useEffect } from 'react';
import { ZodError, ZodObject } from 'zod';
import { handleZodException } from './HandlerZodErrors';

interface ValidationProps {
    zodObject: ZodObject<any>;
    objectToValidate: any;
    childrens: any;
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

    useEffect(() => {
        try {
            zodObject.parse(objectToValidate);
        } catch (error: any) {
            if (error instanceof ZodError) {
                console.error(error);
                let out = handleZodException(error);
                setOutput(out);
            }
        }
    }, [objectToValidate]);

    return <ZodErrorBox.Provider value={{ getObject: output, setObject: setOutput }}>{childrens}</ZodErrorBox.Provider>;
}
