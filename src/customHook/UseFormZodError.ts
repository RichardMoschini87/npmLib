import { useCallback, useEffect, useState } from 'react';
import { ZodError, ZodSchema } from 'zod';

export interface ZodSchemaWithShape<T> extends ZodSchema {
    shape: T;
}

/** Manage Zod error from schema and return objects input with error message and function to run validation
 */
export function useFormZodError<T, F>(zodObject: ZodSchemaWithShape<T>, state: F | undefined) {
    const [zodError, setZodError] = useState<F | undefined>();
    const [startValidation, setStartValidation] = useState(false);

    const handleException = (e: ZodError) => {
        let formError: any = {};
        e.errors.forEach((er) => {
            if (er.path.length === 3) {
                let father = er.path[0];
                let childName = er.path[1];
                let attribute = er.path[2];

                let objFinal;

                if (formError?.[father]?.[childName]) {
                    objFinal = {
                        ...formError?.[father]?.[childName],
                        [attribute]: er.message
                    };
                } else {
                    objFinal = { [attribute]: er.message };
                }

                let child;
                if (formError?.[father] !== undefined) {
                    child = { ...formError?.[father], [childName]: objFinal };
                } else {
                    child = { [childName]: objFinal };
                }
                formError = { ...formError, [father]: child };
            } else if (er.path.length === 2) {
                let objName = er.path[0];
                let attribute = er.path[1];

                let obj;
                if (formError?.[objName]) {
                    obj = { ...formError?.[objName], [attribute]: er.message };
                } else {
                    obj = { [attribute]: er.message };
                }
                formError = { ...formError, [objName]: obj };
            } else if (er.path.length === 1) {
                let key = er.path[0];
                formError = { ...formError, [key]: er.message };
            }
        });
        return formError;
    };
    /** useCallback run validation zod */
    const runZodValidation = useCallback(() => {
        setStartValidation(true);
    }, []);

    useEffect(() => {
        if (startValidation) {
            try {
                zodObject.parse(state);
                setZodError(undefined);
            } catch (error: any) {
                if (error instanceof ZodError) {
                    let ex;
                    ex = handleException(error);
                    console.warn(ex);
                    setZodError(ex);
                }
            } finally {
                setStartValidation(false);
            }
        }
    }, [startValidation]);

    return { zodError, runZodValidation };
}
