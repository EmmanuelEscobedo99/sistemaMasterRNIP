import React, {useState ,useEffect } from 'react'
import FormularioLogin from '../componentes/FormularioLogin'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2"
import { verificarIp } from '../reducers/thunks/verificarIp/verificarIp'
import { useDispatch, useSelector } from 'react-redux'
import { loginUsuario } from '../reducers/thunks/loginUsuario/thunksLogin'

import { verificarCorreo } from '../reducers/thunks/usuarioHistorico/usuarioHistorico'
import { setUser } from '../reducers/slice/loginUsuarioSlice/authSlice'
import { obtenerToken } from '../reducers/thunks/auth/authUsuario'



export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { formState: { errors, isSubmitting }, register, handleSubmit } = useForm()

    const maquina = useSelector((state) => state.verificacionIp.maquina)
    const error = useSelector((state) => state.verificacionIp.error)

    const [storedClave, setStoredClave] = useState(null);
    const [storedEmail, setStoredEmail] = useState(null);

    useEffect(() => {
        dispatch(verificarIp());
    }, [dispatch]);

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        setStoredEmail(storedEmail);
        
        if (storedEmail) {
            dispatch(verificarCorreo(storedEmail))
            .unwrap()
            .then((data) => {       
              console.log('Clave encontrada:', data.clave);   
              setStoredClave(data.clave); 
            })
            .catch((error) => {
              setLoginError(error.message);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
              });
            });
        }
      }, [dispatch]);


      const onSubmit = async (data) => {
        try {          
           const { correo, clave } = data;      
           if (storedClave === clave && storedEmail === correo) { 
            console.log('Las credenciales coinciden.'); 
            const storedRol = localStorage.getItem('rol');
            dispatch(setUser({ rol: storedRol, email: correo }));
            console.log('Las credenciales coinciden. Rol:', storedRol);

            try {
              console.log('maquina:', maquina);
               const datos = { correo, maquina };

              const tokenResponse = await dispatch(obtenerToken( datos)).unwrap();
              console.log('Token obtenido:', tokenResponse.token);             
              navigate(`/${storedRol}`); 
            } catch (tokenError) {
              console.error('Error al obtener el token:', tokenError);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al iniciar sesion',
              });
              navigate("/");
              return; // Salir de la función si hay un error al obtener el token
            }        
    
    
           } else {
             console.log('Las credenciales no coinciden.'); 
             console.log(' se va al backend!!!!!!!'); 
             console.log('correo guardado en el localstorage:', storedEmail);
    
             const resultAction = await dispatch(loginUsuario({ data, maquina, storedEmail })).unwrap();
             const { rol } = resultAction;
             navigate(`/${rol}`);     
            }    
        
        } catch (error) {
          console.error('Error al iniciar sesión:', error);
          setLoginError(error.message || 'Error al iniciar sesión');
        }
      };


    return (
        <>        
            {maquina && <p>Maquina: {maquina}</p>}
            {error && <p>Error: {error}</p>}
                <FormularioLogin
                handleSubmit={handleSubmit(onSubmit)}
                register={register}
                errors={errors}
                isSubmitting={isSubmitting}
                />
        </>
    )
}
