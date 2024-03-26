import { useCallback, useEffect, useState } from 'react';
import { ZodError, ZodSchema } from 'zod';
import { handleException } from './ErrorsZod';

interface ZodSchemaWithShape<T> extends ZodSchema {
    shape: T;
}

/** Manage Zod error from schema and return objects input with error message and function to run validation
 */
export function useFormZodError<T, F>(zodObject: ZodSchemaWithShape<T>, state: F | undefined) {
    const [zodError, setZodError] = useState<F | undefined>();
    const [startValidation, setStartValidation] = useState(false);

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
