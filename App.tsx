import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Button
} from 'react-native';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {

  const [input, setInput] = useState('');
  const [nombreStorage, setNombreSG] =  useState('')

  /*UseEffect para guardado del input en storage*/
  useEffect(() => 
  {
     obtenerDatosStorage()
  },[]) 

  const obtenerDatosStorage = async () => 
  {
    try 
    {
       const nombre = await AsyncStorage.getItem('nombre'); //el valor se obtiene por medio de la llave a como se guardo
       setNombreSG(nombre)
    } 
    catch (error) 
    {
      console.log(error)  
    }
  }

  const guardarDatos = async () => 
  {
     try 
     {
       await AsyncStorage.setItem('nombre', input)
       setNombreSG(input)
     } 
     catch (error) 
     {
       console.log(error)
     }
  }

  const eliminarDatos = async () => 
  {
    try {
      await AsyncStorage.removeItem('nombre')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <View style={styles.contenedor}>
        {nombreStorage ? <Text> Hola {nombreStorage}</Text> : null}
        <TextInput onChangeText={texto => setInput(texto)} style={styles.input} placeholder='Escribe tu nombre' />
        <View style={{marginTop:20}}>
          <Button title='Guardar' color='#333' onPress={() => guardarDatos()} />
        </View>
        {
          nombreStorage ? 
          <TouchableHighlight onPress={() => eliminarDatos()} style={styles.btnEliminar}>
            <Text style = {styles.textEliminar}>Eliminar Nombre &times; </Text>
          </TouchableHighlight>
          : null
        }
      </View>
    </>
  );
}

const styles = StyleSheet.create({
   contenedor:
   {
       flex:1,
       backgroundColor:'white',
       alignItems:'center',
       justifyContent:'center'
   }, 
   input:
   {
     borderColor:'#666',
     borderBottomWidth:1,
     width:300,
     height:40
   },
   btnEliminar:
   {
     backgroundColor:'red',
     marginTop:20,
     padding:10
   },
   textEliminar:
   {
     color:'white',
     fontWeight:'bold',
     textAlign:'center',
     textTransform:'uppercase',
     width:300
   }
});

export default App;
