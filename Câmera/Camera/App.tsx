import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';

export default function App() {
  const [flipcam,setFlipcam] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [photo, setPhoto] = useState <string | null>(null);

  if(!permission){
    return <View/>;
  }
  

  if(!permission.granted){
  return (
    <View style={styles.container}>
      <Text sytle={styles.message}>Precisamos da sua permissão para mostrar a câmera</Text>
      <Button onPress={requestPermission} title='Conceder Permissão'/>
    </View>
    );
  }
  function trocarCamera(){
    setFlipcam(current => (current === 'back '? 'front ': 'back'));
  }
  return(
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={ref =>{setCameraRef(ref);}}>
        <View style={styles.rodape}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Entypo
              name='CW'
              size={24}
              color="white"/>
              <Text style={styles.text}>
                Flip Camera
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              if(cameraRef){
                let photo = await cameraRef.takePictureAsync();
                console.log('photo', photo);
                setPhoto(photo.uri);
              }}}>
              <Entypo 
              name='camera'
              size={24}
              color='white'/>
              <Text style={styles.text}>Tirar Foto</Text>
              </TouchableOpacity>
          </View>
        </View>
      </Camera>
      {photo && <Image source={{uti: photo}} style={{width: 200, height: 200}}/>}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera:{
    flex: 1,
  },
  buttonContainer:{
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: 5,
    gap: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'left',
    gap: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  rodape: {
    position: 'absolute',
    top: '80%',
    left:'35%',
    marginBottom: 35,
  },
});
