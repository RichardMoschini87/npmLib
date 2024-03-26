"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleException = void 0;
const handleException = (e) => {
    let formError = {};
    e.errors.forEach((er) => {
        var _a, _b;
        if (er.path.length === 3) {
            let father = er.path[0];
            let childName = er.path[1];
            let attribute = er.path[2];
            let objFinal;
            if ((_a = formError === null || formError === void 0 ? void 0 : formError[father]) === null || _a === void 0 ? void 0 : _a[childName]) {
                objFinal = Object.assign(Object.assign({}, (_b = formError === null || formError === void 0 ? void 0 : formError[father]) === null || _b === void 0 ? void 0 : _b[childName]), { [attribute]: er.message });
            }
            else {
                objFinal = { [attribute]: er.message };
            }
            let child;
            if ((formError === null || formError === void 0 ? void 0 : formError[father]) !== undefined) {
                child = Object.assign(Object.assign({}, formError === null || formError === void 0 ? void 0 : formError[father]), { [childName]: objFinal });
            }
            else {
                child = { [childName]: objFinal };
            }
            formError = Object.assign(Object.assign({}, formError), { [father]: child });
        }
        else if (er.path.length === 2) {
            let objName = er.path[0];
            let attribute = er.path[1];
            let obj;
            if (formError === null || formError === void 0 ? void 0 : formError[objName]) {
                obj = Object.assign(Object.assign({}, formError === null || formError === void 0 ? void 0 : formError[objName]), { [attribute]: er.message });
            }
            else {
                obj = { [attribute]: er.message };
            }
            formError = Object.assign(Object.assign({}, formError), { [objName]: obj });
        }
        else if (er.path.length === 1) {
            let key = er.path[0];
            formError = Object.assign(Object.assign({}, formError), { [key]: er.message });
        }
    });
    return formError;
};
exports.handleException = handleException;
//# sourceMappingURL=ErrorsZod.js.map