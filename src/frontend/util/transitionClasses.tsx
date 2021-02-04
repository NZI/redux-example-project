import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';

export function transitionClasses(stylesheet: { [key: string]: string; }, prefix: string): CSSTransitionClassNames {
    return {
        appear: stylesheet[`${prefix}Appear`],
        appearActive: stylesheet[`${prefix}AppearActive`],
        appearDone: stylesheet[`${prefix}AppearDone`],
        enter: stylesheet[`${prefix}Enter`],
        enterActive: stylesheet[`${prefix}EnterActive`],
        enterDone: stylesheet[`${prefix}EnterDone`],
        exit: stylesheet[`${prefix}Exit`],
        exitActive: stylesheet[`${prefix}ExitActive`],
        exitDone: stylesheet[`${prefix}ExitDone`],
    };
}
