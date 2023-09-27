import { useActionSheet } from '@expo/react-native-action-sheet';
import { View, Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components';
const ImageActionSheet = ({userImage, chooseImage, createImage, deleteImage, children}) => {
    const { showActionSheetWithOptions } = useActionSheet();
    const openActionSheet = () => {
        const options = userImage === null ? ['Нове фото', 'Вибрати з галереї'] : ['Нове фото', 'Вибрати з галереї', 'Видалити фото'];
        const destructiveButtonIndex = 2;
        const cancelButtonIndex = 10;
    
        showActionSheetWithOptions({
          options,
          containerStyle: {borderTopLeftRadius: 12, borderTopEndRadius: 12},
          destructiveButtonIndex,
          cancelButtonIndex
        }, (selectedIndex) => {
          switch (selectedIndex) {
            case 0:
              createImage();
              break;
            case 1:
              chooseImage();
              break;  
            case destructiveButtonIndex:
              deleteImage()
          }});
      }
      return (
        <EditImageButton activeOpacity={0.5} onPress={openActionSheet}>
          {children}
        </EditImageButton>
      )
}


const EditImageButton = styled.TouchableOpacity`
align-self: center;
justify-self: center;
background-color: #eaeaea;
border-radius: 25px;
`

export default ImageActionSheet