import { ZodError } from 'zod';
import { ZOD_ERROR_ITEM } from './ValidationZodComponent';

/** Manage Zod error from schema and return objects input with error message and function to run validation
 */
export const handleZodException = (e: ZodError) => {
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

const getZodErrorFromLocalStorage = () => JSON.parse(localStorage.getItem(ZOD_ERROR_ITEM) ?? ``);
/** Return shape correct of object zod errors, otherwhise return undefined */
export const getZodErrorObject = () => (getZodErrorFromLocalStorage() !== '' ? getZodErrorFromLocalStorage() : undefined);
