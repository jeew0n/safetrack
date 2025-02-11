import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { OpenAI } from 'openai';
import { useLocation } from '../location';
import { styles } from '../../components/styles';
import { ChatMessage } from '../../constants/constants';
import { OPENAI_API_KEY } from '@/constants/key';
import { promptOptions, emergencyOptions } from '@/constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const { location, getDateTime, errorMsg } = useLocation();
  const [dateTime, setDateTime] = useState(getDateTime());
  const [showEmergencyOptions, setShowEmergencyOptions] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });

  useEffect(() => {
    fetchUserProfile();
    setInitialMessage();

    const timer = setInterval(() => {
      setDateTime(getDateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const fetchUserProfile = async () => {
    try {
      const profileJson = await AsyncStorage.getItem('userProfile');
      if (profileJson) {
        setUserProfile(JSON.parse(profileJson));
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const setInitialMessage = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Hey there! I'm your personal safety assistant. How can I help keep you safe today?"
      }
    ]);
  };

  const handleSendMessage = async (messageText: string = inputText) => {
    if (!messageText.trim()) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: messageText,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const systemMessage = `You are a concise and human-like safety assistant helping \\${userProfile?.name || 'someone'}, a \\${userProfile?.age || 'adult'} year old \\${userProfile?.gender || 'person'} of \\${userProfile?.race || 'unspecified'} race. It's \\${dateTime?.month || 'a time'} at \\${dateTime?.time || 'daytime'}, and they're at lat \\${location?.coords.latitude.toFixed(4) || 'unknown'}, long \\${location?.coords.longitude.toFixed(4) || 'unknown'}. Provide brief, specific safety advice considering local crime rates, safe areas, emergency services, and current events. Tailor your advice to the user's demographics and location. Keep responses under 3 sentences when possible.`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemMessage },
          ...messages,
          userMessage,
        ],
        max_tokens: 150,
        temperature: 0.7,
      });

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response.choices[0].message.content || '',
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('OpenAI error:', error);
      const defaultMessage: ChatMessage = {
        role: 'assistant',
        content: "I'm sorry, I'm having trouble right now. Stay aware of your surroundings, trust your instincts, and keep valuables secure. If you're in immediate danger, contact local authorities right away."
      };
      setMessages(prev => [...prev, defaultMessage]);
    }

    setIsLoading(false);
    setShowEmergencyOptions(false);
  };

  const handleDefaultPrompt = (prompt: string) => {
    if (prompt === "I'm in an emergency situation.") {
      setShowEmergencyOptions(true);
    } else {
      handleSendMessage(prompt);
    }
  };

  const handleEmergencyOption = (option: string) => {
    handleSendMessage(`I'm in a \\${option} emergency situation. What should I do?`);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <Text style={styles.title}>Safety Chatbot</Text>
      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.role === 'user' ? styles.userMessage : styles.assistantMessage]}>
            <Text style={[styles.userMessageText, item.role === 'user' ? styles.userMessageText : styles.assistantMessageText]}>
              {item.content}
            </Text>
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
        style={styles.messagesList}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <View style={styles.promptAndInputContainer}>
        <View style={styles.promptContainer}>
          {(showEmergencyOptions ? emergencyOptions : promptOptions).map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.promptButton}
              onPress={() => showEmergencyOptions
                ? handleEmergencyOption(option.value)
                : handleDefaultPrompt(option.value)
              }
            >
              <Text style={styles.promptButtonText}>{option.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask for safety advice..."
            placeholderTextColor="#666"
          />
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={() => handleSendMessage()}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>{isLoading ? '...' : 'Send'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chatbot;
