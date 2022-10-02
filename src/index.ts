#!/usr/bin/env node

import ConfigurationsHandler from "./configurations-handler";
import RequestHandler from "./request-handler";

(async () => {
    const argv = await ConfigurationsHandler.handleRequest();
    await RequestHandler.handleRequest(argv);
})();
