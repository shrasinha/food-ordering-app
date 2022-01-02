/**
 * applying all the middlewares - only logger is to be applied
 */

import logger from "./logger";
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";

export default applyMiddleware(
    thunk,
    logger,
    );
