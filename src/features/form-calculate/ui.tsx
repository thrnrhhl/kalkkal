import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { FieldTextInput } from '@/src/shared/ui';
import classNames from 'classnames';
import * as yup from 'yup';
import { Info } from 'lucide-react';

const schema = yup.object().shape({
    formula: yup
        .string()
        .required('Выберите формулу'),
    gender: yup
        .string()
        .required('Выберите пол'),
    physicalActivity: yup
        .string()
        .required('Выберите вашу дневную активность'),
    target: yup
        .string()
        .required('Выберите вашу цель'),
    height: yup
        .number()
        .typeError('Введите рост')
        .positive('Число должно быть положительным')
        .moreThan(0, 'Число должно быть больше нуля')
        .required('Заполните ваши параметры'),
    weight: yup.number()
        .typeError('Введите вес')
        .positive('Число должно быть положительным')
        .moreThan(0, 'Число должно быть больше нуля')
        .required('Заполните ваши параметры'),
    age: yup.number()
        .typeError('Введите возраст')
        .positive('Число должно быть положительным')
        .moreThan(0, 'Число должно быть больше нуля')
        .required('Заполните ваши параметры'),
})

export const FormCalculate = () => {
    const [kkal, setKkal] = useState(0);

    const initialState = {
        height: '',
        weight: '',
        age: '',
        formula: '',
        physicalActivity: '',
        target: '',
        gender: '',
    };


    const onSubmit = (values: any) => {
        let kkal = 0;

        if (values.gender === 'female') {
            if (values.formula === 'mifflin-san-jeor') {
                kkal = 10 * +values.weight + 6.25 * +values.height - 5 * +values.age - 161;
            } else {
                kkal = 447.6 + (9.2 * +values.weight) + (3.1 * +values.height) - (4.3 * +values.age);
            }
        } else {
            if (values.formula === 'mifflin-san-jeor') {
                kkal = 10 * +values.weight + 6.25 * +values.height - 5 * +values.age + 5;
            } else {
                kkal = 88.36 + (13.4 * +values.weight) + (4.8 * +values.height) - (5.7 * +values.age);
            }
        }

        kkal = kkal * (+values.physicalActivity);

        if (values.target === 'lose') {
            kkal = kkal - (kkal * 15 / 100)
        }

        if (values.target === 'gain') {
            kkal = kkal + (kkal * 15 / 100)
        }

        setKkal(Math.round(kkal));
    };

    const defaultClassesRadio = 'flex items-center gap-[10px] bg-[#fff] border rounded-[10px] p-[10px] text-[14px] text-[#242424] transition-all cursor-pointer';
    const checkedClassesRadio = 'border-[#44858250] !bg-[#44858220]';
    return (
        <Formik
            initialValues={initialState}
            onSubmit={onSubmit}
            validationSchema={schema}
        >
            {({ values, errors, touched }) => (
                <Form className=" rounded-[10px] w-full flex flex-col gap-[15px] flex-shrink-0 lg:w-[450px]">
                    <div>
                        <div className="flex items-center gap-[0px] mb-[10px]">
                            <p className="text-[16px] font-medium text-[#242424]">Ваш пол</p>
                        </div>
                        <fieldset className="flex gap-[10px]">
                            <label className={classNames(defaultClassesRadio, values.gender === 'male' && checkedClassesRadio)}>
                                <Field type="radio" name="gender" value="male" />
                                👱‍♂️ Мужской
                            </label>
                            <label className={classNames(defaultClassesRadio, values.gender === 'female' && checkedClassesRadio)}>
                                <Field type="radio" name="gender" value="female" />
                                👩 Женский
                            </label>
                        </fieldset>

                        {(errors.gender && touched.gender) && (
                            <div className="text-xs flex items-center gap-[5px] w-full rounded-[8px] p-[5px] bg-[#ffb0b0] mt-[10px]">
                                <Info className="w-4 h-4" />
                                <ErrorMessage name="gender" />
                            </div>
                        )}
                    </div>

                    <div>
                        <p className="text-[16px] font-medium text-[#242424] mb-[10px]">Ваши параметры</p>
                        <div className="grid grid-cols-3 gap-[10px]">
                            <FieldTextInput
                                name="age"
                                empty={!!values.age}
                                label="Возраст"
                                type="number"
                            />
                            <FieldTextInput
                                name="height"
                                empty={!!values.height}
                                label="Рост(см)"
                                type="number"
                            />
                            <FieldTextInput
                                name="weight"
                                empty={!!values.weight}
                                label="Вес(кг)"
                                type="number"
                            />

                        </div>

                        {((errors.age || errors.height || errors.weight) && (touched.age || touched.height || touched.weight)) && (
                            <div className="text-xs flex items-center gap-[5px] w-full rounded-[8px] p-[5px] bg-[#ffb0b0] mt-[10px]">
                                <Info className="w-4 h-4" />
                                <ErrorMessage name="age" />
                            </div>
                        )}
                    </div>

                    <div>
                        <p className="text-[16px] font-medium text-[#242424] mb-[10px]">Формула расчета</p>
                        <fieldset className="flex gap-[10px]">
                            <label className={classNames(defaultClassesRadio, values.formula === 'harris-benedict' && checkedClassesRadio)}>
                                <Field type="radio" name="formula" value="harris-benedict" />
                                🧮 Формула Харриса-Бенедикта
                            </label>
                            <label className={classNames(defaultClassesRadio, values.formula === 'mifflin-san-jeor' && checkedClassesRadio)}>
                                <Field type="radio" name="formula" value="mifflin-san-jeor" />
                                🧾 Формула Миффлина Сан-Жеора
                            </label>
                        </fieldset>

                        {(errors.formula && touched.formula) && (
                            <div className="text-xs flex items-center gap-[5px] w-full rounded-[8px] p-[5px] bg-[#ffb0b0] mt-[10px]">
                                <Info className="w-4 h-4" />
                                <ErrorMessage name="formula" />
                            </div>
                        )}

                    </div>

                    <div>
                        <p className="text-[16px] font-medium text-[#242424] mb-[10px]">Дневная активность</p>
                        <fieldset className="grid grid-cols-2 gap-[10px]">
                            <label className={classNames(defaultClassesRadio, values.physicalActivity === '1' && checkedClassesRadio)}>
                                <Field type="radio" name="physicalActivity" value="1" />
                                👨‍💻 Нет активности
                            </label>
                            <label className={classNames(defaultClassesRadio, values.physicalActivity === '1.2' && checkedClassesRadio)}>
                                <Field type="radio" name="physicalActivity" value="1.2" />
                                🚶‍♂️ Минимальная активность
                            </label>
                            <label className={classNames(defaultClassesRadio, values.physicalActivity === '1.375' && checkedClassesRadio)}>
                                <Field type="radio" name="physicalActivity" value="1.375" />
                                🏃‍♂️ Легкая активность
                            </label>
                            <label className={classNames(defaultClassesRadio, values.physicalActivity === '1.55' && checkedClassesRadio)}>
                                <Field type="radio" name="physicalActivity" value="1.55" />
                                🚴‍♂ Средняя активность
                            </label>
                            <label className={classNames(defaultClassesRadio, values.physicalActivity === '1.725' && checkedClassesRadio)}>
                                <Field type="radio" name="physicalActivity" value="1.725" />
                                🏊‍♂ Высокая активность
                            </label>
                            <label className={classNames(defaultClassesRadio, values.physicalActivity === '1.9' && checkedClassesRadio)}>
                                <Field type="radio" name="physicalActivity" value="1.9" />
                                🔥🏋️‍♂️ Очень высокая активность
                            </label>
                        </fieldset>

                        {(errors.physicalActivity && touched.physicalActivity) && (
                            <div className="text-xs flex items-center gap-[5px] w-full rounded-[8px] p-[5px] bg-[#ffb0b0] mt-[10px]">
                                <Info className="w-4 h-4" />
                                <ErrorMessage name="physicalActivity" />
                            </div>
                        )}

                    </div>


                    <div>
                        <p className="text-[16px] font-medium text-[#242424] mb-[10px]">Цель</p>
                        <fieldset className="grid grid-cols-2 lg:flex gap-[10px]">
                            <label className={classNames(defaultClassesRadio, values.target === 'lose' && checkedClassesRadio)}>
                                <Field type="radio" name="target" value="lose" />
                                🥒 Сбросить вес
                            </label>
                            <label className={classNames(defaultClassesRadio, values.target === 'support' && checkedClassesRadio)}>
                                <Field type="radio" name="target" value="support" />
                                🥘 Поддерживать вес
                            </label>
                            <label className={classNames(defaultClassesRadio, values.target === 'gain' && checkedClassesRadio)}>
                                <Field type="radio" name="target" value="gain" />
                                🍔 Набрать
                            </label>
                        </fieldset>

                        {(errors.target && touched.target) && (
                            <div className="text-xs flex items-center gap-[5px] w-full rounded-[8px] p-[5px] bg-[#ffb0b0] mt-[10px]">
                                <Info className="w-4 h-4" />
                                <ErrorMessage name="target" />
                            </div>
                        )}

                    </div>


                    <button className="sticky bottom-[20px] h-[46px] w-full bg-[#152E37] rounded-[10px] text-[16px] text-[#fff] flex items-center justify-center gap-[10px]">
                        Рассчитать
                    </button>

                    {!!kkal && (
                        <div className=" bottom-[80px] rounded-[10px] p-[10px]">
                            <p className="text-[14px] text-[#959595] text-center">Ваша суточная норма калорий</p>
                            <p className="text-[18px] text-[#242424] font-black text-center">{kkal} ккал</p>

                            <p className="text-xs text-[#525252] mt-[20px]">* Данные результаты являются рекомендацией, для более точных результатов обратитесь к специалистам.</p>
                            <p className="text-xs text-[#525252] mt-[20px]">* Расчет для сброса веса берется ваша калорийность - 15%</p>
                            <p className="text-xs text-[#525252] mt-[5px]">* Расчет для набора веса берется ваша калорийность + 15%</p>
                        </div>
                    )}

                </Form>
            )}
        </Formik>

    );
};