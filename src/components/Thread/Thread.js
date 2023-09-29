import { View, Text, Image, TouchableOpacity, ScrollView, Button } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useState } from 'react'
import {   GRAY_TEXT, THREAD_IMAGE_URL, USER_IMAGE_URL } from '../../constants'
import ImageView from 'react-native-image-viewing';
const Thread = ({thread, moveToBranch}) => {
    const [imageOpened, setimageOpened] = useState(false);
    const currentDate = new Date();
    const images = thread.images.map(image=> ({uri: THREAD_IMAGE_URL + image.image_name}))
    const desiredDate = new Date(thread.created_at);
    const timeDifference = currentDate - desiredDate;
    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));

    const openImage = () => {
         setimageOpened(true);
    }

    if(imageOpened) return(<ImageView
        images={images}
        imageIndex={0}
        visible={imageOpened}
        onRequestClose={() => setimageOpened(false)}
      />)
    return (
    <TouchableOpacity onPress={()=>moveToBranch(thread)} style={{borderBottomWidth: 1, borderBottomColor: '#e6e3e3', flexDirection: 'column', marginTop: 10}}>
            <View style={{ paddingHorizontal: 5, flexDirection: 'row', gap: 10, alignItems: 'flex-start', justifyContent: 'space-between', width: '100%'}}>
                <View style={{position: 'relative', height: 45}}>
                    <Image style={{width: 45, height: 45, borderRadius: 50, objectFit: 'cover'}} source={{uri: USER_IMAGE_URL + thread.author_image}}/>   
                    {!thread?.isSubscribed &&
                    <TouchableOpacity style={{backgroundColor: 'white', paddingLeft: 1.7, borderRadius: 50, position: 'absolute', bottom: -5, right: -5}}>
                        <Icon size={22} style={{}} name='add-circle'/>
                    </TouchableOpacity>
                    }
                </View>
                <View style={{flex: 1, overflow: 'hidden'}}>
                    <View style={{gap: 20, alignContent: 'center',alignItems: 'center', flexDirection: 'row'}}>
                        <Text style={{flex: 1, fontWeight: 700, fontSize: 16}}>{thread.author_name}</Text>
                        <Text style={{color: GRAY_TEXT}}>{hoursAgo} ч.</Text>
                        <TouchableOpacity>
                            <Icon size={18} name='ellipsis-horizontal'/>
                        </TouchableOpacity>
                    </View>
                    <Text style={{fontSize: 16, flexShrink: 1 }}>{thread.data}</Text>
                </View>
            </View>
            {thread.images &&
            <ScrollView horizontal={true} > 
                <View style={{flexDirection: 'row', gap: 10, marginLeft: 60, marginEnd: 10, marginTop: 10}}>
                    {thread.images.map(image => <ThreadImage key={image.id} openImage={openImage} image={image}/>)}
                </View>
            </ScrollView>
            }
            <View style={{marginLeft: 60, flexDirection: 'row', gap: 20, marginTop: 10}}>
                    <TouchableOpacity><Icon size={28} name='heart-outline'/></TouchableOpacity>
                    <TouchableOpacity><Icon size={26} name='chatbubble-outline'/></TouchableOpacity>
                    <TouchableOpacity><Icon size={26} name='git-compare-outline'/></TouchableOpacity>
                    <TouchableOpacity><Icon size={26} name='paper-plane-outline'/></TouchableOpacity>
            </View>
            <View style={{ paddingLeft: 60, marginBottom: 15, marginTop: 15}}>
                <Text style={{color: GRAY_TEXT, fontSize: 16}}>{thread.likes_count} отметок "Нравится"</Text>
            </View>

        </TouchableOpacity>
  )
}

const ThreadImage = ({image, openImage}) => {
    return (
        <TouchableOpacity onPress={openImage} activeOpacity={1}>
            <Image style={{borderRadius: 8, width: 300, height: 300}} source={{uri: THREAD_IMAGE_URL + image.image_name}}/>
        </TouchableOpacity>
    )
}

export default Thread