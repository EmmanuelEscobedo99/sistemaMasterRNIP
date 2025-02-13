import { createSlice } from "@reduxjs/toolkit";
import { verificarIp } from "../../thunks/verificarIp/verificarIp";

const initialState = {
    maquina: "",
    error: "",
    loading: false
};

const verificacionIp = createSlice({
    name: "verificacionIp",
    initialState,
    reducers: {
        setMaquina(state, action) {
            state.maquina = action.payload;
            state.error = "";
        },
        
        setMaquinaError(state, action) {
            state.error = action.payload;
            state.maquina = "";
        },

        unSetMaquina(state) {
            state.maquina = "";
            state.error = "";
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(verificarIp.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(verificarIp.fulfilled, (state, action) => {
                state.loading = false;
                state.maquina = action.payload;
            })
            .addCase(verificarIp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { setMaquina, setMaquinaError, unSetMaquina } = verificacionIp.actions;
export default verificacionIp.reducer;
