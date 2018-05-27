import chalk from 'chalk';
import strip from 'strip-ansi';

import getScreenSize from './getScreenSize';
import printLine from './printLine';

const LOGO = chalk`{cyan
                                    ▁▁▁
                                    ▏●▕
                                    ▔█▔
     {white Welcome to}                      █
                                   ▂▄█▄▂
                                 ▞▀▀█ █▀▀▚
                                    █ █}
{white ▝█▖        ▗█▘▗▖    █▀▀▀▜▖ █▀▀▀▜▖ }  {cyan █ █}  {white ▗████▖ █▀▀▀▜▖     █ ▗████▛}
{white  ▝█▖  ▗▖  ▗█▘▗██▖   █    █ █    █ }  {cyan █ █}  {white █▘  ▝█ █    █     █ █     }
{white   ▝█▖▗██▖▗█▘▗█▘▝█▖  █▄▄▄▟▘ █▄▄▄▟▘ }  {cyan █ █}  {white █    █ █▄▄▄▟▘     █ ▝████▖}
{white    ▝██▘▝██▘▗█▄▄▄▄█▖ █  ▝█▖ █  ▝█  }  {cyan █ █}  {white █▖  ▗█ █  ▝█▖ █   █      █}
{white     ▐▌  ▐▌▗█▘    ▝█▖█   ▝█▖█   ▝█▖}  {cyan █ █}  {white ▝████▘ █   ▝█▖▝▙▄▟▘ ▟████▘}{cyan
                                    █ █
                                    █ █
                                    █ █
                                    █ █
                                    ▚ ▞
                                     ▀}`;

const LOGO_WIDTH = Math.max(
  ...LOGO.split('\n').map(line => strip(line).length),
);

/**
 * Prints the welcome message.
 */
function printWelcomeMessage() {
  if (getScreenSize()[0] >= LOGO_WIDTH) {
    printLine(LOGO);
  } else {
    printLine('Welcome to WarriorJS');
  }
}

export default printWelcomeMessage;
