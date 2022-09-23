import { FlatList, Image, Keyboard, KeyboardAvoidingView, SafeAreaView, ScrollView, Share, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import genericUserIcon from '../../assets/user.png'

import { useCallback, useContext, useRef, useState, useEffect } from 'react'
import { supabase } from '../../src/supabaseClient';

import { AuthContext } from '../../src/context';
import LoginStack from '../login/signin';

import { subscribeToUpdates, unsubscribeToUpdates, getChatHistory } from './controller.js'

import striptags from 'striptags';
import StyledText from 'react-native-styled-text';

// This import fixes URLParam error while querying suapbase
// https://github.com/facebook/react-native/issues/23922#issuecomment-648096619
import 'react-native-url-polyfill/auto';


function ChatBubble({chat}){
  // A chat bubble of text written by the app user
  return (
    <View style={{  alignItems: 'center', flexDirection: 'row', flex: 0, width: '100%', marginBottom: 15}}>
      <Image
        style={{ width: 36, height: 36, borderRadius: 36/2, alignItems: 'flex-start'}}
        source={genericUserIcon}
      />
      <View style={{ backgroundColor: "#CEF", padding: 10, marginHorizontal:10, borderRadius: 9 }}>
        <StyledText>{chat.content_string}</StyledText>
      </View>
    </View>
  );
}
function ChatBubbleResponse({chat}){
  // A chat bubble of text response sent to the app user
  return (
    <View style={{ alignItems: 'flex-start', justifyContent: 'flex-end',  flexDirection: 'row', flex: 0, width: '100%', marginBottom: 15}}>
      <View style={{ backgroundColor: "#efc", padding: 10, marginHorizontal:10, borderRadius: 9 }}>
        <StyledText>{chat.content_string}</StyledText>
      </View>
      <Image
        style={{ width: 36, height: 36, borderRadius: 36/2, alignItems: 'flex-end'}}
        source={genericUserIcon}
      />
    </View>
  );
}

function ChatMessagesView({chats}) {
  // A scrollable view of the chat messages

  const scrollRef = useRef(null);
  const [user, setAuthUser] = useContext(AuthContext);

  useEffect(() => {
    // scroll to the end on any chat update
    if (scrollRef.current){
      setTimeout( function(){if (!scrollRef.current){return}; scrollRef.current.scrollToEnd({ animated: true })}, 20);
    }
  }, [chats])

  
  if (scrollRef.current){
    setTimeout( function(){if (!scrollRef.current){return}; scrollRef.current.scrollToEnd({ animated: false })}, 20);
  }

  const renderItem = ({item}) => {
    let chat = item
    chat.content_string = striptags(chat.content_string, ['b', 'i', 'u'])
    //console.log("RENDER", item);
    if (chat.sender_patient_id == user.intId){
      return <ChatBubbleResponse key={chat.id} chat={chat}></ChatBubbleResponse>
    }else{
      return <ChatBubble key={chat.id} chat={chat}></ChatBubble>
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'flex-end', width: "100%", paddingVertical: 5}}>
      <FlatList 
        data={chats}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={{paddingHorizontal: 15 }}
        keyboardDismissMode="interactive"
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior="never"
        maintainVisibleContentPosition={{ minIndexForVisible: 0, autoscrollToTopThreshold: 100 }}
        automaticallyAdjustKeyboardInsets={true}
        ref={scrollRef}
        initialScrollIndex={chats.count}
      >
      </FlatList>
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
        .from('chat_abstraction')
        .insert([{ sender_patient_id: user.intId, recipient_practitioner_id: 1, sent: new Date(), content_string: message.trim()}])

      if (error && status !== 406) {
        throw error
      }

      // Clear message from text input after it has been sent.
      setMessage('')
      
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={{backgroundColor: "#fff", flexShrink: 0,  flexGrow: 0, flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 15, marginHorizontal: 15 }}>
      <View style={{ flexGrow: 1, alignItems: 'flex-start', justifyContent: 'flex-end',}}>
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

export default function MessagesScreen({navigation, session}) {
  
  const [loading, setLoading] = useState(true)
  const [chats, setChats] = useState([])  // a list of all messages

  const [user, setAuthUser] = useContext(AuthContext);


  useEffect(() => {
    if(!user){
      return
    }
    getChatHistory(setLoading, setChats, user)
  }, [session])

  // on screen focus/unfocus of the screen
  useFocusEffect(
    useCallback(() => {

      if(!user){
        return
      }
      // on focus
      subscribeToUpdates(chats, setChats, user)

      const unsubscribe = function() {
        // on unfocus
        unsubscribeToUpdates()
      }
      return unsubscribe;
    }, [user])
  );
  

  if (!user){
    return LoginStack(navigation)
  }


  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }} keyboardVerticalOffset='65'>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff"}}>
          <ChatMessagesView chats={chats}></ChatMessagesView> 
          <InputMessagesView setChats={setChats}></InputMessagesView>
        </SafeAreaView>
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
