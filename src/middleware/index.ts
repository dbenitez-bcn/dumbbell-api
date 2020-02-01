import { handleCors, handleBodyRequestParsing, handleCompression, exercisesMiddleware } from "./common";
import { handleAPIDocs } from "./apiDocs";

export default [handleCors, handleBodyRequestParsing, handleCompression, handleAPIDocs, exercisesMiddleware];