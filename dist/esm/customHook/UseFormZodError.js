var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { useCallback, useEffect, useState } from 'react';
import { ZodError } from 'zod';
/** Manage Zod error from schema and return objects input with error message and function to run validation
 */
export function useFormZodError(zodObject, state) {
    var _a = useState(), zodError = _a[0], setZodError = _a[1];
    var _b = useState(false), startValidation = _b[0], setStartValidation = _b[1];
    var handleException = function (e) {
        var formError = {};
        e.errors.forEach(function (er) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            var _k, _l;
            if (er.path.length === 3) {
                var father = er.path[0];
                var childName = er.path[1];
                var attribute = er.path[2];
                var objFinal = void 0;
                if ((_k = formError === null || formError === void 0 ? void 0 : formError[father]) === null || _k === void 0 ? void 0 : _k[childName]) {
                    objFinal = __assign(__assign({}, (_l = formError === null || formError === void 0 ? void 0 : formError[father]) === null || _l === void 0 ? void 0 : _l[childName]), (_a = {}, _a[attribute] = er.message, _a));
                }
                else {
                    objFinal = (_b = {}, _b[attribute] = er.message, _b);
                }
                var child = void 0;
                if ((formError === null || formError === void 0 ? void 0 : formError[father]) !== undefined) {
                    child = __assign(__assign({}, formError === null || formError === void 0 ? void 0 : formError[father]), (_c = {}, _c[childName] = objFinal, _c));
                }
                else {
                    child = (_d = {}, _d[childName] = objFinal, _d);
                }
                formError = __assign(__assign({}, formError), (_e = {}, _e[father] = child, _e));
            }
            else if (er.path.length === 2) {
                var objName = er.path[0];
                var attribute = er.path[1];
                var obj = void 0;
                if (formError === null || formError === void 0 ? void 0 : formError[objName]) {
                    obj = __assign(__assign({}, formError === null || formError === void 0 ? void 0 : formError[objName]), (_f = {}, _f[attribute] = er.message, _f));
                }
                else {
                    obj = (_g = {}, _g[attribute] = er.message, _g);
                }
                formError = __assign(__assign({}, formError), (_h = {}, _h[objName] = obj, _h));
            }
            else if (er.path.length === 1) {
                var key = er.path[0];
                formError = __assign(__assign({}, formError), (_j = {}, _j[key] = er.message, _j));
            }
        });
        return formError;
    };
    /** useCallback run validation zod */
    var runZodValidation = useCallback(function () {
        setStartValidation(true);
    }, []);
    useEffect(function () {
        if (startValidation) {
            try {
                zodObject.parse(state);
                setZodError(undefined);
            }
            catch (error) {
                if (error instanceof ZodError) {
                    var ex = void 0;
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
    return { zodError: zodError, runZodValidation: runZodValidation };
}
//# sourceMappingURL=UseFormZodError.js.map