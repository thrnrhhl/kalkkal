'use client';
import { usersApi } from "@/src/shared/api/users/api";
import { FieldTextInput } from "@/src/shared/ui";
import { Form, Formik } from "formik";
import { signIn } from "next-auth/react";

export const LoginForm = () => {
    const [loginQuery] = usersApi.useLoginMutation();

    const initialValues = {
        login: '',
        pwd: ''
    };

    const onSubmit = async (values: any) => {
        try {
            const payload = await loginQuery(values).unwrap();
            console.log(values);


            await signIn('credentials', {
                ...payload.data,
                redirect: true,
                callbackUrl: '/me'
            })
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {({ values }) => (
                <Form className="flex flex-col gap-[15px] w-full">
                    <FieldTextInput
                        label="Логин"
                        name="login"
                        empty={!!values.login}
                    />

                    <FieldTextInput
                        label="Пароль"
                        name="pwd"
                        empty={!!values.pwd}
                    />

                    <button className="h-[46px] w-full bg-[#152E37] rounded-[10px] text-[16px] text-[#fff]">
                        Авторизоваться
                    </button>
                </Form>
            )}
        </Formik>
    );
};