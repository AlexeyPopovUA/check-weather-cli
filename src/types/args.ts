import {Arguments} from "yargs";

import {CLIParams} from "../options";

export type CLIArguments = Arguments & Partial<CLIParams>;
