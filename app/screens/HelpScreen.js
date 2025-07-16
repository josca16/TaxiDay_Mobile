import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Alert, Linking } from 'react-native';
import { AppContext } from '../context/AppContext'; // Import AppContext
import * as DocumentPicker from 'expo-document-picker';
import * as Location from 'expo-location'; // Import Location
import MapView, { Marker } from 'react-native-maps'; // Import MapView and Marker
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons for stars

export default function HelpScreen() {
  const { lightMode } = useContext(AppContext);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // Función para seleccionar un archivo
  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({ type: '*/*', copyToCacheDirectory: false });

      if (result.canceled) {
        setSelectedFile(null);
        setErrorMessage('⚠️ No seleccionaste ningún archivo.');
      } else if (result.assets && result.assets.length > 0) {
        setSelectedFile(result.assets[0].name);
        setErrorMessage(null);
      } else {
        setErrorMessage('❌ Error desconocido al seleccionar archivo.');
      }
    } catch (error) {
      setErrorMessage(`❌ Error: ${error.message}`);
    }
  };

  // Añadir comentarios
  const addComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  // Render stars for rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <MaterialIcons
            name={i <= rating ? 'star' : 'star-border'}
            size={30}
            color="#FFD700" // Gold color for stars
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const handleContactPress = () => {
    Alert.alert(
      "Contactar",
      "Elige una opción para contactar:",
      [
        {
          text: "Llamar",
          onPress: () => Linking.openURL('tel:+34123456789')
        },
        {
          text: "Enviar Email",
          onPress: () => Linking.openURL('mailto:soporte@taxiday.com')
        },
        {
          text: "Cancelar",
          style: "cancel"
        }
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, lightMode && styles.lightContainer]}>
      <Text style={[styles.title, lightMode && styles.lightTitle]}>Centro de Ayuda</Text>

      {/* Brief Introduction */}
      <View style={[styles.section, lightMode && styles.lightSection]}>
        <Text style={[styles.sectionText, lightMode && styles.lightSectionText]}>
          Bienvenido al Centro de Ayuda. Aquí puedes encontrar información y soporte para mejorar tu experiencia con nuestra aplicación.
        </Text>
      </View>

      {/* Comments Section */}
      <View style={[styles.section, lightMode && styles.lightSection]}>
        <Text style={[styles.sectionTitle, lightMode && styles.lightSectionTitle]}>Comentarios</Text>
        <ScrollView style={styles.commentsContainer}>
          {comments.map((comment, index) => (
            <Text key={index} style={[styles.commentText, lightMode && styles.lightSectionText]}>{comment}</Text>
          ))}
        </ScrollView>
        <TextInput
          style={[styles.commentInput, lightMode && styles.lightSectionText]}
          placeholder="Añadir un comentario..."
          placeholderTextColor={lightMode ? "#999" : "#FFF"}
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity style={styles.addButton} onPress={addComment}>
          <Text style={styles.buttonText}>Añadir Comentario</Text>
        </TouchableOpacity>
      </View>

      {/* Rating Section */}
      <View style={[styles.section, lightMode && styles.lightSection]}>
        <Text style={[styles.sectionTitle, lightMode && styles.lightSectionTitle]}>¿Te gusta la app?</Text>
        <View style={styles.ratingContainer}>
          {renderStars()}
        </View>
      </View>

      {/* Acerca de Section */}
      <View style={[styles.aboutSection, lightMode && styles.lightSection]}>
        <Text style={[styles.aboutTitle, lightMode && styles.lightSectionTitle]}>Acerca de</Text>
        <Text style={[styles.aboutText, lightMode && styles.lightSectionText]}>
          Versión 1.0.0
        </Text>
        <Text style={[styles.aboutText, lightMode && styles.lightSectionText]}>
          Desarrollado por TaxiDay
        </Text>
        <TouchableOpacity style={styles.aboutButton} onPress={() => alert('Gracias por usar nuestra aplicación!')}>
          <Text style={styles.aboutButtonText}>Más Información</Text>
        </TouchableOpacity>
      </View>

      {/* Redesigned Atención al Cliente Section */}
      <View style={[styles.customerServiceSection, lightMode && styles.lightSection]}>
        <Text style={[styles.customerServiceTitle, lightMode && styles.lightSectionTitle]}>Atención al Cliente</Text>
        <View style={styles.contactInfo}>
          <Text style={[styles.contactText, lightMode && styles.lightSectionText]}>📞 +34 123 456 789</Text>
          <Text style={[styles.contactText, lightMode && styles.lightSectionText]}>✉️ soporte@taxiday.com</Text>
        </View>
        <TouchableOpacity style={styles.contactButton} onPress={handleContactPress}>
          <Text style={styles.contactButtonText}>Contactar Ahora</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1E1E1E',
  },
  lightContainer: {
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    color: '#D4A017',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  lightTitle: {
    color: '##D4A017',
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#292929',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  lightSection: {
    backgroundColor: '#E0E0E0',
  },
  lightSectionText: {
    color: '#000',
  },
  lightSectionTitle: {
    color: '#D4A017',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#D4A017',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  lightSectionTitle: {
    color: '#D4A017',
  },
  sectionText: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 5,
  },
  lightSectionText: {
    color: '#000',
  },
  settingBlock: {
    width: '100%',
    backgroundColor: '#292929',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  lightBlock: {
    backgroundColor: '#E0E0E0',
  },
  settingText: {
    fontSize: 15,
    color: '#FFF',
  },
  lightSettingText: {
    color: '#000',
  },
  lightTitle: {
    color: '#D4A017',
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#292929',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#D4A017',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D4A017',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  uploadButton: {
    backgroundColor: '#D4A017',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#1E1E1E',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF0000',
    marginBottom: 10,
  },
  uploadedFileText: {
    color: '#FFF',
    marginBottom: 10,
  },
  noFileText: {
    color: '#FFF',
    marginBottom: 10,
  },
  commentsContainer: {
    maxHeight: 100,
    marginBottom: 10,
  },
  commentText: {
    color: '#FFF',
    marginBottom: 5,
  },
  commentInput: {
    backgroundColor: '#333',
    color: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#D4A017',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  aboutSection: {
    backgroundColor: '#292929',
    padding: 20,
    borderRadius: 10,
    marginVertical: 15,
    alignItems: 'center',
  },
  lightAboutSection: {
    backgroundColor: '#E0E0E0',
  },
  aboutTitle: {
    fontSize: 20,
    color: '#D4A017',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  lightAboutTitle: {
    color: '#333',
  },
  aboutText: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 5,
  },
  lightAboutText: {
    color: '#000',
  },
  aboutButton: {
    backgroundColor: '#D4A017',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  aboutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  customerServiceSection: {
    backgroundColor: '#292929',
    padding: 20,
    borderRadius: 10,
    marginVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 65,
  },
  lightCustomerServiceSection: {
    backgroundColor: '#E0E0E0',
  },
  customerServiceTitle: {
    fontSize: 20,
    color: '#D4A017',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  lightCustomerServiceTitle: {
    color: '#333',
  },
  contactText: {
    fontSize: 16,
    color: '#FFF',
    marginVertical: 5,
  },
  lightContactText: {
    color: '#000',
  },
  contactInfo: {
    flexDirection: 'column', // Change to column layout
    alignItems: 'center', // Center align the text
    marginBottom: 15,
  },
  contactText: {
    fontSize: 16, // Adjust font size if needed
    color: '#FFF',
    marginVertical: 5, // Add vertical margin for spacing
  },
  contactButton: {
    backgroundColor: '#D4A017',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
