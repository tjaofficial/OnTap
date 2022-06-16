import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Platform } from 'react-native';

import CustomButton from './CustomButton';

const RunImagePicker = ({onPress,}) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
        const file = {
            uri: result.uri,
            name: prevEventDetails.title + '_cover.png',
            type: 'image/png',
        }
        setImage(file);
    }
  }
  return (
    <View style={styles.showContainer}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
      </View>
      <CustomButton 
        text="Next" 
        onPress={onPress}
        type="Primary"
      />
    </View>
  );
}
const styles = StyleSheet.create({
    custom: {
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    showContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  }
})
export default RunImagePicker;