import { Image, KeyboardAvoidingView, ScrollView, Share, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import genericUserIcon from '../../assets/user.png'

import { useCallback, useRef, useState, useEffect } from 'react'
import { supabase } from '../../src/supabaseClient';

import {testUserId, subscribeToUpdates, unsubscribeToUpdates, getChatHistory } from './controller.js'

// This import fixes URLParam error while querying suapbase
// https://github.com/facebook/react-native/issues/23922#issuecomment-648096619
import 'react-native-url-polyfill/auto';


function ChatBubble({chat}){
  // A chat bubble of text written by the app user
  return (
    <View style={{  alignItems: 'center', flexDirection: 'row', flex: 0, width: '100%', marginBottom: 15}}>
      <Image
        style={{ width: 36, height: 36, borderRadius: 36/2, alignItems: 'left'}}
        source={genericUserIcon}
      />
      <View style={{ backgroundColor: "#CEF", padding: 10, marginHorizontal:10, borderRadius: 9 }}>
        <Text>{chat.content}</Text>
      </View>
    </View>
  );
}
function ChatBubbleResponse({chat}){
  // A chat bubble of text response sent to the app user
  return (
    <View style={{ alignItems: 'top', justifyContent: 'flex-end',  flexDirection: 'row', flex: 0, width: '100%', marginBottom: 15}}>
      <View style={{ backgroundColor: "#efc", padding: 10, marginHorizontal:10, borderRadius: 9 }}>
        <Text>{chat.content}</Text>
      </View>
      <Image
        style={{ width: 36, height: 36, borderRadius: 36/2, alignItems: 'right'}}
        source={genericUserIcon}
      />
    </View>
  );
}

function ChatMessagesView({chats}) {
  // A scrollable view of the chat messages

  const scrollRef = useRef(null);

  useEffect(() => {
    // scroll to the end on any chat update
    if (scrollRef.current){
      setTimeout( function(){scrollRef.current.scrollToEnd({ animated: true })}, 20);
    }
  }, [chats])

  let chatBubbles = chats.map((chat, index) => {
    if (chat.sender_id == testUserId){
      return <ChatBubbleResponse key={chat.id} chat={chat}></ChatBubbleResponse>
    }else{
      return <ChatBubble key={chat.id} chat={chat}></ChatBubble>
    }
  })
  
  if (scrollRef.current){
    setTimeout( function(){scrollRef.current.scrollToEnd({ animated: false })}, 20);
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', width: "100%"}}>
      <ScrollView style={{paddingHorizontal: 15}} automaticallyAdjustKeyboardInsets ref={scrollRef}>
        {chatBubbles}
      </ScrollView>
    </View>
  );
}

async function onShare() {
  try {
    const result = await Share.share({
      message:
        'TODO: To be implemented what to share.  Or should this be a photo chooser?',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};


function InputMessagesView({setChats}) {
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('');

  async function sendMessage() {
    try {
      setLoading(true)
      const user = supabase.auth.user()
      // console.log('mesage', message);
      let { data, error, status } = await supabase
        .from('simplechat')
        .insert([{ sender_id: testUserId, content: message }])

      if (error && status !== 406) {
        throw error
      }

      //
      setMessage('') // Clear message from text input after it has been sent.
      
      if (data) {
        // setUsername(data.username)
        // setWebsite(data.website)
        // setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={{backgroundColor: "#fff", flexShrink: 0,  flexGrow: 0, flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 15, marginHorizontal: 15 }}>
      <View style={{ flexGrow: 1, alignItems: 'left', justifyContent: 'flex-end',}}>
        <TextInput
          placeholder={'Type here...'}
          style={styles.input}
          multiline
          numberOfLines='3'
          onChangeText={setMessage}
          value={message}
        ></TextInput>
      </View>
      <View style={{  flexShrink: 0,  flexGrow: 0, flexBasis: 35, alignItems: 'center', justifyContent: 'flex-end', marginLeft: 5}}>
        <Ionicons onPress={onShare} name="share-outline" color='#3A00E5' size={25} style={{marginBottom: 9}} />
        <TouchableOpacity
          onPress={sendMessage}
          style={styles.sendMessageButton}>
          <Ionicons name="paper-plane-outline" color='white' size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function MessagesScreen({session}) {
  
  const [loading, setLoading] = useState(true)
  const [chats, setChats] = useState([])  // a list of all messages

  useEffect(() => {
    getChatHistory(setLoading, setChats)
  }, [session])

  // on screen focus/unfocus of the screen
  useFocusEffect(
    useCallback(() => {
      // on focus
      subscribeToUpdates(chats, setChats)

      const unsubscribe = function() {
        // on unfocus
        unsubscribeToUpdates()
      }
      return unsubscribe;
    }, [testUserId])
  );
  
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1}}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', }}>
      <ChatMessagesView chats={chats}></ChatMessagesView>
      <InputMessagesView setChats={setChats}></InputMessagesView>
    </View>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  input: {
    minHeight: 68,
    width: "100%",
    padding:10,
    fontSize: 16,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: "#F5F5F5",
    
  },
  label: {
    textAlign: 'left',
    width: '100%',
  },
  sendMessageButton: {
    backgroundColor: "#3A00E5",
    padding: 5,
    borderRadius: 5,
  }

});
