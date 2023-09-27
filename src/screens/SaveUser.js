import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser, updateUser, updateUserImage } from '../store/actions/UserActions';

const SaveUser = () => {
    const user = useSelector(state => state.user.user);
    const updatedUser = useSelector(state => state.user.editedUser);
    const dispatch = useDispatch();
    useEffect(() => {
    if(user.image !== updatedUser.image){
        dispatch(updateUserImage(user.id, updatedUser.image));        
    }
    if(user.name !== updatedUser.name 
      || user.description !== updatedUser.description 
      || user.is_private !== updatedUser.is_private){
        dispatch(updateUser({
          name: updatedUser.name,
          description: updatedUser.description,
          is_private: updatedUser.is_private,
          password: updatedUser.password
        }));
      }
    }, [])

  return (
    <View>
      <Text>SaveUser</Text>
    </View>
  )
}

export default SaveUser