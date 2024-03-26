import { useCallback, useEffect, useState } from 'react';
import { ZodError } from 'zod';
import { handleException } from './ErrorsZod';
/** Manage Zod error from schema and return objects input with error message and function to run validation
 */
export function useFormZodError(zodObject, state) {
    const [zodError, setZodError] = useState();
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
            }
            catch (error) {
                if (error instanceof ZodError) {
                    let ex;
                    ex = handleException(error);
                    console.warn(ex);
                    setZodError(ex);
                }
            }
            finally {
                setStartValidation(false);
            }
        }
    }, [startValidation]);
    return { zodError, runZodValidation };
}
//# sourceMappingURL=UseFormZodError.js.map