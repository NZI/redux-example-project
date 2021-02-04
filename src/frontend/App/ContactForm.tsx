import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { c } from "../util/c"
import { State } from "../store/initial-state"
import css from './contact-form.scss'
import { hideContactForm } from "../store/reducers/contact-form-reducer"
import { EnCross } from '@meronex/icons/en';
import { IconContext } from "@meronex/icons";

export default () => {
    const contactForm = useSelector((state: State) => state.contactForm)
    const dispatch = useDispatch()

    return <div className={c(css.overlay, {
        [css.show]: contactForm.show
    })}
        onClick={() => dispatch(hideContactForm(null))}
    >
        <IconContext.Provider value={{ color: 'white' }}>
            <div className={css.exit}><EnCross /></div>
        </IconContext.Provider>
        <div className={css.form}>
            
        </div>
    </div>
}