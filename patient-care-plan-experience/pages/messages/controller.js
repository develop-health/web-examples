import { supabase } from '../../src/supabaseClient';

export const testUserId = 1
let messagesSubscription = null;

async function addMessage(new_message, chats, setChats){
  console.log('setting chats', chats)
  setChats( chats => [...chats, new_message])
}
async function deleteMessage(payload, chats, setChats){
  let newChats = chats.filter(chat => chat.id != payload.id)
  console.log(newChats)
  setChats( chats => newChats)
}

export async function getChatHistory(setLoading, setChats) {
  try {
    setLoading(true)
    const user = supabase.auth.user()

    let { data, error, status } = await supabase
      .from('simplechat')
      .select(`id, sender_id, receiver_id, timestamp, content`)
      .or(`sender_id.eq.${testUserId},receiver_id.eq.${testUserId}`)

    if (error && status !== 406) {
      throw error
    }

    if (data) {
      //onsole.log("DATA", data);
      setChats(data);
    }
  } catch (error) {
    alert(error.message)
  } finally {
    setLoading(false)
  }
}


export async function subscribeToUpdates(chats, setChats){
  console.log("subscribe");
  messagesSubscription = supabase  // do not await for subscriptions
  .from('simplechat') // :sender_id=eq.1')  // or queries do not work for subscriptions, 
  .on('INSERT', (payload) => {
    console.log('Change received!', payload)
    if (payload.table == 'simplechat'){
      addMessage(payload.new, chats, setChats)
    }
  }).on('DELETE', (payload) => {
    console.log('Delete received!', payload)
    if (payload.table == 'simplechat'){
      deleteMessage(payload.old, chats, setChats)
    }
  })
  .subscribe()
}
export async function unsubscribeToUpdates(){
  const subscriptions = supabase.getSubscriptions()
  console.log("unsubscribe");

  supabase.removeSubscription(messagesSubscription)
}
