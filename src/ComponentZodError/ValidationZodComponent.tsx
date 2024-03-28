import { useEffect } from 'react';
import { ZodObject } from 'zod';
import { handleZodException } from './HandlerZodErrors';

export const ZOD_ERROR_ITEM = 'zodError_item';
interface ValidationProps {
    zodObject: ZodObject<any>;
    objectToValidate: any;
    childrens: any;
}
/** Component Validation ZodError to manage error form Zod*/
export function ValidationZodComponent({ zodObject, objectToValidate, childrens }: ValidationProps) {
    console.log(objectToValidate);
    console.log(zodObject);

    useEffect(() => {
        if (objectToValidate) {
            try {
                zodObject.parse(objectToValidate);
            } catch (error: any) {
                console.debug(error);
                let out = handleZodException(error);
                console.debug(out);
                localStorage.setItem(ZOD_ERROR_ITEM, JSON.stringify(out));
            }
        }
    }, [objectToValidate]);

    return <>{childrens}</>;
}
