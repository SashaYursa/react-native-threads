import { View, Text, Image } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadBranch } from '../store/actions/branchActions'
import Thread from '../components/Thread/Thread'
import { USER_IMAGE_URL } from '../constants'

const Branch = ({route}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadBranch(route.params.thread.id));
  }, [route.key])
  const thread = useSelector(state => state.branch.thread);
  return thread?.author_id ?(
    <View>
      <Thread thread={thread}/>
      {
        thread.comments.map(comment => (
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Image style={{width: 40, height: 40}} source={{uri: USER_IMAGE_URL + comment.user_image}}/>
            <View>
              <Text>{comment.user_name}</Text>
              <Text>{comment.comment_data}</Text>
            </View>
          </View>
        ))
      }
    </View>
  )
  : (<View>
    <Text>False</Text>
  </View>)
}

export default Branch