import InputError from "@components/input-error";
import Label from "@components/label";
import useCustomField from "@hooks/use-custom-field";
import {useScopedI18n} from "locales/client";
import React, {InputHTMLAttributes, useId} from 'react';
import './style.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: boolean;
    name: string;
    validation?: any;
}

const Input: React.FC<InputProps> = ({label, name, validation, ...props}) => {
    const t = useScopedI18n('input')
    const {customRegister, customErrors} = useCustomField(name, validation);
    const id = useId()

    return (
        <div className="input-wrapper">
            {label && <Label forId={id}>{t(`label.${name}` as any)}</Label>}
            <input {...customRegister} {...props} id={id}/>
            {customErrors && <InputError forId={id}>
                {/*@ts-ignore*/}
                {t(`errors.${customErrors.message}` as any, {[customErrors.type as string]: validation[customErrors.type]?.value})}
            </InputError>}
        </div>
    );
};

export default Input;