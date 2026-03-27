import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Send } from 'lucide-react-native';
import client from '../api/client';

export default function ChatScreen() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "Hi there. I'm your Ehsaas Guide. I noticed you've been feeling overwhelmed lately. Do you want to talk about what's on your mind?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      text: message.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setMessage('');
    setIsTyping(true);

    try {
      const response = await client.post('/chatbot', { message: userMsg.text });
      
      const botMsg = {
        id: (Date.now() + 1).toString(),
        text: response.data.reply,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now, but please know I'm here for you.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      className="flex-1 bg-background"
    >
      {/* Header */}
      <View className="pt-16 pb-4 px-6 bg-surface border-b border-gray-100 flex-row items-center justify-between shadow-sm z-10">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full items-center justify-center bg-gray-50 border border-gray-100"
        >
          <ArrowLeft color="#1A1A1A" size={20} />
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-accent font-bold text-lg">Ehsaas Guide</Text>
          <Text className="text-primary font-medium text-xs">AI Support</Text>
        </View>
        <View className="w-10 h-10" />
      </View>

      {/* Chat History */}
      <ScrollView 
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        className="flex-1 px-4 py-6"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {messages.map((msg) => (
          <View 
            key={msg.id} 
            className={`mb-4 max-w-[80%] rounded-3xl p-4 ${msg.sender === 'user' ? 'bg-[#1A1A1A] self-end rounded-br-sm' : 'bg-white self-start border border-gray-100 shadow-sm rounded-bl-sm'}`}
          >
            <Text className={`text-base leading-relaxed ${msg.sender === 'user' ? 'text-white' : 'text-accent'}`}>
              {msg.text}
            </Text>
          </View>
        ))}
        {isTyping && (
          <View className="bg-white self-start rounded-3xl rounded-bl-sm p-4 border border-gray-100 mb-4 flex-row items-center shadow-sm">
            <ActivityIndicator size="small" color="#D1EAE3" />
            <Text className="text-muted ml-3 text-sm italic">Thinking...</Text>
          </View>
        )}
      </ScrollView>

      {/* Input Field */}
      <View className="p-4 bg-surface border-t border-gray-100 flex-row items-center mb-6">
        <View className="flex-1 bg-background rounded-full border border-gray-200 px-5 py-3 mr-3 shadow-sm flex-row items-center">
          <TextInput
            className="flex-1 text-accent font-medium text-base"
            placeholder="Type your thoughts..."
            placeholderTextColor="#9D9D9D"
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
            style={{ maxHeight: 100 }}
          />
        </View>
        <TouchableOpacity 
          onPress={sendMessage}
          disabled={!message.trim() || isTyping}
          className={`w-12 h-12 rounded-full items-center justify-center ${message.trim() ? 'bg-primary' : 'bg-gray-200'}`}
        >
          <Send color={message.trim() ? "#276749" : "#9D9D9D"} size={20} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
