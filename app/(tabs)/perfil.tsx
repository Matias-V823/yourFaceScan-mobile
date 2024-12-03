import { Button, StyleSheet, Text, View } from 'react-native'
import { getProfile } from '@/apis/apiYourFace'



const perfil = () => {

  const getUser  = async () => {
    const data = await getProfile() 
    console.log('Datos del usuario:', data)
  }

  return (
    <View>
      <Text>perfil</Text>
      <Button onPress={() => getUser()} title='ConsultarPerfil' />

    </View>
  )
}
export default perfil
const styles = StyleSheet.create({})