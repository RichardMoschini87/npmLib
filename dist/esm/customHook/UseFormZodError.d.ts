import { ZodSchema } from 'zod';
interface ZodSchemaWithShape<T> extends ZodSchema {
    shape: T;
}
/** Manage Zod error from schema and return objects input with error message and function to run validation
 */
export declare function useFormZodError<T, F>(zodObject: ZodSchemaWithShape<T>, state: F | undefined): {
    zodError: F | undefined;
    runZodValidation: () => void;
};
export {};
