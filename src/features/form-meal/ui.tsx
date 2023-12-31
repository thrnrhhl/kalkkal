import { mealsApi } from "@/src/shared/api";
import { FieldTextInput } from "@/src/shared/ui";
import { Form, Formik } from "formik";
import moment from "moment";

const initialState = {
    product: '',
    gram: '',
    kcal: '',
    date: moment(new Date()).format('YYYY-MM-DD')
};

export const FormMeal = () => {

    const [addMealQuery] = mealsApi.useAddMealMutation();

    const onSubmit = async (values: any, actions: any) => {
        try {
            const payload = await addMealQuery(values).unwrap();
            actions.resetForm();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Formik
            initialValues={initialState}
            onSubmit={onSubmit}
        >
            {({ values }) => (
                <Form className="bg-[#fff] p-[15px] rounded-[10px]">
                    <FieldTextInput
                        label="Продукт"
                        name="product"
                        empty={!!values.product}
                    />
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-[10px] mt-[10px]">
                        <FieldTextInput
                            label="Граммовка"
                            type="number"
                            name="gram"
                            empty={!!values.gram}
                        />
                        <FieldTextInput
                            label="Калорийность"
                            type="number"
                            name="kcal"
                            empty={!!values.kcal}
                        />
                        <FieldTextInput
                            classNameContainer="col-span-2 lg:col-span-1"
                            label="Дата"
                            type="date"
                            name="date"
                            empty={!!values.date}
                        />
                    </div>

                    <button className="mt-[20px] h-[46px] w-full bg-[#152E37] rounded-[10px] text-[16px] text-[#fff] flex items-center justify-center gap-[10px]">
                        Добавить
                    </button>
                </Form>
            )}
        </Formik>

    );
};