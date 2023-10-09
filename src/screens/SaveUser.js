import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, removeUser, updateUser, updateUserImage } from '../store/actions/UserActions';

const SaveUser = ({navigation}) => {
    const loading = useSelector(state => state.user.loading);
    const user = useSelector(state => state.user.user);
    const updatedUser = useSelector(state => state.user.editedUser);
    const uploadedItems = useSelector(state => state.user.uploadedItems);
    const dispatch = useDispatch();
    useEffect(() => {
    if(user.image !== updatedUser.image){
        dispatch(updateUserImage(user.id, updatedUser.image));        
    }
    else{
      dispatch(updateUserImage(false, false));
    }
    if(user.name !== updatedUser.name 
      || user.description !== updatedUser.description 
      || user.is_private !== updatedUser.is_private){
        dispatch(updateUser({
          name: updatedUser.name,
          description: updatedUser.description,
          is_private: updatedUser.is_private,
          password: updatedUser.password,
          id: user.id
        }));
    }
    else{
      dispatch(updateUser(false));
    }

    }, [])

    useEffect(() => {
        if (uploadedItems.data && uploadedItems.image){
           dispatch(removeUser());
          dispatch(loadUser(user.id))
      }
    }, [uploadedItems]);

  return (
    <View>
      <Text>SaveUser</Text>
    </View>
  )
}

export default SaveUser