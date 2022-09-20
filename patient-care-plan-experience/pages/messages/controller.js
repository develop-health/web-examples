import { supabase } from '../../src/supabaseClient';

export const testUserId = 1
let chatSubscription = null;

async function markMessagesRead(){
  /*
  Set all unread messages to have a received date.
  */
  try {
    const user = supabase.auth.user()

    let { data, error, status } = await supabase
      .from('chat_abstraction')
      .update({ received: new Date() })
      .is('received', null)
      .or(`sender_patient_id.eq.${testUserId},recipient_patient_id.eq.${testUserId}`)

    if (status == 404){
      // no objects to update
      return
    }
    if (error && status !== 406) {
      throw error
    }
  } catch (error) {
    alert(error.message)
  } finally {
  }
}

async function addMessage(new_message, chats, setChats){
  console.log('setting chats', chats)

  try {
    const user = supabase.auth.user()

    // fetch the new row
    let { data, error, status } = await supabase
      .from('chat_abstraction')
      .select(`id, sender_patient_id, recipient_patient_id, sent, content_string`)
      .eq('id', new_message.communication_id) 

    if (error && status !== 406) {
      throw error
    }

    if (data) {
      console.log(" Add message DATA", data);
      setChats( chats => [...chats, data[0]])

      markMessagesRead()
    }
  } catch (error) {
    alert(error.message)
  } finally {
  }

  
}
async function deleteMessage(communication_id, chats, setChats){
  let newChats = chats.filter(chat => chat.id != communication_id)
  console.log(newChats)
  setChats( chats => newChats)
}

export async function getChatHistory(setLoading, setChats) {
  try {
    setLoading(true)
    const user = supabase.auth.user()

    let { data, error, status } = await supabase
      .from('chat_abstraction')
      .select(`id, sender_patient_id, recipient_patient_id, sent, content_string`)
      .or(`sender_patient_id.eq.${testUserId},recipient_patient_id.eq.${testUserId}`)

    if (error && status !== 406) {
      throw error
    }

    if (data) {
      //onsole.log("DATA", data);
      setChats(data);
      await markMessagesRead()
    }
  } catch (error) {
    alert(error.message)
  } finally {
    setLoading(false)
  }
}

function handleInsert(chatId){

}

export async function subscribeToUpdates(chats, setChats){
  console.log("subscribe");
  
  // cannot subscribe to abstract view - must connect to original resources
  chatSubscription = supabase  // do not await for subscriptions
  .from('chat_realtime:patient_id=eq.1')  // or queries do not work for subscriptions, 
  .on('INSERT', (payload) => {
    console.log('Change received!', payload)
    if (payload.table == 'chat_realtime'){
      let action = payload.new.action;
      if (action == 'insert'){
        addMessage(payload.new, chats, setChats);
      }else if(action == 'delete'){
        deleteMessage(payload.new.communication_id, chats, setChats);
      }

    }
  })
  
  // .on('DELETE', (payload) => {
  //   console.log('Delete received!', payload)
  //   if (payload.table == 'simplechat'){
  //     
  //   }
  // })
  .subscribe()
}
export async function unsubscribeToUpdates(){
  // const subscriptions = supabase.getSubscriptions()
  console.log("unsubscribe");
  if (chatSubscription){
    supabase.removeSubscription(chatSubscription)
  }
}
