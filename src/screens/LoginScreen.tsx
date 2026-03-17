import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  Alert
} from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { LogIn, Mail, Lock, FileText } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation() as any;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    dispatch(login({ email, name: email.split('@')[0] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <LogIn color="#fff" size={40} />
          </View>
          <Text style={styles.title}>ModaCatalog</Text>
          <Text style={styles.subtitle}>Sua vitrine de moda mobile</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <Mail color="#a3a3a3" size={20} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="seu@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha</Text>
            <View style={styles.inputWrapper}>
              <Lock color="#a3a3a3" size={20} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.docsLink}
          onPress={() => navigation.navigate('AcademicDocs')}
        >
          <FileText color="#10b981" size={16} />
          <Text style={styles.docsText}>Documentação Acadêmica</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 40 },
  logoContainer: {
    width: 80, height: 80, backgroundColor: '#10b981', borderRadius: 20,
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  title: { fontSize: 28, fontWeight: 'bold', color: '#171717' },
  subtitle: { fontSize: 16, color: '#737373', marginTop: 8 },
  form: { gap: 20 },
  inputGroup: { gap: 8 },
  label: { fontSize: 14, fontWeight: '600', color: '#404040', marginLeft: 4 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5',
    borderWidth: 1, borderColor: '#e5e5e5', borderRadius: 12, paddingHorizontal: 12,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, height: 50, fontSize: 16, color: '#171717' },
  button: {
    backgroundColor: '#171717', height: 56, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', marginTop: 12,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  docsLink: {
    marginTop: 40, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 8,
  },
  docsText: { color: '#10b981', fontSize: 14, fontWeight: '600' },
});
