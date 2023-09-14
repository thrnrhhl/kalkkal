'use client';

import classNames from "classnames";
import { Field } from "formik";
import { FC } from "react";

type FieldTextInputProps = {
    label: string;
    name: string;
    empty: boolean;
    type?: string;
};
export const FieldTextInput: FC<FieldTextInputProps> = ({ label, name, empty = false, type = "text", ...props }) => {
    const classes = classNames('relative h-fit transition-all pt-[20px] bg-[#fff] border p-[5px] px-[10px] rounded-[10px] before:content-[attr(data-label)] before:absolute before:h-[20px] before:block before:top-[5px] before:w-[20px] before:font-medium before:text-[#242424] before:text-xs', {
        ['border-[#44858250] !bg-[#44858220]']: empty
    })
    return (
        <div
            data-label={label}
            className={classes}>
            <Field
                type={type}
                name={name}
                {...props}
                className="bg-[transparent] w-full outline-none" />
        </div>
    );
};