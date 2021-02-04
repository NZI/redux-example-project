import React from "react";

import css from './index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { State } from "../store/initial-state";
import { changeTitle } from "../store/reducers/page-reducer";
import { LoadState } from "~/lib/interfaces/LoadState";
import { updateThought } from "../store/reducers/thought-reducer";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Thought } from "~/lib/interfaces/Thought";
import { ThoughtType } from "~/lib/interfaces/ThoughtType";

import { MdHttp } from '@meronex/icons/md';
import { TiInfoLarge } from '@meronex/icons/ti';
import { RiComputerLine } from '@meronex/icons/ri';
import { FaNetworkWired } from '@meronex/icons/fa';
import { GiNetworkBars } from '@meronex/icons/gi';
import { AiOutlinePhone } from '@meronex/icons/ai';
import { BsChevronRight } from '@meronex/icons/bs';

import { transitionClasses } from "../util/transitionClasses";
import { c } from "../util/c";
import ContactForm from "./ContactForm";
import { showContactForm } from "../store/reducers/contact-form-reducer";

export default () => {
    const page = useSelector((state: State) => state.page)
    const thought = useSelector((state: State) => state.thought)
    const dispatch = useDispatch()

    const thoughtIcon = {
        [ThoughtType.INFO]: <TiInfoLarge />,
        [ThoughtType.COMPUTER]: <RiComputerLine />,
        [ThoughtType.INTERNET]: <GiNetworkBars />,
        [ThoughtType.PHONE]: <AiOutlinePhone />,
        [ThoughtType.WEBSITE]: <MdHttp />,
        [ThoughtType.NETWORK]: <FaNetworkWired />,
    }

    return (
        <div className={c(
            css.app,
            {
                [css.loaded]: (page.loading & (LoadState.LOADED | LoadState.ERROR)) !== 0,
                [css.hasResults]: thought.thoughts.length > 0
            }
        )}>
            <h1 className={css.title}>{page.title}</h1>
            <input className={css.thinkBox}
                placeholder={page.thought}
                value={thought.thought}
                onChange={e => dispatch(updateThought(e.target.value))} />
            <TransitionGroup className={css.results}>
                {
                    thought.thoughts.map((t, key) => (
                        <CSSTransition
                            key={t.value}
                            timeout={300}
                            classNames={transitionClasses(css, 'thought')}
                        >
                            <div className={css.thought} onClick={() => dispatch(showContactForm(t))}>
                                <div className={css[ThoughtType[t.type].toLowerCase()]}>{thoughtIcon[t.type]}</div>
                                <div>{t.value}</div>
                                <div>
                                    <BsChevronRight />
                                </div>
                            </div>
                        </CSSTransition>
                    ))
                }
            </TransitionGroup>
            <ContactForm />
        </div>
    )
}