import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  Alert
} from 'react-native';
import { FileText, Download, ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const AcademicDocs = () => {
  const navigation = useNavigation();

  const handleDownloadPDF = () => {
    Alert.alert(
      "Download Iniciado",
      "O arquivo Reflexao_Contextual_ModaCatalog.pdf está sendo gerado e será salvo no seu dispositivo.",
      [{ text: "OK" }]
    );
    // Nota: Em um ambiente React Native real, usaríamos bibliotecas como expo-print ou react-native-html-to-pdf
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft color="#64748b" size={20} />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <FileText size={40} color="#10b981" />
          </View>
          
          <Text style={styles.title}>Documentação Acadêmica</Text>
          
          <Text style={styles.subtitle}>
            Aqui você pode baixar a Parte Teórica (Reflexão Contextual) em formato PDF para a sua entrega.
          </Text>

          <View style={styles.previewBox}>
            <Text style={styles.previewLabel}>Prévia do Conteúdo:</Text>
            <Text style={styles.previewText}>
              "A presença de aplicativos móveis no e-commerce é fundamental para garantir acessibilidade e personalização..."
            </Text>
          </View>

          <TouchableOpacity
            style={styles.downloadButton}
            onPress={handleDownloadPDF}
          >
            <Download size={20} color="#fff" />
            <Text style={styles.downloadText}>Baixar PDF Agora</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.footer}>Mobile Development • 2026</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  scrollContent: { padding: 24, flexGrow: 1 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, gap: 8 },
  backText: { fontSize: 16, color: '#64748b', fontWeight: '500' },
  card: {
    backgroundColor: '#fff', borderRadius: 32, padding: 32, alignItems: 'center',
    elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 8, flex: 1,
  },
  iconContainer: {
    width: 80, height: 80, backgroundColor: '#f0fdf4', borderRadius: 20,
    alignItems: 'center', justifyContent: 'center', marginBottom: 24,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0f172a', marginBottom: 12, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#64748b', textAlign: 'center', lineHeight: 24, marginBottom: 32 },
  previewBox: {
    width: '100%', padding: 16, backgroundColor: '#f8fafc', borderRadius: 16,
    borderWidth: 1, borderColor: '#e2e8f0', borderStyle: 'dashed', marginBottom: 32,
  },
  previewLabel: { fontSize: 10, fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', marginBottom: 8 },
  previewText: { fontSize: 14, color: '#475569', fontStyle: 'italic' },
  downloadButton: {
    width: '100%', backgroundColor: '#10b981', height: 56, borderRadius: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12,
    elevation: 8, shadowColor: '#10b981', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 12,
  },
  downloadText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  footer: { textAlign: 'center', fontSize: 10, color: '#94a3b8', marginTop: 24, letterSpacing: 2, textTransform: 'uppercase' },
});

export default AcademicDocs;
