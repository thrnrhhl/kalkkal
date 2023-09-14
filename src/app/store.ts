import { configureStore } from "@reduxjs/toolkit";
import { api } from "@/src/shared/api/api";

export const store = configureStore({
        reducer: {
                [api.reducerPath]: api.reducer,
        },
        middleware: (gDM) => gDM({ serializableCheck: false }).concat(api.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;