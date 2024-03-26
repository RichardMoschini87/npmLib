"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFormZodError = void 0;
const react_1 = require("react");
const zod_1 = require("zod");
const ErrorsZod_1 = require("./ErrorsZod");
/** Manage Zod error from schema and return objects input with error message and function to run validation
 */
function useFormZodError(zodObject, state) {
    const [zodError, setZodError] = (0, react_1.useState)();
    const [startValidation, setStartValidation] = (0, react_1.useState)(false);
    /** useCallback run validation zod */
    const runZodValidation = (0, react_1.useCallback)(() => {
        setStartValidation(true);
    }, []);
    (0, react_1.useEffect)(() => {
        if (startValidation) {
            try {
                zodObject.parse(state);
                setZodError(undefined);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    let ex;
                    ex = (0, ErrorsZod_1.handleException)(error);
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
exports.useFormZodError = useFormZodError;
//# sourceMappingURL=UseFormZodError.js.map